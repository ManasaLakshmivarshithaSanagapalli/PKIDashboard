import { Suspense } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AuditOverview } from "@/components/audit-overview"
import { AuditLogs } from "@/components/audit-logs"
import { AuditReports } from "@/components/audit-reports"
import { AuditSettings } from "@/components/audit-settings"

export default function AuditLogsPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <main className="flex-1 p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-black text-cyan-800 font-sans">Audit Logs</h1>
            <p className="text-slate-600 mt-2 font-sans">
              Monitor and analyze PKI system activities and security events
            </p>
          </div>

          <Suspense fallback={<div>Loading...</div>}>
            <AuditOverview />
          </Suspense>

          <Tabs defaultValue="logs" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="logs">Activity Logs</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="alerts">Security Alerts</TabsTrigger>
              <TabsTrigger value="settings">Audit Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="logs" className="space-y-6">
              <AuditLogs />
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <AuditReports />
            </TabsContent>

            <TabsContent value="alerts" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-black text-cyan-800">Security Alerts</CardTitle>
                  <CardDescription>Real-time security alerts and suspicious activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">Security alerts monitoring will be implemented here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <AuditSettings />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
