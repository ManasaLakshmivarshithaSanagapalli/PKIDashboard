import { Suspense } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { CertificateList } from "@/components/certificate-list"
import { CertificateFilters } from "@/components/certificate-filters"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function CertificatesPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <main className="flex-1 p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-black font-heading text-cyan-800">Certificates</h1>
              <p className="text-slate-600 font-body">Manage your digital certificates and their lifecycle</p>
            </div>
            <Link href="/certificates/issue">
              <Button className="bg-cyan-600 hover:bg-cyan-700">
                <Plus className="h-4 w-4 mr-2" />
                Issue Certificate
              </Button>
            </Link>
          </div>

          {/* Filters */}
          <Suspense fallback={<div className="animate-pulse bg-white rounded-lg h-16" />}>
            <CertificateFilters />
          </Suspense>

          {/* Certificate List */}
          <Suspense fallback={<div className="animate-pulse bg-white rounded-lg h-96" />}>
            <CertificateList />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
