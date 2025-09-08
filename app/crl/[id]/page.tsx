import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { CRLDetails } from "@/components/crl-details"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface CRLDetailPageProps {
  params: {
    id: string
  }
}

export default function CRLDetailPage({ params }: CRLDetailPageProps) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <main className="flex-1 p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center space-x-4">
            <Link href="/crl">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to CRL
              </Button>
            </Link>
            <div className="space-y-2">
              <h1 className="text-3xl font-black font-heading text-cyan-800">CRL Details</h1>
              <p className="text-slate-600 font-body">View Certificate Revocation List information</p>
            </div>
          </div>

          {/* CRL Details */}
          <CRLDetails crlId={params.id} />
        </main>
      </div>
    </div>
  )
}
