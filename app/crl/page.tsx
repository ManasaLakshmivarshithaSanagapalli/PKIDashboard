import { Suspense } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { CRLOverview } from "@/components/crl-overview"
import { CRLList } from "@/components/crl-list"
import { CRLDistribution } from "@/components/crl-distribution"
import { Button } from "@/components/ui/button"
import { RefreshCw, Plus } from "lucide-react"
import Link from "next/link"

export default function CRLPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <main className="flex-1 p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-black font-heading text-cyan-800">CRL Management</h1>
              <p className="text-slate-600 font-body">Manage Certificate Revocation Lists and distribution</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Generate CRL
              </Button>
              <Link href="/crl/create">
                <Button className="bg-cyan-600 hover:bg-cyan-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create CRL
                </Button>
              </Link>
            </div>
          </div>

          {/* CRL Overview */}
          <Suspense fallback={<div className="animate-pulse bg-white rounded-lg h-32" />}>
            <CRLOverview />
          </Suspense>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* CRL List */}
            <div className="lg:col-span-2">
              <Suspense fallback={<div className="animate-pulse bg-white rounded-lg h-96" />}>
                <CRLList />
              </Suspense>
            </div>

            {/* Distribution Status */}
            <div>
              <Suspense fallback={<div className="animate-pulse bg-white rounded-lg h-96" />}>
                <CRLDistribution />
              </Suspense>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
