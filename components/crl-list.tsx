"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Download, RefreshCw, CheckCircle, Clock, AlertTriangle } from "lucide-react"
import Link from "next/link"

// Mock CRL data
const crlData = [
  {
    id: "crl-001",
    caName: "Root CA",
    crlNumber: 1247,
    thisUpdate: "2024-01-15T10:00:00Z",
    nextUpdate: "2024-01-22T10:00:00Z",
    revokedCount: 12,
    status: "current",
    distributionPoints: ["http://crl.example.com/root.crl", "ldap://ldap.example.com/cn=crl"],
    size: "2.4 KB",
  },
  {
    id: "crl-002",
    caName: "Intermediate CA",
    crlNumber: 892,
    thisUpdate: "2024-01-14T15:30:00Z",
    nextUpdate: "2024-01-21T15:30:00Z",
    revokedCount: 23,
    status: "current",
    distributionPoints: ["http://crl.example.com/intermediate.crl"],
    size: "3.1 KB",
  },
  {
    id: "crl-003",
    caName: "Email CA",
    crlNumber: 456,
    thisUpdate: "2024-01-13T08:00:00Z",
    nextUpdate: "2024-01-20T08:00:00Z",
    revokedCount: 8,
    status: "expiring",
    distributionPoints: ["http://crl.example.com/email.crl"],
    size: "1.8 KB",
  },
  {
    id: "crl-004",
    caName: "Code Signing CA",
    crlNumber: 234,
    thisUpdate: "2024-01-10T12:00:00Z",
    nextUpdate: "2024-01-17T12:00:00Z",
    revokedCount: 4,
    status: "expired",
    distributionPoints: ["http://crl.example.com/codesign.crl"],
    size: "1.2 KB",
  },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "current":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Current</Badge>
    case "expiring":
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Expiring Soon</Badge>
    case "expired":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Expired</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case "current":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "expiring":
      return <Clock className="h-4 w-4 text-amber-600" />
    case "expired":
      return <AlertTriangle className="h-4 w-4 text-red-600" />
    default:
      return null
  }
}

export function CRLList() {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="font-heading text-slate-800">Certificate Revocation Lists</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>CA Name</TableHead>
                <TableHead>CRL Number</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Revoked Certs</TableHead>
                <TableHead>Next Update</TableHead>
                <TableHead>Size</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {crlData.map((crl) => (
                <TableRow key={crl.id} className="hover:bg-slate-50">
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(crl.status)}
                      <span className="font-medium font-body">{crl.caName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">#{crl.crlNumber}</TableCell>
                  <TableCell>{getStatusBadge(crl.status)}</TableCell>
                  <TableCell>
                    <span className={crl.revokedCount > 0 ? "text-red-600 font-medium" : "text-slate-600"}>
                      {crl.revokedCount}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={crl.status === "expiring" ? "text-amber-600 font-medium" : ""}>
                      {new Date(crl.nextUpdate).toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-600">{crl.size}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/crl/${crl.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Download CRL
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Regenerate
                        </DropdownMenuItem>
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
