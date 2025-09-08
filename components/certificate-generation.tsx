"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Download, Copy, Award, Key, FileText } from "lucide-react"

interface CertificateGenerationProps {
  requestData: any
  verificationData: any
  reviewData: any
}

export function CertificateGeneration({ requestData, verificationData, reviewData }: CertificateGenerationProps) {
  const [generationStep, setGenerationStep] = useState(1)
  const [progress, setProgress] = useState(0)
  const [certificateData, setCertificateData] = useState({
    serialNumber: "",
    certificate: "",
    privateKey: "",
    publicKey: "",
    certificateChain: "",
    issuedAt: "",
    expiresAt: "",
  })

  const generationSteps = [
    { id: 1, title: "Key Pair Generation", description: "Generating cryptographic keys" },
    { id: 2, title: "Certificate Signing", description: "Signing certificate with CA" },
    { id: 3, title: "Certificate Chain", description: "Building certificate chain" },
    { id: 4, title: "Final Validation", description: "Validating generated certificate" },
  ]

  useEffect(() => {
    // Simulate certificate generation process
    const generateCertificate = async () => {
      for (let step = 1; step <= 4; step++) {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setGenerationStep(step)
        setProgress((step / 4) * 100)
      }

      // Set mock certificate data
      setCertificateData({
        serialNumber: `${Math.floor(Math.random() * 1000000000)}`,
        certificate: `-----BEGIN CERTIFICATE-----
MIIDXTCCAkWgAwIBAgIJAKoK/heBjcOuMA0GCSqGSIb3DQEBBQUAMEUxCzAJBgNV
BAYTAkFVMRMwEQYDVQQIDApTb21lLVN0YXRlMSEwHwYDVQQKDBhJbnRlcm5ldCBX
aWRnaXRzIFB0eSBMdGQwHhcNMTMwOTI5MTQwNTQyWhcNMjMwOTI3MTQwNTQyWjBF
MQswCQYDVQQGEwJBVTETMBEGA1UECAwKU29tZS1TdGF0ZTEhMB8GA1UECgwYSW50
ZXJuZXQgV2lkZ2l0cyBQdHkgTHRkMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIB
CgKCAQEAwuTVdx0S7ck1tZGXXTzWqbtdZmdayqtuATNls2ccxlw7QC0jzA5Ojb7L
...
-----END CERTIFICATE-----`,
        privateKey: `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDC5NV3HRLtyTW1
kZddPNapu11mZ1rKq24BM2WzZxzGXDtALSPMDk6NvssrpGC/g4R4rlG/aEyDx2te
...
-----END PRIVATE KEY-----`,
        publicKey: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwuTVdx0S7ck1tZGXXTzW
qbtdZmdayqtuATNls2ccxlw7QC0jzA5Ojb7LK6Rgv4OEeK5Rv2hMg8drXmwjVBwz
...
-----END PUBLIC KEY-----`,
        certificateChain: `-----BEGIN CERTIFICATE-----
[Intermediate CA Certificate]
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
[Root CA Certificate]
-----END CERTIFICATE-----`,
        issuedAt: new Date().toISOString(),
        expiresAt: new Date(
          Date.now() + Number.parseInt(requestData?.validityPeriod || "365") * 24 * 60 * 60 * 1000,
        ).toISOString(),
      })
    }

    generateCertificate()
  }, [requestData])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const downloadCertificate = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-black text-cyan-800">Certificate Generation</CardTitle>
          <CardDescription>Generating your digital certificate</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={progress} className="h-3" />
            <div className="grid gap-3">
              {generationSteps.map((step) => (
                <div
                  key={step.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    generationStep > step.id
                      ? "bg-emerald-50 border border-emerald-200"
                      : generationStep === step.id
                        ? "bg-cyan-50 border border-cyan-200"
                        : "bg-slate-50 border border-slate-200"
                  }`}
                >
                  <div className="flex-shrink-0">
                    {generationStep > step.id ? (
                      <CheckCircle className="h-5 w-5 text-emerald-600" />
                    ) : generationStep === step.id ? (
                      <div className="h-5 w-5 border-2 border-cyan-600 rounded-full animate-spin border-t-transparent" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-slate-300" />
                    )}
                  </div>
                  <div>
                    <p
                      className={`font-medium ${
                        generationStep > step.id
                          ? "text-emerald-800"
                          : generationStep === step.id
                            ? "text-cyan-800"
                            : "text-slate-600"
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="text-sm text-slate-500">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {progress === 100 && (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Award className="h-6 w-6 text-emerald-600" />
                <CardTitle className="font-black text-emerald-800">Certificate Generated Successfully!</CardTitle>
              </div>
              <CardDescription>Your digital certificate has been issued and is ready for use</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-slate-700">Serial Number</p>
                  <p className="text-sm text-slate-900">{certificateData.serialNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">Common Name</p>
                  <p className="text-sm text-slate-900">{requestData?.commonName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">Issued At</p>
                  <p className="text-sm text-slate-900">{new Date(certificateData.issuedAt).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">Expires At</p>
                  <p className="text-sm text-slate-900">{new Date(certificateData.expiresAt).toLocaleString()}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  className="bg-cyan-600 hover:bg-cyan-700"
                  onClick={() => downloadCertificate(certificateData.certificate, `${requestData?.commonName}.crt`)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Certificate
                </Button>
                <Button
                  variant="outline"
                  onClick={() => downloadCertificate(certificateData.privateKey, `${requestData?.commonName}.key`)}
                >
                  <Key className="h-4 w-4 mr-2" />
                  Download Private Key
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    downloadCertificate(certificateData.certificateChain, `${requestData?.commonName}-chain.crt`)
                  }
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Download Chain
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-slate-800">Certificate Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Certificate (PEM)</p>
                  <Button size="sm" variant="outline" onClick={() => copyToClipboard(certificateData.certificate)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <Textarea value={certificateData.certificate} readOnly rows={8} className="font-mono text-xs" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Private Key (PEM)</p>
                  <Button size="sm" variant="outline" onClick={() => copyToClipboard(certificateData.privateKey)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <Textarea value={certificateData.privateKey} readOnly rows={8} className="font-mono text-xs" />
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
