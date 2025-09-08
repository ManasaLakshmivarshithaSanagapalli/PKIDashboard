"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Globe,
  CheckCircle,
  Clock,
  AlertTriangle,
  Copy,
  RefreshCw,
  FileText,
  Mail,
  NetworkIcon as Dns,
} from "lucide-react"

interface DomainVerificationProps {
  requestData: any
  onComplete: (data: any) => void
}

export function DomainVerification({ requestData, onComplete }: DomainVerificationProps) {
  const [selectedMethod, setSelectedMethod] = useState("dns")
  const [verificationStatus, setVerificationStatus] = useState<"pending" | "verifying" | "verified" | "failed">(
    "pending",
  )
  const [domains, setDomains] = useState([
    { domain: "example.com", status: "pending", method: "dns" },
    { domain: "api.example.com", status: "pending", method: "dns" },
  ])

  const verificationMethods = [
    {
      id: "dns",
      name: "DNS Verification",
      description: "Add a TXT record to your DNS configuration",
      icon: Dns,
      recommended: true,
    },
    {
      id: "http",
      name: "HTTP Verification",
      description: "Upload a verification file to your web server",
      icon: FileText,
      recommended: false,
    },
    {
      id: "email",
      name: "Email Verification",
      description: "Verify via email sent to domain admin contacts",
      icon: Mail,
      recommended: false,
    },
  ]

  const handleVerifyDomain = async (domain: string) => {
    setVerificationStatus("verifying")

    // Simulate verification process
    setTimeout(() => {
      setDomains((prev) => prev.map((d) => (d.domain === domain ? { ...d, status: "verified" } : d)))
      setVerificationStatus("verified")
    }, 3000)
  }

  const handleCompleteVerification = () => {
    const verificationData = {
      domains: domains,
      method: selectedMethod,
      verifiedAt: new Date().toISOString(),
      status: "completed",
    }
    onComplete(verificationData)
  }

  const allDomainsVerified = domains.every((d) => d.status === "verified")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Globe className="h-6 w-6 text-cyan-600" />
            <CardTitle className="font-black text-cyan-800 font-sans">Domain Verification</CardTitle>
          </div>
          <p className="text-slate-600 font-sans">
            Verify ownership of the domains included in your certificate request
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Domain List */}
            <div className="lg:col-span-1">
              <h3 className="font-semibold text-slate-800 mb-4 font-sans">Domains to Verify</h3>
              <div className="space-y-3">
                {domains.map((domain) => (
                  <div key={domain.domain} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-slate-800 font-sans">{domain.domain}</p>
                      <p className="text-sm text-slate-500">Method: {domain.method.toUpperCase()}</p>
                    </div>
                    <Badge
                      variant={domain.status === "verified" ? "default" : "secondary"}
                      className={domain.status === "verified" ? "bg-emerald-100 text-emerald-800" : ""}
                    >
                      {domain.status === "verified" && <CheckCircle className="h-3 w-3 mr-1" />}
                      {domain.status === "verifying" && <Clock className="h-3 w-3 mr-1" />}
                      {domain.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification Methods */}
            <div className="lg:col-span-2">
              <h3 className="font-semibold text-slate-800 mb-4 font-sans">Verification Methods</h3>

              <Tabs value={selectedMethod} onValueChange={setSelectedMethod}>
                <TabsList className="grid w-full grid-cols-3">
                  {verificationMethods.map((method) => (
                    <TabsTrigger key={method.id} value={method.id} className="relative">
                      {method.recommended && (
                        <Badge className="absolute -top-2 -right-2 text-xs bg-cyan-600">Recommended</Badge>
                      )}
                      <method.icon className="h-4 w-4 mr-2" />
                      {method.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="dns" className="space-y-4">
                  <Alert>
                    <Dns className="h-4 w-4" />
                    <AlertDescription>
                      Add the following TXT record to your DNS configuration for each domain.
                    </AlertDescription>
                  </Alert>

                  {domains.map((domain) => (
                    <Card key={domain.domain}>
                      <CardHeader>
                        <CardTitle className="text-lg font-sans">{domain.domain}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label className="font-sans">Record Type</Label>
                          <Input value="TXT" readOnly className="mt-1" />
                        </div>
                        <div>
                          <Label className="font-sans">Name/Host</Label>
                          <div className="flex mt-1">
                            <Input value={`_pki-validation.${domain.domain}`} readOnly className="flex-1" />
                            <Button variant="outline" size="sm" className="ml-2 bg-transparent">
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Label className="font-sans">Value</Label>
                          <div className="flex mt-1">
                            <Input
                              value={`pki-validation-${Math.random().toString(36).substring(7)}`}
                              readOnly
                              className="flex-1"
                            />
                            <Button variant="outline" size="sm" className="ml-2 bg-transparent">
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleVerifyDomain(domain.domain)}
                          disabled={domain.status === "verified" || verificationStatus === "verifying"}
                          className="w-full"
                        >
                          {verificationStatus === "verifying" && <RefreshCw className="h-4 w-4 mr-2 animate-spin" />}
                          {domain.status === "verified" ? "Verified" : "Verify Domain"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="http" className="space-y-4">
                  <Alert>
                    <FileText className="h-4 w-4" />
                    <AlertDescription>
                      Upload a verification file to your web server at the specified path.
                    </AlertDescription>
                  </Alert>

                  {domains.map((domain) => (
                    <Card key={domain.domain}>
                      <CardHeader>
                        <CardTitle className="text-lg font-sans">{domain.domain}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label className="font-sans">File Path</Label>
                          <div className="flex mt-1">
                            <Input
                              value={`http://${domain.domain}/.well-known/pki-validation/verification.txt`}
                              readOnly
                              className="flex-1"
                            />
                            <Button variant="outline" size="sm" className="ml-2 bg-transparent">
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Label className="font-sans">File Content</Label>
                          <div className="flex mt-1">
                            <Input
                              value={`pki-validation-${Math.random().toString(36).substring(7)}`}
                              readOnly
                              className="flex-1"
                            />
                            <Button variant="outline" size="sm" className="ml-2 bg-transparent">
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleVerifyDomain(domain.domain)}
                          disabled={domain.status === "verified" || verificationStatus === "verifying"}
                          className="w-full"
                        >
                          {verificationStatus === "verifying" && <RefreshCw className="h-4 w-4 mr-2 animate-spin" />}
                          {domain.status === "verified" ? "Verified" : "Verify Domain"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="email" className="space-y-4">
                  <Alert>
                    <Mail className="h-4 w-4" />
                    <AlertDescription>
                      Verification emails will be sent to standard admin addresses for each domain.
                    </AlertDescription>
                  </Alert>

                  {domains.map((domain) => (
                    <Card key={domain.domain}>
                      <CardHeader>
                        <CardTitle className="text-lg font-sans">{domain.domain}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label className="font-sans">Verification emails will be sent to:</Label>
                          <div className="mt-2 space-y-1">
                            {[
                              `admin@${domain.domain}`,
                              `administrator@${domain.domain}`,
                              `webmaster@${domain.domain}`,
                              `hostmaster@${domain.domain}`,
                              `postmaster@${domain.domain}`,
                            ].map((email) => (
                              <div key={email} className="text-sm text-slate-600 font-sans">
                                • {email}
                              </div>
                            ))}
                          </div>
                        </div>
                        <Button
                          onClick={() => handleVerifyDomain(domain.domain)}
                          disabled={domain.status === "verified" || verificationStatus === "verifying"}
                          className="w-full"
                        >
                          {verificationStatus === "verifying" && <RefreshCw className="h-4 w-4 mr-2 animate-spin" />}
                          {domain.status === "verified" ? "Verified" : "Send Verification Email"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex justify-end mt-8">
            <Button
              onClick={handleCompleteVerification}
              disabled={!allDomainsVerified}
              size="lg"
              className="bg-cyan-600 hover:bg-cyan-700"
            >
              {allDomainsVerified ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Continue to Identity Verification
                </>
              ) : (
                <>
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Complete Domain Verification
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
