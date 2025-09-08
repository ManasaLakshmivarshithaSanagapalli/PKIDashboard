import { Suspense } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { HSMOverview } from "@/components/hsm-overview"
import { HSMList } from "@/components/hsm-list"
import { HSMHealthMonitor } from "@/components/hsm-health-monitor"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function HSMPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <main className="flex-1 p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-black font-heading text-cyan-800">HSM Integration</h1>
              <p className="text-slate-600 font-body">Manage Hardware Security Modules and cryptographic operations</p>
            </div>
            <Link href="/hsm/configure">
              <Button className="bg-cyan-600 hover:bg-cyan-700">
                <Plus className="h-4 w-4 mr-2" />
                Configure HSM
              </Button>
            </Link>
          </div>

          {/* HSM Overview */}
          <Suspense fallback={<div className="animate-pulse bg-white rounded-lg h-32" />}>
            <HSMOverview />
          </Suspense>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* HSM List */}
            <div className="lg:col-span-2">
              <Suspense fallback={<div className="animate-pulse bg-white rounded-lg h-96" />}>
                <HSMList />
              </Suspense>
            </div>

            {/* Health Monitor */}
            <div>
              <Suspense fallback={<div className="animate-pulse bg-white rounded-lg h-96" />}>
                <HSMHealthMonitor />
              </Suspense>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
