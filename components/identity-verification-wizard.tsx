"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Upload, FileText, Globe, Building, AlertTriangle } from "lucide-react"

interface IdentityVerificationWizardProps {
  requestData: any
  onComplete: (data: any) => void
}

export function IdentityVerificationWizard({ requestData, onComplete }: IdentityVerificationWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [verificationData, setVerificationData] = useState({
    verificationType: "",
    domainValidation: {
      method: "",
      status: "pending",
      dnsRecord: "",
      httpToken: "",
      verified: false,
    },
    organizationValidation: {
      businessLicense: null,
      articlesOfIncorporation: null,
      taxId: "",
      phoneVerified: false,
      addressVerified: false,
    },
    extendedValidation: {
      legalEntityVerification: false,
      operationalExistence: false,
      physicalAddress: false,
      telephoneNumber: false,
      domainControl: false,
      requestAuthorization: false,
    },
    documents: [] as any[],
    notes: "",
  })

  const verificationSteps = [
    { id: 1, title: "Verification Type", completed: currentStep > 1 },
    { id: 2, title: "Domain Validation", completed: currentStep > 2 },
    { id: 3, title: "Organization Validation", completed: currentStep > 3 },
    { id: 4, title: "Document Review", completed: currentStep > 4 },
  ]

  const handleDomainValidation = () => {
    // Simulate domain validation
    setTimeout(() => {
      setVerificationData((prev) => ({
        ...prev,
        domainValidation: {
          ...prev.domainValidation,
          status: "verified",
          verified: true,
        },
      }))
    }, 2000)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, docType: string) => {
    const file = event.target.files?.[0]
    if (file) {
      setVerificationData((prev) => ({
        ...prev,
        documents: [...prev.documents, { type: docType, file: file.name, uploaded: new Date() }],
      }))
    }
  }

  const handleComplete = () => {
    onComplete(verificationData)
  }

  const progressPercentage = ((currentStep - 1) / (verificationSteps.length - 1)) * 100

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-black text-cyan-800">Identity Verification & KYC</CardTitle>
          <CardDescription>Complete identity verification for certificate request</CardDescription>
          <Progress value={progressPercentage} className="h-2" />
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            {verificationSteps.map((step) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    step.completed
                      ? "bg-emerald-500 border-emerald-500 text-white"
                      : currentStep === step.id
                        ? "border-cyan-500 text-cyan-500"
                        : "border-slate-300 text-slate-300"
                  }`}
                >
                  {step.completed ? <CheckCircle className="h-4 w-4" /> : step.id}
                </div>
                <span
                  className={`ml-2 text-sm ${
                    step.completed ? "text-emerald-600" : currentStep === step.id ? "text-cyan-600" : "text-slate-400"
                  }`}
                >
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Verification Type */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-slate-800">Select Verification Type</CardTitle>
            <CardDescription>Choose the appropriate verification method based on certificate type</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  verificationData.verificationType === "domain"
                    ? "border-cyan-500 bg-cyan-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
                onClick={() => setVerificationData((prev) => ({ ...prev, verificationType: "domain" }))}
              >
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-cyan-600" />
                  <div>
                    <h3 className="font-semibold">Domain Validation (DV)</h3>
                    <p className="text-sm text-slate-600">Verify domain ownership only</p>
                  </div>
                </div>
              </div>

              <div
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  verificationData.verificationType === "organization"
                    ? "border-cyan-500 bg-cyan-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
                onClick={() => setVerificationData((prev) => ({ ...prev, verificationType: "organization" }))}
              >
                <div className="flex items-center space-x-3">
                  <Building className="h-5 w-5 text-cyan-600" />
                  <div>
                    <h3 className="font-semibold">Organization Validation (OV)</h3>
                    <p className="text-sm text-slate-600">Verify domain ownership and organization details</p>
                  </div>
                </div>
              </div>

              <div
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  verificationData.verificationType === "extended"
                    ? "border-cyan-500 bg-cyan-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
                onClick={() => setVerificationData((prev) => ({ ...prev, verificationType: "extended" }))}
              >
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-5 w-5 text-cyan-600" />
                  <div>
                    <h3 className="font-semibold">Extended Validation (EV)</h3>
                    <p className="text-sm text-slate-600">
                      Comprehensive verification including legal entity validation
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Button
              className="w-full bg-cyan-600 hover:bg-cyan-700"
              onClick={() => setCurrentStep(2)}
              disabled={!verificationData.verificationType}
            >
              Continue to Domain Validation
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Domain Validation */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-slate-800">Domain Validation</CardTitle>
            <CardDescription>Verify ownership of {requestData?.commonName}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="dns" className="space-y-4">
              <TabsList>
                <TabsTrigger value="dns">DNS Validation</TabsTrigger>
                <TabsTrigger value="http">HTTP Validation</TabsTrigger>
                <TabsTrigger value="email">Email Validation</TabsTrigger>
              </TabsList>

              <TabsContent value="dns" className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-semibold mb-2">DNS TXT Record</h4>
                  <p className="text-sm text-slate-600 mb-2">Add the following TXT record to your DNS:</p>
                  <div className="bg-white p-3 rounded border font-mono text-sm">
                    _acme-challenge.{requestData?.commonName} TXT "abc123def456ghi789"
                  </div>
                </div>
                <Button
                  onClick={handleDomainValidation}
                  className="bg-cyan-600 hover:bg-cyan-700"
                  disabled={verificationData.domainValidation.status === "verified"}
                >
                  {verificationData.domainValidation.status === "verified" ? "Verified" : "Verify DNS Record"}
                </Button>
              </TabsContent>

              <TabsContent value="http" className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-semibold mb-2">HTTP Token</h4>
                  <p className="text-sm text-slate-600 mb-2">Place this file at the following URL:</p>
                  <div className="bg-white p-3 rounded border font-mono text-sm">
                    http://{requestData?.commonName}/.well-known/acme-challenge/token123
                  </div>
                </div>
                <Button onClick={handleDomainValidation} className="bg-cyan-600 hover:bg-cyan-700">
                  Verify HTTP Token
                </Button>
              </TabsContent>

              <TabsContent value="email" className="space-y-4">
                <div className="space-y-2">
                  <Label>Select validation email address:</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose email" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={`admin@${requestData?.commonName}`}>
                        admin@{requestData?.commonName}
                      </SelectItem>
                      <SelectItem value={`webmaster@${requestData?.commonName}`}>
                        webmaster@{requestData?.commonName}
                      </SelectItem>
                      <SelectItem value={`postmaster@${requestData?.commonName}`}>
                        postmaster@{requestData?.commonName}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleDomainValidation} className="bg-cyan-600 hover:bg-cyan-700">
                  Send Validation Email
                </Button>
              </TabsContent>
            </Tabs>

            {verificationData.domainValidation.verified && (
              <div className="flex items-center space-x-2 text-emerald-600">
                <CheckCircle className="h-5 w-5" />
                <span>Domain validation completed successfully</span>
              </div>
            )}

            <Button
              className="w-full bg-cyan-600 hover:bg-cyan-700"
              onClick={() => setCurrentStep(3)}
              disabled={!verificationData.domainValidation.verified}
            >
              Continue to Organization Validation
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Organization Validation */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-slate-800">Organization Validation</CardTitle>
            <CardDescription>Verify organization details and upload required documents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>Business License</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="file"
                    accept=".pdf,.jpg,.png"
                    onChange={(e) => handleFileUpload(e, "business_license")}
                    className="hidden"
                    id="business-license"
                  />
                  <Label htmlFor="business-license" className="cursor-pointer">
                    <div className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-md hover:bg-slate-50">
                      <Upload className="h-4 w-4" />
                      <span>Upload Business License</span>
                    </div>
                  </Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Articles of Incorporation</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="file"
                    accept=".pdf,.jpg,.png"
                    onChange={(e) => handleFileUpload(e, "articles_incorporation")}
                    className="hidden"
                    id="articles-incorporation"
                  />
                  <Label htmlFor="articles-incorporation" className="cursor-pointer">
                    <div className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-md hover:bg-slate-50">
                      <Upload className="h-4 w-4" />
                      <span>Upload Articles of Incorporation</span>
                    </div>
                  </Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxId">Tax ID / EIN</Label>
                <Input
                  id="taxId"
                  placeholder="12-3456789"
                  value={verificationData.organizationValidation.taxId}
                  onChange={(e) =>
                    setVerificationData((prev) => ({
                      ...prev,
                      organizationValidation: {
                        ...prev.organizationValidation,
                        taxId: e.target.value,
                      },
                    }))
                  }
                />
              </div>
            </div>

            {verificationData.documents.length > 0 && (
              <div className="space-y-2">
                <Label>Uploaded Documents</Label>
                <div className="space-y-2">
                  {verificationData.documents.map((doc, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-slate-50 rounded">
                      <FileText className="h-4 w-4 text-slate-600" />
                      <span className="text-sm">{doc.file}</span>
                      <Badge variant="secondary">{doc.type.replace("_", " ")}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button
              className="w-full bg-cyan-600 hover:bg-cyan-700"
              onClick={() => setCurrentStep(4)}
              disabled={verificationData.documents.length === 0}
            >
              Continue to Document Review
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Document Review */}
      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-slate-800">Document Review Complete</CardTitle>
            <CardDescription>Identity verification process completed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
                <span className="font-semibold text-emerald-800">Verification Complete</span>
              </div>
              <p className="text-sm text-emerald-700 mt-2">
                All required verification steps have been completed successfully.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional notes for the RA reviewer..."
                value={verificationData.notes}
                onChange={(e) => setVerificationData((prev) => ({ ...prev, notes: e.target.value }))}
              />
            </div>

            <Button className="w-full bg-cyan-600 hover:bg-cyan-700" onClick={handleComplete}>
              Submit for RA Review
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
