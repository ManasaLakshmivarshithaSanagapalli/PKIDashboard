import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { CertificateDetails } from "@/components/certificate-details"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function CertificateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <main className="flex-1 p-6 space-y-6">
          <div className="flex items-center space-x-4">
            <Link href="/certificates">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Certificates
              </Button>
            </Link>
            <div className="space-y-2">
              <h1 className="text-3xl font-black font-heading text-cyan-800">
                Certificate Details
              </h1>
              <p className="text-slate-600 font-body">
                View and manage certificate information
              </p>
            </div>
          </div>
          <CertificateDetails certificateId={id} />
        </main>
      </div>
    </div>
  )
}
