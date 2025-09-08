import { Suspense } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardOverview } from "@/components/dashboard-overview"
import { CertificateStats } from "@/components/certificate-stats"
import { SystemStatus } from "@/components/system-status"
import { RecentActivity } from "@/components/recent-activity"
import { QuickActions } from "@/components/quick-actions"

export default function PKIDashboard() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <main className="flex-1 p-6 space-y-6">
          {/* Dashboard Overview */}
          <div className="space-y-2">
            <h1 className="text-3xl font-black font-heading text-cyan-800">PKI Management Dashboard</h1>
            <p className="text-slate-600 font-body">Secure your digital assets with robust PKI management tools</p>
          </div>

          {/* Stats Grid */}
          <Suspense fallback={<div className="animate-pulse bg-white rounded-lg h-32" />}>
            <CertificateStats />
          </Suspense>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Overview */}
            <div className="lg:col-span-2 space-y-6">
              <Suspense fallback={<div className="animate-pulse bg-white rounded-lg h-64" />}>
                <DashboardOverview />
              </Suspense>

              <Suspense fallback={<div className="animate-pulse bg-white rounded-lg h-48" />}>
                <RecentActivity />
              </Suspense>
            </div>

            {/* Right Column - Status & Actions */}
            <div className="space-y-6">
              <Suspense fallback={<div className="animate-pulse bg-white rounded-lg h-48" />}>
                <SystemStatus />
              </Suspense>

              <QuickActions />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
