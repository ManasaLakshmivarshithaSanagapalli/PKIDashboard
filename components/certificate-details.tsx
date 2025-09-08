"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Download, AlertTriangle, RefreshCw, CheckCircle } from "lucide-react"

interface CertificateDetailsProps {
  certificateId: string
}

// Mock data - in real app, this would come from Supabase
const certificateData = {
  id: "cert-001",
  commonName: "api.example.com",
  serialNumber: "1234567890123456",
  issuer: "CN=Intermediate CA, O=Example Corp, C=US",
  subject: "CN=api.example.com, O=Example Corp, OU=IT Department, C=US",
  status: "active",
  issuedAt: "2024-01-15T10:30:00Z",
  expiresAt: "2025-01-15T10:30:00Z",
  certificateType: "TLS Server",
  keyAlgorithm: "RSA",
  keySize: 2048,
  signatureAlgorithm: "SHA256withRSA",
  subjectAlternativeNames: ["api.example.com", "www.api.example.com", "staging.api.example.com"],
  keyUsage: ["Digital Signature", "Key Encipherment"],
  extendedKeyUsage: ["Server Authentication"],
  certificatePem: `-----BEGIN CERTIFICATE-----
MIIDXTCCAkWgAwIBAgIJAKoK/heBjcOuMA0GCSqGSIb3DQEBCwUAMEUxCzAJBgNV
BAYTAkFVMRMwEQYDVQQIDApTb21lLVN0YXRlMSEwHwYDVQQKDBhJbnRlcm5ldCBX
aWRnaXRzIFB0eSBMdGQwHhcNMTcwODI4MTkwNDUzWhcNMTgwODI4MTkwNDUzWjBF
MQswCQYDVQQGEwJBVTETMBEGA1UECAwKU29tZS1TdGF0ZTEhMB8GA1UECgwYSW50
ZXJuZXQgV2lkZ2l0cyBQdHkgTHRkMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIB
CgKCAQEAuuWiNVmvp7+8VNX2XiYqBt1tmuV5IN3HVWtysZWrjFer/7MunTlBc8+
-----END CERTIFICATE-----`,
  publicKeyPem: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuuWiNVmvp7+8VNX2XiYq
Bt1tmuV5IN3HVWtysZWrjFer/7MunTlBc8+kVqJpRxrfLfDXC7tBqBzYixQPS7H
-----END PUBLIC KEY-----`,
}

export function CertificateDetails({ certificateId }: CertificateDetailsProps) {
  const cert = certificateData // In real app, fetch by certificateId

  const getStatusBadge = (status: string) => {
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

  return (
    <div className="space-y-6">
      {/* Certificate Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <CardTitle className="font-heading text-slate-800">{cert.commonName}</CardTitle>
                {getStatusBadge(cert.status)}
              </div>
              <p className="text-slate-600 font-body">Serial: {cert.serialNumber}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Renew
              </Button>
              {cert.status === "active" && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Revoke
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Revoke Certificate</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to revoke this certificate? This action cannot be undone and will
                        immediately invalidate the certificate.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-red-600 hover:bg-red-700">Revoke Certificate</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Certificate Details Tabs */}
      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="extensions">Extensions</TabsTrigger>
          <TabsTrigger value="pem">PEM Data</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
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
                  <span className="font-medium text-slate-600">Common Name:</span>
                  <span className="font-body">{cert.commonName}</span>
                  <span className="font-medium text-slate-600">Serial Number:</span>
                  <span className="font-mono text-xs">{cert.serialNumber}</span>
                  <span className="font-medium text-slate-600">Type:</span>
                  <span className="font-body">{cert.certificateType}</span>
                  <span className="font-medium text-slate-600">Algorithm:</span>
                  <span className="font-body">
                    {cert.keyAlgorithm} {cert.keySize}
                  </span>
                  <span className="font-medium text-slate-600">Signature:</span>
                  <span className="font-body">{cert.signatureAlgorithm}</span>
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
                  <span className="font-medium text-slate-600">Issued:</span>
                  <span className="font-body">{new Date(cert.issuedAt).toLocaleDateString()}</span>
                  <span className="font-medium text-slate-600">Expires:</span>
                  <span className="font-body">{new Date(cert.expiresAt).toLocaleDateString()}</span>
                  <span className="font-medium text-slate-600">Days Remaining:</span>
                  <span className="font-body text-green-600">
                    {Math.ceil((new Date(cert.expiresAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Subject Information */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-slate-800">Subject</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-mono bg-slate-50 p-3 rounded">{cert.subject}</p>
              </CardContent>
            </Card>

            {/* Issuer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-slate-800">Issuer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-mono bg-slate-50 p-3 rounded">{cert.issuer}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="extensions" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Subject Alternative Names */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-slate-800">Subject Alternative Names</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {cert.subjectAlternativeNames.map((san, index) => (
                    <Badge key={index} variant="secondary">
                      {san}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Key Usage */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-slate-800">Key Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {cert.keyUsage.map((usage, index) => (
                    <Badge key={index} variant="outline">
                      {usage}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Extended Key Usage */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-slate-800">Extended Key Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {cert.extendedKeyUsage.map((usage, index) => (
                    <Badge key={index} variant="outline">
                      {usage}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pem" className="space-y-4">
          <div className="grid grid-cols-1 gap-6">
            {/* Certificate PEM */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-slate-800">Certificate (PEM)</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea value={cert.certificatePem} readOnly rows={12} className="font-mono text-xs" />
              </CardContent>
            </Card>

            {/* Public Key PEM */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-slate-800">Public Key (PEM)</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea value={cert.publicKeyPem} readOnly rows={8} className="font-mono text-xs" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-slate-800">Certificate History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-slate-900 font-body">Certificate Issued</p>
                    <p className="text-sm text-slate-600">Certificate was successfully issued by Intermediate CA</p>
                    <p className="text-xs text-slate-500 mt-1">January 15, 2024 at 10:30 AM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-slate-900 font-body">Certificate Request Approved</p>
                    <p className="text-sm text-slate-600">Certificate request was approved by admin@example.com</p>
                    <p className="text-xs text-slate-500 mt-1">January 15, 2024 at 10:25 AM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-slate-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-slate-900 font-body">Certificate Request Submitted</p>
                    <p className="text-sm text-slate-600">Certificate signing request submitted for api.example.com</p>
                    <p className="text-xs text-slate-500 mt-1">January 15, 2024 at 10:20 AM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
