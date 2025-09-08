import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { HSMConfigurationForm } from "@/components/hsm-configuration-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ConfigureHSMPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <main className="flex-1 p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center space-x-4">
            <Link href="/hsm">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to HSM
              </Button>
            </Link>
            <div className="space-y-2">
              <h1 className="text-3xl font-black font-heading text-cyan-800">Configure HSM</h1>
              <p className="text-slate-600 font-body">Set up a new Hardware Security Module connection</p>
            </div>
          </div>

          {/* Configuration Form */}
          <HSMConfigurationForm />
        </main>
      </div>
    </div>
  )
}
