"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Download, AlertTriangle, CheckCircle } from "lucide-react"
import Link from "next/link"

// Mock data - in real app, this would come from Supabase
const certificates = [
  {
    id: "cert-001",
    commonName: "api.example.com",
    serialNumber: "1234567890123456",
    issuer: "Intermediate CA",
    status: "active",
    issuedAt: "2024-01-15",
    expiresAt: "2025-01-15",
    certificateType: "TLS Server",
    keyAlgorithm: "RSA",
    keySize: 2048,
  },
  {
    id: "cert-002",
    commonName: "app.example.com",
    serialNumber: "1234567890123457",
    issuer: "Intermediate CA",
    status: "expiring",
    issuedAt: "2024-02-01",
    expiresAt: "2024-12-25",
    certificateType: "TLS Server",
    keyAlgorithm: "RSA",
    keySize: 2048,
  },
  {
    id: "cert-003",
    commonName: "old.example.com",
    serialNumber: "1234567890123458",
    issuer: "Root CA",
    status: "revoked",
    issuedAt: "2023-06-10",
    expiresAt: "2024-06-10",
    certificateType: "TLS Server",
    keyAlgorithm: "RSA",
    keySize: 2048,
  },
  {
    id: "cert-004",
    commonName: "john.doe@example.com",
    serialNumber: "1234567890123459",
    issuer: "Email CA",
    status: "active",
    issuedAt: "2024-03-01",
    expiresAt: "2025-03-01",
    certificateType: "Email",
    keyAlgorithm: "RSA",
    keySize: 2048,
  },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "active":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
    case "expiring":
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Expiring Soon</Badge>
    case "revoked":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Revoked</Badge>
    case "expired":
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Expired</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case "active":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "expiring":
    case "expired":
    case "revoked":
      return <AlertTriangle className="h-4 w-4 text-amber-600" />
    default:
      return null
  }
}

export function CertificateList() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCertificates = certificates.filter(
    (cert) =>
      cert.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.serialNumber.includes(searchTerm) ||
      cert.issuer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-heading text-slate-800">All Certificates</CardTitle>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Search certificates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Common Name</TableHead>
                <TableHead>Serial Number</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Issuer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCertificates.map((cert) => (
                <TableRow key={cert.id} className="hover:bg-slate-50">
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(cert.status)}
                      <span className="font-medium font-body">{cert.commonName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{cert.serialNumber}</TableCell>
                  <TableCell>{cert.certificateType}</TableCell>
                  <TableCell>{cert.issuer}</TableCell>
                  <TableCell>{getStatusBadge(cert.status)}</TableCell>
                  <TableCell>
                    <span className={cert.status === "expiring" ? "text-amber-600 font-medium" : ""}>
                      {cert.expiresAt}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/certificates/${cert.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        {cert.status === "active" && (
                          <DropdownMenuItem className="text-red-600">
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            Revoke
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
