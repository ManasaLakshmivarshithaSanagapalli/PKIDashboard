import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Save } from "lucide-react"

export function AuditSettings() {
  return (
    <div className="space-y-6">
      {/* Logging Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-slate-800">Logging Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="logLevel">Log Level</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select log level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="debug">Debug</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="retention">Log Retention (days)</Label>
              <Input id="retention" type="number" placeholder="365" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="logCertOps" defaultChecked />
              <Label htmlFor="logCertOps">Log certificate operations</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="logUserAuth" defaultChecked />
              <Label htmlFor="logUserAuth">Log user authentication</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="logHSMOps" defaultChecked />
              <Label htmlFor="logHSMOps">Log HSM operations</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="logSystemEvents" defaultChecked />
              <Label htmlFor="logSystemEvents">Log system events</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alert Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-slate-800">Alert Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="alertFailedLogins" defaultChecked />
              <Label htmlFor="alertFailedLogins">Alert on failed login attempts</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="alertCertExpiry" defaultChecked />
              <Label htmlFor="alertCertExpiry">Alert on certificate expiry</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="alertHSMErrors" defaultChecked />
              <Label htmlFor="alertHSMErrors">Alert on HSM errors</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="alertUnusualActivity" />
              <Label htmlFor="alertUnusualActivity">Alert on unusual activity patterns</Label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="alertEmail">Alert Email</Label>
              <Input id="alertEmail" type="email" placeholder="admin@company.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="alertThreshold">Failed Login Threshold</Label>
              <Input id="alertThreshold" type="number" placeholder="5" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-slate-800">Compliance Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="enableSOX" defaultChecked />
              <Label htmlFor="enableSOX">SOX Compliance</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="enableHIPAA" />
              <Label htmlFor="enableHIPAA">HIPAA Compliance</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="enablePCI" defaultChecked />
              <Label htmlFor="enablePCI">PCI DSS Compliance</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="enableGDPR" defaultChecked />
              <Label htmlFor="enableGDPR">GDPR Compliance</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="complianceNotes">Compliance Notes</Label>
            <Textarea id="complianceNotes" placeholder="Additional compliance requirements and notes..." rows={3} />
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
