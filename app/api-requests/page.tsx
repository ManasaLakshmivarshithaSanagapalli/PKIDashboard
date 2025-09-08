"use client"

import { Suspense } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { APIOverview } from "@/components/api-overview"
import { APIEndpoints } from "@/components/api-endpoints"
import { APIKeyManagement } from "@/components/api-key-management"
import { APIRequestLogs } from "@/components/api-request-logs"

export default function APIRequestsPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <main className="flex-1 p-6 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-cyan-800">API Management</h1>
            <p className="text-slate-600">Monitor API usage, manage endpoints, and control access keys</p>
          </div>

          {/* API Overview Stats */}
          <Suspense fallback={<div className="animate-pulse bg-white rounded-lg h-32" />}>
            <APIOverview />
          </Suspense>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* API Endpoints */}
            <Suspense fallback={<div className="animate-pulse bg-white rounded-lg h-64" />}>
              <APIEndpoints />
            </Suspense>

            {/* API Key Management */}
            <Suspense fallback={<div className="animate-pulse bg-white rounded-lg h-64" />}>
              <APIKeyManagement />
            </Suspense>
          </div>

          {/* API Request Logs */}
          <Suspense fallback={<div className="animate-pulse bg-white rounded-lg h-48" />}>
            <APIRequestLogs />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
