"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, AlertTriangle, FileText, Shield, Award, Globe } from "lucide-react"
import { CertificateRequestForm } from "@/components/certificate-request-form"
import { DomainVerification } from "@/components/domain-verification"
import { IdentityVerificationWizard } from "@/components/identity-verification-wizard"
import { RAReviewPanel } from "@/components/ra-review-panel"
import { CertificateGeneration } from "@/components/certificate-generation"

export default function IssueCertificatePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [requestData, setRequestData] = useState(null)
  const [domainData, setDomainData] = useState(null) // Added domain verification data state
  const [verificationData, setVerificationData] = useState(null)
  const [reviewData, setReviewData] = useState(null)

  const steps = [
    {
      id: 1,
      title: "Certificate Request",
      description: "Submit certificate request with CSR",
      icon: FileText,
      status: currentStep > 1 ? "completed" : currentStep === 1 ? "active" : "pending",
    },
    {
      id: 2,
      title: "Domain Verification",
      description: "Verify domain ownership",
      icon: Globe,
      status: currentStep > 2 ? "completed" : currentStep === 2 ? "active" : "pending",
    },
    {
      id: 3,
      title: "Identity Verification",
      description: "KYC and identity validation",
      icon: Shield,
      status: currentStep > 3 ? "completed" : currentStep === 3 ? "active" : "pending",
    },
    {
      id: 4,
      title: "RA Review",
      description: "Registration Authority approval",
      icon: AlertTriangle,
      status: currentStep > 4 ? "completed" : currentStep === 4 ? "active" : "pending",
    },
    {
      id: 5,
      title: "Certificate Generation",
      description: "Generate and issue certificate",
      icon: Award,
      status: currentStep > 5 ? "completed" : currentStep === 5 ? "active" : "pending",
    },
  ]

  const getStepIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-emerald-600" />
      case "active":
        return <Clock className="h-5 w-5 text-cyan-600" />
      default:
        return <div className="h-5 w-5 rounded-full border-2 border-slate-300" />
    }
  }

  const handleStepComplete = (step: number, data: any) => {
    switch (step) {
      case 1:
        setRequestData(data)
        break
      case 2:
        setDomainData(data)
        break
      case 3:
        setVerificationData(data)
        break
      case 4:
        setReviewData(data)
        break
    }
    setCurrentStep(step + 1)
  }

  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-cyan-800 font-sans">Issue Certificate</h1>
        <p className="text-slate-600 mt-2 font-sans">
          Complete certificate issuance workflow with ID verification and RA approval
        </p>
      </div>

      {/* Progress Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-black text-cyan-800 font-sans">Issuance Progress</CardTitle>
            <Badge variant="outline" className="text-cyan-600">
              Step {currentStep} of {steps.length}
            </Badge>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <div
                  key={step.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg border ${
                    step.status === "active"
                      ? "border-cyan-200 bg-cyan-50"
                      : step.status === "completed"
                        ? "border-emerald-200 bg-emerald-50"
                        : "border-slate-200 bg-slate-50"
                  }`}
                >
                  <div className="flex-shrink-0">{getStepIcon(step.status)}</div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-sm font-semibold ${
                        step.status === "active"
                          ? "text-cyan-800"
                          : step.status === "completed"
                            ? "text-emerald-800"
                            : "text-slate-600"
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="text-xs text-slate-500 truncate">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <div className="min-h-[600px]">
        {currentStep === 1 && <CertificateRequestForm onComplete={(data) => handleStepComplete(1, data)} />}

        {currentStep === 2 && (
          <DomainVerification requestData={requestData} onComplete={(data) => handleStepComplete(2, data)} />
        )}

        {currentStep === 3 && (
          <IdentityVerificationWizard
            requestData={requestData}
            domainData={domainData}
            onComplete={(data) => handleStepComplete(3, data)}
          />
        )}

        {currentStep === 4 && (
          <RAReviewPanel
            requestData={requestData}
            domainData={domainData}
            verificationData={verificationData}
            onComplete={(data) => handleStepComplete(4, data)}
          />
        )}

        {currentStep === 5 && (
          <CertificateGeneration
            requestData={requestData}
            domainData={domainData}
            verificationData={verificationData}
            reviewData={reviewData}
          />
        )}
      </div>
    </div>
  )
}
