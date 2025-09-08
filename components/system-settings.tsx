import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Save, Server, Database, Globe, Clock } from "lucide-react"

export function SystemSettings() {
  return (
    <div className="space-y-6">
      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-slate-800 flex items-center gap-2">
            <Server className="h-5 w-5 text-cyan-600" />
            General Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="systemName">System Name</Label>
              <Input id="systemName" defaultValue="PKI Management System" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="systemVersion">System Version</Label>
              <Input id="systemVersion" defaultValue="1.0.0" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="est">Eastern Time</SelectItem>
                  <SelectItem value="pst">Pacific Time</SelectItem>
                  <SelectItem value="cet">Central European Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Default Language</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="systemDescription">System Description</Label>
            <Textarea
              id="systemDescription"
              placeholder="Description of this PKI system instance..."
              rows={3}
              defaultValue="Production PKI system for certificate management and digital identity services."
            />
          </div>
        </CardContent>
      </Card>

      {/* Database Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-slate-800 flex items-center gap-2">
            <Database className="h-5 w-5 text-cyan-600" />
            Database Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dbHost">Database Host</Label>
              <Input id="dbHost" defaultValue="localhost" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dbPort">Database Port</Label>
              <Input id="dbPort" type="number" defaultValue="5432" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dbName">Database Name</Label>
              <Input id="dbName" defaultValue="pki_system" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dbMaxConnections">Max Connections</Label>
              <Input id="dbMaxConnections" type="number" defaultValue="100" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="dbSSL" defaultChecked />
              <Label htmlFor="dbSSL">Enable SSL connection</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="dbBackup" defaultChecked />
              <Label htmlFor="dbBackup">Enable automatic backups</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="dbLogging" />
              <Label htmlFor="dbLogging">Enable query logging</Label>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="text-sm font-medium text-emerald-700">Database Status</span>
            </div>
            <Badge variant="default" className="bg-emerald-600">
              Connected
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Network Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-slate-800 flex items-center gap-2">
            <Globe className="h-5 w-5 text-cyan-600" />
            Network Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="serverPort">Server Port</Label>
              <Input id="serverPort" type="number" defaultValue="443" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxRequestSize">Max Request Size (MB)</Label>
              <Input id="maxRequestSize" type="number" defaultValue="10" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input id="sessionTimeout" type="number" defaultValue="30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rateLimitRequests">Rate Limit (requests/minute)</Label>
              <Input id="rateLimitRequests" type="number" defaultValue="1000" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="enableHTTPS" defaultChecked />
              <Label htmlFor="enableHTTPS">Force HTTPS</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="enableCORS" />
              <Label htmlFor="enableCORS">Enable CORS</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="enableRateLimit" defaultChecked />
              <Label htmlFor="enableRateLimit">Enable rate limiting</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Maintenance Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-slate-800 flex items-center gap-2">
            <Clock className="h-5 w-5 text-cyan-600" />
            Maintenance & Cleanup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cleanupInterval">Cleanup Interval (hours)</Label>
              <Input id="cleanupInterval" type="number" defaultValue="24" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="logRetention">Log Retention (days)</Label>
              <Input id="logRetention" type="number" defaultValue="90" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="backupRetention">Backup Retention (days)</Label>
              <Input id="backupRetention" type="number" defaultValue="30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maintenanceWindow">Maintenance Window</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select maintenance window" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="02:00-04:00">02:00 - 04:00</SelectItem>
                  <SelectItem value="03:00-05:00">03:00 - 05:00</SelectItem>
                  <SelectItem value="01:00-03:00">01:00 - 03:00</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="autoCleanup" defaultChecked />
              <Label htmlFor="autoCleanup">Enable automatic cleanup</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="autoBackup" defaultChecked />
              <Label htmlFor="autoBackup">Enable automatic backups</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="maintenanceMode" />
              <Label htmlFor="maintenanceMode">Enable maintenance mode</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end space-x-3">
        <Button variant="outline">Reset to Defaults</Button>
        <Button className="bg-cyan-600 hover:bg-cyan-700">
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}
