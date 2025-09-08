import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CAOverview } from "@/components/ca-overview"
import { CAList } from "@/components/ca-list"
// import { CAHierarchy } from "@/components/ca-hierarchy"
// import { CATemplates } from "@/components/ca-templates"

export default function CertificateAuthoritiesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-cyan-800 font-sans">Certificate Authorities</h1>
        <p className="text-slate-600 mt-2 font-sans">Manage your PKI Certificate Authority infrastructure</p>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <CAOverview />
      </Suspense>

      <Tabs defaultValue="authorities" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          {/* <TabsTrigger value="authorities">Certificate Authorities</TabsTrigger>
          <TabsTrigger value="hierarchy">CA Hierarchy</TabsTrigger>
          <TabsTrigger value="templates">CA Templates</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger> */}
        </TabsList>

        {/* <TabsContent value="authorities" className="space-y-6">
          <CAList />
        </TabsContent> */}

        {/* <TabsContent value="hierarchy" className="space-y-6">
          <CAHierarchy />
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <CATemplates />
        </TabsContent> */}

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-black text-cyan-800">CA Configuration</CardTitle>
              <CardDescription>Configure Certificate Authority global settings and policies</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">CA configuration settings will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
