import { Suspense } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { OCSPOverview } from "@/components/ocsp-overview"
import { OCSPResponders } from "@/components/ocsp-responders"
import { OCSPAnalytics } from "@/components/ocsp-analytics"
import { OCSPTesting } from "@/components/ocsp-testing"
import { Button } from "@/components/ui/button"
import { Plus, Settings } from "lucide-react"
import Link from "next/link"

export default function OCSPPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <main className="flex-1 p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-black font-heading text-cyan-800">OCSP Status</h1>
              <p className="text-slate-600 font-body">Online Certificate Status Protocol management and monitoring</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Configure
              </Button>
              <Link href="/ocsp/responder/new">
                <Button className="bg-cyan-600 hover:bg-cyan-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Responder
                </Button>
              </Link>
            </div>
          </div>

          {/* OCSP Overview */}
          <Suspense fallback={<div className="animate-pulse bg-white rounded-lg h-32" />}>
            <OCSPOverview />
          </Suspense>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Responders & Analytics */}
            <div className="lg:col-span-2 space-y-6">
              <Suspense fallback={<div className="animate-pulse bg-white rounded-lg h-64" />}>
                <OCSPResponders />
              </Suspense>

              <Suspense fallback={<div className="animate-pulse bg-white rounded-lg h-64" />}>
                <OCSPAnalytics />
              </Suspense>
            </div>

            {/* Right Column - Testing */}
            <div>
              <Suspense fallback={<div className="animate-pulse bg-white rounded-lg h-96" />}>
                <OCSPTesting />
              </Suspense>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
