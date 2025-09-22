"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, FileUp, Key } from "lucide-react";
import GenerateKeyPageEncrypAlgo from "@/components/encryption-algo-form";
import { useState } from "react";
import GenerateKeyPageCSR from "@/components/csr-form";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";

export default function GenerateKeyPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const modes = [
    {
      id: 1,
      title: "Encryption Algorithm",
      description: "Generate key pair using RSA or ECC",
      icon: Key,
      status: currentStep == 1 ? "active" : "inactive",
    },
    {
      id: 2,
      title: "CSR",
      description: "Generate key pair with CSR",
      icon: FileUp,
      status: currentStep == 2 ? "active" : "inactive",
    },
  ]

  const getStepIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "active":
        return <Clock className="h-5 w-5 text-cyan-600" />
      default:
        return <div className="h-5 w-5 rounded-full border-2 border-slate-300" />
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <main className="flex-1 p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-black text-cyan-800 font-sans">Generate Key Pair</h1>
            <p className="text-slate-600 mt-2 font-sans">
              Complete key pair generation according to your security requirements
            </p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-black text-cyan-800 font-sans">Key Pair Generation Mode</CardTitle>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {modes.map((mode) => {
                  const Icon = mode.icon
                  return (
                    <div
                      key={mode.id}
                      className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-transform hover:scale-105 ${
                        mode.status === "active"
                          ? "border-cyan-200 bg-cyan-50"
                          : "border-slate-200 bg-slate-50"
                      }`}
                      onClick={() => setCurrentStep(mode.id)}
                    >
                      <div className="flex-shrink-0">{getStepIcon(mode.status)}</div>
                      <div className="min-w-0 flex-1">
                        <p
                          className={`text-sm font-semibold ${
                            mode.status === "active"
                              ? "text-cyan-800"
                              : mode.status === "completed"
                                ? "border-emerald-200 bg-emerald-50"
                                : "text-slate-600"
                          }`}
                        >
                          {mode.title}
                        </p>
                        <p className="text-xs text-slate-500 truncate">{mode.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Mode Content */}
          <div className="min-h-[600px]">
            {currentStep === 1 && <GenerateKeyPageEncrypAlgo/>}

            {currentStep === 2 && <GenerateKeyPageCSR/>}
          </div>
        </main>
      </div>
    </div>
  )
}
