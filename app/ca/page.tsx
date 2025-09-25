"use client"

import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs"
import { CAOverview } from "@/components/ca-overview"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function CertificateAuthoritiesPage() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-black text-cyan-800 font-sans">
            Certificate Authorities
          </h1>
          <p className="text-slate-600 mt-2 font-sans">
            Manage your PKI Certificate Authority infrastructure
          </p>
        </div>

        {/* CA Overview */}
        <Suspense fallback={<div>Loading...</div>}>
          <CAOverview />
        </Suspense>

        {/* Tabs */}
        <Tabs defaultValue="authorities" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4"></TabsList>
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-black text-cyan-800">CA Configuration</CardTitle>
                <CardDescription>
                  Configure Certificate Authority global settings and policies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  CA configuration settings will be implemented here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
