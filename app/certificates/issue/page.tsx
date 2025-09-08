import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { CertificateIssueForm } from "@/components/certificate-issue-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function IssueCertificatePage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <main className="flex-1 p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center space-x-4">
            <Link href="/certificates">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Certificates
              </Button>
            </Link>
            <div className="space-y-2">
              <h1 className="text-3xl font-black text-cyan-800 font-sans">Issue New Certificate</h1>
              <p className="text-slate-600 font-sans">Create a new digital certificate</p>
            </div>
          </div>

          {/* Issue Form */}
          <CertificateIssueForm />
        </main>
      </div>
    </div>
  )
}
