"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Eye, Settings, Download, Shield, AlertTriangle } from "lucide-react"
import Link from "next/link"

export function CAList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const cas = [
    {
      id: "ca-001",
      name: "Production Root CA",
      commonName: "CN=Production Root CA, O=Company Inc, C=US",
      type: "root_ca",
      status: "active",
      keyAlgorithm: "RSA",
      keySize: 4096,
      validFrom: "2024-01-01",
      validTo: "2034-01-01",
      serialNumber: "1A2B3C4D5E6F",
      issuedCerts: 156,
      parentCA: null,
    },
    {
      id: "ca-002",
      name: "TLS Issuing CA",
      commonName: "CN=TLS Issuing CA, O=Company Inc, C=US",
      type: "intermediate_ca",
      status: "active",
      keyAlgorithm: "RSA",
      keySize: 3072,
      validFrom: "2024-01-01",
      validTo: "2027-01-01",
      serialNumber: "2B3C4D5E6F7A",
      issuedCerts: 1247,
      parentCA: "Production Root CA",
    },
    {
      id: "ca-003",
      name: "Email CA",
      commonName: "CN=Email CA, O=Company Inc, C=US",
      type: "intermediate_ca",
      status: "active",
      keyAlgorithm: "RSA",
      keySize: 2048,
      validFrom: "2024-01-01",
      validTo: "2026-01-01",
      serialNumber: "3C4D5E6F7A8B",
      issuedCerts: 89,
      parentCA: "Production Root CA",
    },
    {
      id: "ca-004",
      name: "Code Signing CA",
      commonName: "CN=Code Signing CA, O=Company Inc, C=US",
      type: "intermediate_ca",
      status: "expiring_soon",
      keyAlgorithm: "RSA",
      keySize: 3072,
      validFrom: "2021-01-01",
      validTo: "2024-03-01",
      serialNumber: "4D5E6F7A8B9C",
      issuedCerts: 23,
      parentCA: "Production Root CA",
    },
  ]

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      expiring_soon: "secondary",
      expired: "destructive",
      revoked: "destructive",
      suspended: "outline",
    } as const

    const labels = {
      active: "Active",
      expiring_soon: "Expiring Soon",
      expired: "Expired",
      revoked: "Revoked",
      suspended: "Suspended",
    }

    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {labels[status as keyof typeof labels] || status}
      </Badge>
    )
  }

  const getTypeIcon = (type: string) => {
    return type === "root_ca" ? (
      <Shield className="h-4 w-4 text-emerald-600" />
    ) : (
      <Shield className="h-4 w-4 text-blue-600" />
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-black text-cyan-800">Certificate Authorities</CardTitle>
            <CardDescription>Manage your PKI Certificate Authority infrastructure</CardDescription>
          </div>
          <Link href="/ca/create">
            <Button className="bg-cyan-600 hover:bg-cyan-700">
              <Plus className="h-4 w-4 mr-2" />
              Create CA
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search Certificate Authorities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="expiring_soon">Expiring Soon</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="revoked">Revoked</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="root_ca">Root CA</SelectItem>
              <SelectItem value="intermediate_ca">Intermediate CA</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>CA Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Key Algorithm</TableHead>
                <TableHead>Valid Until</TableHead>
                <TableHead>Issued Certificates</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cas.map((ca) => (
                <TableRow key={ca.id} className="hover:bg-slate-50">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      {getTypeIcon(ca.type)}
                      <div>
                        <div className="font-medium text-slate-900">{ca.name}</div>
                        <div className="text-sm text-slate-500 max-w-xs truncate" title={ca.commonName}>
                          {ca.commonName}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{ca.type === "root_ca" ? "Root CA" : "Intermediate CA"}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(ca.status)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{ca.keyAlgorithm}</div>
                      <div className="text-slate-500">{ca.keySize} bits</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{new Date(ca.validTo).toLocaleDateString()}</div>
                      {ca.status === "expiring_soon" && (
                        <div className="flex items-center text-amber-600 text-xs">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Expires soon
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium">{ca.issuedCerts.toLocaleString()}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
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
