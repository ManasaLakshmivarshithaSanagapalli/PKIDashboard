import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SystemSettings } from "@/components/system-settings"
import { UserManagement } from "@/components/user-management"
import { PKISettings } from "@/components/pki-settings"
import { SecuritySettings } from "@/components/security-settings"

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <main className="flex-1 p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-black text-cyan-800 font-sans">System Settings</h1>
            <p className="text-slate-600 mt-2 font-sans">
              Configure PKI system parameters, users, and security policies
            </p>
          </div>

          <Tabs defaultValue="system" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="system">System</TabsTrigger>
              <TabsTrigger value="users">User Management</TabsTrigger>
              <TabsTrigger value="pki">PKI Configuration</TabsTrigger>
              <TabsTrigger value="security">Security Policies</TabsTrigger>
            </TabsList>

            <TabsContent value="system" className="space-y-6">
              <SystemSettings />
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <UserManagement />
            </TabsContent>

            <TabsContent value="pki" className="space-y-6">
              <PKISettings />
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <SecuritySettings />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
