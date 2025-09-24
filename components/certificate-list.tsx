"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye } from "lucide-react"
import Link from "next/link"

type Certificate = {
  cert_id: number
  status: string
  serial_number: string
  key_type: string
  parsed?: {
    subjectCN?: string
    issuerCN?: string
    serialNumber?: string
    validFrom?: string
    validTo?: string
    signatureAlgorithm?: string
    publicKeyAlgorithm?: string
    error?: string
  }
}

// Normalize DB status to frontend labels
function normalizeStatus(status: string) {
  switch (status) {
    case "good":
      return "active"
    case "revoked":
      return "revoked"
    case "unknown":
      return "expired"
    default:
      return "unknown"
  }
}

function getStatusBadge(status: string) {
  const normalized = normalizeStatus(status)
  switch (normalized) {
    case "active":
      return <Badge className="bg-green-100 text-green-800">Active</Badge>
    case "revoked":
      return <Badge className="bg-red-100 text-red-800">Revoked</Badge>
    case "expired":
      return <Badge className="bg-gray-100 text-gray-800">Expired</Badge>
    default:
      return <Badge variant="secondary">{normalized}</Badge>
  }
}

export function CertificateList({
  statusFilter,
  searchTerm,
}: {
  statusFilter: string
  searchTerm: string
}) {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch("/api/certificates")
      .then((res) => res.json())
      .then((data) => {
        setCertificates(data.certificates || [])
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching certificates:", err)
        setLoading(false)
      })
  }, [])

  // Filter certificates
  const filtered = certificates.filter((cert) => {
    if (!cert) return false
    const term = (searchTerm ?? "").toLowerCase()

    // logic for the filters using serial number  and status filter
    const subjectCN = (cert.parsed?.subjectCN ?? "").toLowerCase()
    const issuerCN = (cert.parsed?.issuerCN ?? "").toLowerCase()
    const serial = (cert.serial_number ?? "").toLowerCase()

    const normalizedStatus = normalizeStatus(cert.status)
    const filterStatus = (statusFilter ?? "all").toLowerCase()

    const matchesStatus = filterStatus === "all" ? true : normalizedStatus === filterStatus
    const matchesSearch = serial.includes(term)

    return matchesStatus && matchesSearch
  })

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 mx-auto max-w-7xl">
      <CardHeader>
        <CardTitle className="font-heading text-slate-800">All Certificates</CardTitle>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="text-center py-6 text-gray-500">Loading certificates...</div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Common Name</TableHead>
                  <TableHead>Serial Number</TableHead>
                  <TableHead>Algorithm</TableHead>
                  <TableHead>Issuer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((cert) => (
                  <TableRow key={cert.cert_id} className="hover:bg-slate-50">
                    <TableCell>{cert.parsed?.subjectCN || "-"}</TableCell>
                    <TableCell className="font-mono text-sm">{cert.serial_number}</TableCell>
                    <TableCell>{cert.parsed?.publicKeyAlgorithm || cert.key_type}</TableCell>
                    <TableCell>{cert.parsed?.issuerCN || "-"}</TableCell>
                    <TableCell>{getStatusBadge(cert.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/certificates/${cert.cert_id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-gray-500 py-4">
                      No certificates found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
