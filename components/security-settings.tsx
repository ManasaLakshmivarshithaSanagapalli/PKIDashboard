import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Save, Shield, Lock, AlertTriangle, Eye } from "lucide-react"

export function SecuritySettings() {
  return (
    <div className="space-y-6">
      {/* Authentication Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-slate-800 flex items-center gap-2">
            <Lock className="h-5 w-5 text-cyan-600" />
            Authentication Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input id="sessionTimeout" type="number" defaultValue="30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
              <Input id="maxLoginAttempts" type="number" defaultValue="5" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lockoutDuration">Account Lockout Duration (minutes)</Label>
              <Input id="lockoutDuration" type="number" defaultValue="15" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
              <Input id="passwordExpiry" type="number" defaultValue="90" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="requireMFA" defaultChecked />
              <Label htmlFor="requireMFA">Require multi-factor authentication</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="enforcePasswordPolicy" defaultChecked />
              <Label htmlFor="enforcePasswordPolicy">Enforce strong password policy</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="enableSSO" />
              <Label htmlFor="enableSSO">Enable Single Sign-On (SSO)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="logFailedAttempts" defaultChecked />
              <Label htmlFor="logFailedAttempts">Log failed authentication attempts</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Access Control */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-slate-800 flex items-center gap-2">
            <Shield className="h-5 w-5 text-cyan-600" />
            Access Control Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="defaultRole">Default User Role</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select default role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="viewer">Viewer</SelectItem>
                  <SelectItem value="operator">Operator</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminApproval">Admin Approval Required For</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select approval level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Operations</SelectItem>
                  <SelectItem value="critical">Critical Operations Only</SelectItem>
                  <SelectItem value="none">No Approval Required</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="enableRBAC" defaultChecked />
              <Label htmlFor="enableRBAC">Enable Role-Based Access Control (RBAC)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="enableIPWhitelist" />
              <Label htmlFor="enableIPWhitelist">Enable IP address whitelist</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="requireApprovalForPrivileged" defaultChecked />
              <Label htmlFor="requireApprovalForPrivileged">Require approval for privileged operations</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="allowedIPs">Allowed IP Addresses (one per line)</Label>
            <Textarea id="allowedIPs" placeholder="192.168.1.0/24&#10;10.0.0.0/8" rows={4} />
          </div>
        </CardContent>
      </Card>

      {/* Security Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-slate-800 flex items-center gap-2">
            <Eye className="h-5 w-5 text-cyan-600" />
            Security Monitoring
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="alertThreshold">Security Alert Threshold</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select threshold" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="monitoringInterval">Monitoring Interval (minutes)</Label>
              <Input id="monitoringInterval" type="number" defaultValue="5" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="enableRealTimeMonitoring" defaultChecked />
              <Label htmlFor="enableRealTimeMonitoring">Enable real-time security monitoring</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="enableAnomalyDetection" />
              <Label htmlFor="enableAnomalyDetection">Enable anomaly detection</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="enableThreatIntelligence" />
              <Label htmlFor="enableThreatIntelligence">Enable threat intelligence feeds</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="enableSecurityAlerts" defaultChecked />
              <Label htmlFor="enableSecurityAlerts">Enable security alert notifications</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Encryption Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-slate-800 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-cyan-600" />
            Encryption & Compliance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="encryptionStandard">Encryption Standard</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select encryption standard" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aes256">AES-256</SelectItem>
                  <SelectItem value="aes128">AES-128</SelectItem>
                  <SelectItem value="3des">3DES</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hashAlgorithm">Hash Algorithm</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select hash algorithm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sha256">SHA-256</SelectItem>
                  <SelectItem value="sha384">SHA-384</SelectItem>
                  <SelectItem value="sha512">SHA-512</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="enableFIPS" />
              <Label htmlFor="enableFIPS">Enable FIPS 140-2 compliance</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="enableCommonCriteria" />
              <Label htmlFor="enableCommonCriteria">Enable Common Criteria compliance</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="enableDataEncryption" defaultChecked />
              <Label htmlFor="enableDataEncryption">Enable data encryption at rest</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="enableTransitEncryption" defaultChecked />
              <Label htmlFor="enableTransitEncryption">Enable data encryption in transit</Label>
            </div>
          </div>

          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-800">Compliance Status</h4>
                <p className="text-sm text-amber-700 mt-1">
                  Current configuration meets SOX and PCI DSS requirements. FIPS 140-2 compliance requires additional
                  HSM configuration.
                </p>
                <div className="flex gap-2 mt-2">
                  <Badge className="bg-emerald-100 text-emerald-700">SOX Compliant</Badge>
                  <Badge className="bg-emerald-100 text-emerald-700">PCI DSS</Badge>
                  <Badge className="bg-amber-100 text-amber-700">FIPS Pending</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end space-x-3">
        <Button variant="outline">Reset to Defaults</Button>
        <Button className="bg-cyan-600 hover:bg-cyan-700">
          <Save className="h-4 w-4 mr-2" />
          Save Security Settings
        </Button>
      </div>
    </div>
  )
}
