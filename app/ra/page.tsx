import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RAOverview } from "@/components/ra-overview"
import { RequestQueue } from "@/components/request-queue"
import { IdentityVerification } from "@/components/identity-verification"
import { RAOperators } from "@/components/ra-operators"

export default function RegistrationAuthorityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-cyan-800 font-sans">Registration Authority</h1>
        <p className="text-slate-600 mt-2 font-sans">Manage certificate request verification and approval workflows</p>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <RAOverview />
      </Suspense>

      <Tabs defaultValue="requests" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="requests">Request Queue</TabsTrigger>
          <TabsTrigger value="verification">Identity Verification</TabsTrigger>
          <TabsTrigger value="operators">RA Operators</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-6">
          <RequestQueue />
        </TabsContent>

        <TabsContent value="verification" className="space-y-6">
          <IdentityVerification />
        </TabsContent>

        <TabsContent value="operators" className="space-y-6">
          <RAOperators />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-black text-cyan-800">RA Configuration</CardTitle>
              <CardDescription>Configure Registration Authority settings and policies</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">RA configuration settings will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
