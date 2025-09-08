"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, RefreshCw, CheckCircle } from "lucide-react"

interface CRLDetailsProps {
  crlId: string
}

// Mock CRL data
const crlData = {
  id: "crl-001",
  caName: "Root CA",
  crlNumber: 1247,
  version: "v2",
  issuer: "CN=Root CA, O=Example Corp, C=US",
  thisUpdate: "2024-01-15T10:00:00Z",
  nextUpdate: "2024-01-22T10:00:00Z",
  signatureAlgorithm: "SHA256withRSA",
  status: "current",
  revokedCount: 12,
  size: "2.4 KB",
  distributionPoints: [
    "http://crl.example.com/root.crl",
    "ldap://ldap.example.com/cn=crl",
    "http://backup.example.com/crl/root.crl",
  ],
  revokedCertificates: [
    {
      serialNumber: "1234567890123456",
      revocationDate: "2024-01-10T14:30:00Z",
      reason: "Key Compromise",
      commonName: "compromised.example.com",
    },
    {
      serialNumber: "1234567890123457",
      revocationDate: "2024-01-08T09:15:00Z",
      reason: "Superseded",
      commonName: "old.example.com",
    },
    {
      serialNumber: "1234567890123458",
      revocationDate: "2024-01-05T16:45:00Z",
      reason: "Cessation of Operation",
      commonName: "discontinued.example.com",
    },
  ],
  crlPem: `-----BEGIN X509 CRL-----
MIICjTCBtwIBATANBgkqhkiG9w0BAQsFADBFMQswCQYDVQQGEwJBVTETMBEGA1UE
CAwKU29tZS1TdGF0ZTEhMB8GA1UECgwYSW50ZXJuZXQgV2lkZ2l0cyBQdHkgTHRk
Fw0yNDAxMTUxMDAwMDBaFw0yNDAxMjIxMDAwMDBaMIGOMIGLAgEBFw0yNDAxMTAx
NDMwMDBaMGkwZwYDVR0cBGAwXjBcBgNVHRwEVTBTMFGgT6BNhktodHRwOi8vY3Js
LmV4YW1wbGUuY29tL3Jvb3QuY3JsMA0GCSqGSIb3DQEBCwUAA4IBAQBvYzX8fX9t
-----END X509 CRL-----`,
}

export function CRLDetails({ crlId }: CRLDetailsProps) {
  const crl = crlData // In real app, fetch by crlId

  const getStatusBadge = (status: string) => {
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

  const getReasonBadge = (reason: string) => {
    const colorMap: Record<string, string> = {
      "Key Compromise": "bg-red-100 text-red-800",
      Superseded: "bg-blue-100 text-blue-800",
      "Cessation of Operation": "bg-gray-100 text-gray-800",
      "Affiliation Changed": "bg-purple-100 text-purple-800",
    }

    return (
      <Badge className={`${colorMap[reason] || "bg-gray-100 text-gray-800"} hover:${colorMap[reason]}`}>{reason}</Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* CRL Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <CardTitle className="font-heading text-slate-800">{crl.caName} CRL</CardTitle>
                {getStatusBadge(crl.status)}
              </div>
              <p className="text-slate-600 font-body">CRL Number: #{crl.crlNumber}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Regenerate
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* CRL Details Tabs */}
      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="revoked">Revoked Certificates</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="pem">PEM Data</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-slate-800">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="font-medium text-slate-600">CA Name:</span>
                  <span className="font-body">{crl.caName}</span>
                  <span className="font-medium text-slate-600">CRL Number:</span>
                  <span className="font-mono">#{crl.crlNumber}</span>
                  <span className="font-medium text-slate-600">Version:</span>
                  <span className="font-body">{crl.version}</span>
                  <span className="font-medium text-slate-600">Size:</span>
                  <span className="font-body">{crl.size}</span>
                  <span className="font-medium text-slate-600">Algorithm:</span>
                  <span className="font-body">{crl.signatureAlgorithm}</span>
                </div>
              </CardContent>
            </Card>

            {/* Validity Information */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-slate-800">Validity Period</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="font-medium text-slate-600">This Update:</span>
                  <span className="font-body">{new Date(crl.thisUpdate).toLocaleString()}</span>
                  <span className="font-medium text-slate-600">Next Update:</span>
                  <span className="font-body">{new Date(crl.nextUpdate).toLocaleString()}</span>
                  <span className="font-medium text-slate-600">Time Remaining:</span>
                  <span className="font-body text-green-600">
                    {Math.ceil((new Date(crl.nextUpdate).getTime() - new Date().getTime()) / (1000 * 60 * 60))} hours
                  </span>
                  <span className="font-medium text-slate-600">Revoked Count:</span>
                  <span className="font-body text-red-600">{crl.revokedCount}</span>
                </div>
              </CardContent>
            </Card>

            {/* Issuer Information */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="font-heading text-slate-800">Issuer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-mono bg-slate-50 p-3 rounded">{crl.issuer}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revoked" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-slate-800">Revoked Certificates ({crl.revokedCount})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Serial Number</TableHead>
                      <TableHead>Common Name</TableHead>
                      <TableHead>Revocation Date</TableHead>
                      <TableHead>Reason</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {crl.revokedCertificates.map((cert, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-mono text-sm">{cert.serialNumber}</TableCell>
                        <TableCell className="font-body">{cert.commonName}</TableCell>
                        <TableCell>{new Date(cert.revocationDate).toLocaleDateString()}</TableCell>
                        <TableCell>{getReasonBadge(cert.reason)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-slate-800">Distribution Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {crl.distributionPoints.map((point, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="font-mono text-sm">{point}</span>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pem" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-slate-800">CRL Data (PEM)</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea value={crl.crlPem} readOnly rows={15} className="font-mono text-xs" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
