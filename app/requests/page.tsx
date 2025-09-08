import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RequestOverview } from "@/components/request-overview"
import { RequestQueue } from "@/components/request-queue"
import { RequestTemplates } from "@/components/request-templates"
import { RequestHistory } from "@/components/request-history"

export default function CertificateRequestsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-cyan-800 font-sans">Certificate Requests</h1>
        <p className="text-slate-600 mt-2 font-sans">Manage certificate requests and approval workflows</p>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <RequestOverview />
      </Suspense>

      <Tabs defaultValue="queue" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="queue">Request Queue</TabsTrigger>
          <TabsTrigger value="templates">Request Templates</TabsTrigger>
          <TabsTrigger value="history">Request History</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="queue" className="space-y-6">
          <RequestQueue />
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <RequestTemplates />
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <RequestHistory />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-black text-cyan-800">Request Configuration</CardTitle>
              <CardDescription>Configure certificate request policies and workflows</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">Request configuration settings will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
