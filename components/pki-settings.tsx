import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Save, Shield, Key, BadgeIcon as Certificate, Clock } from "lucide-react"

export function PKISettings() {
  return (
    <div className="space-y-6">
      {/* Certificate Authority Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-slate-800 flex items-center gap-2">
            <Shield className="h-5 w-5 text-cyan-600" />
            Certificate Authority Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="defaultKeySize">Default Key Size</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select key size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2048">2048 bits</SelectItem>
                  <SelectItem value="3072">3072 bits</SelectItem>
                  <SelectItem value="4096">4096 bits</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="defaultAlgorithm">Default Algorithm</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select algorithm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rsa">RSA</SelectItem>
                  <SelectItem value="ecdsa">ECDSA</SelectItem>
                  <SelectItem value="ed25519">Ed25519</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="defaultValidity">Default Validity Period (days)</Label>
              <Input id="defaultValidity" type="number" defaultValue="365" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxValidity">Maximum Validity Period (days)</Label>
              <Input id="maxValidity" type="number" defaultValue="3650" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="requireApproval" defaultChecked />
              <Label htmlFor="requireApproval">Require approval for certificate issuance</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="enableAutoRenewal" />
              <Label htmlFor="enableAutoRenewal">Enable automatic certificate renewal</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="enforceKeyUsage" defaultChecked />
              <Label htmlFor="enforceKeyUsage">Enforce key usage restrictions</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Certificate Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-slate-800 flex items-center gap-2">
            <Certificate className="h-5 w-5 text-cyan-600" />
            Certificate Template Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sslTemplate">SSL Certificate Template</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select SSL template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard-ssl">Standard SSL</SelectItem>
                  <SelectItem value="wildcard-ssl">Wildcard SSL</SelectItem>
                  <SelectItem value="ev-ssl">Extended Validation SSL</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="codeSigningTemplate">Code Signing Template</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select code signing template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard-cs">Standard Code Signing</SelectItem>
                  <SelectItem value="ev-cs">EV Code Signing</SelectItem>
                  <SelectItem value="timestamp-cs">Timestamping</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="emailTemplate">Email Certificate Template</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select email template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="smime">S/MIME</SelectItem>
                  <SelectItem value="secure-email">Secure Email</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientTemplate">Client Authentication Template</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select client template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="client-auth">Client Authentication</SelectItem>
                  <SelectItem value="smart-card">Smart Card</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="templateNotes">Template Configuration Notes</Label>
            <Textarea id="templateNotes" placeholder="Additional template configuration notes..." rows={3} />
          </div>
        </CardContent>
      </Card>

      {/* CRL Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-slate-800 flex items-center gap-2">
            <Clock className="h-5 w-5 text-cyan-600" />
            CRL & OCSP Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="crlUpdateInterval">CRL Update Interval (hours)</Label>
              <Input id="crlUpdateInterval" type="number" defaultValue="24" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="crlValidityPeriod">CRL Validity Period (hours)</Label>
              <Input id="crlValidityPeriod" type="number" defaultValue="168" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ocspResponseValidity">OCSP Response Validity (hours)</Label>
              <Input id="ocspResponseValidity" type="number" defaultValue="24" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ocspCacheTimeout">OCSP Cache Timeout (minutes)</Label>
              <Input id="ocspCacheTimeout" type="number" defaultValue="60" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="enableCRL" defaultChecked />
              <Label htmlFor="enableCRL">Enable CRL generation</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="enableOCSP" defaultChecked />
              <Label htmlFor="enableOCSP">Enable OCSP responder</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="enableDeltaCRL" />
              <Label htmlFor="enableDeltaCRL">Enable Delta CRL</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Management */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-slate-800 flex items-center gap-2">
            <Key className="h-5 w-5 text-cyan-600" />
            Key Management Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="keyRotationInterval">Key Rotation Interval (days)</Label>
              <Input id="keyRotationInterval" type="number" defaultValue="365" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="keyBackupRetention">Key Backup Retention (days)</Label>
              <Input id="keyBackupRetention" type="number" defaultValue="2555" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minKeySize">Minimum Key Size (bits)</Label>
              <Input id="minKeySize" type="number" defaultValue="2048" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="keyEscrowThreshold">Key Escrow Threshold</Label>
              <Input id="keyEscrowThreshold" type="number" defaultValue="3" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="enableKeyEscrow" defaultChecked />
              <Label htmlFor="enableKeyEscrow">Enable key escrow</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="requireKeyBackup" defaultChecked />
              <Label htmlFor="requireKeyBackup">Require key backup</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="enableKeyRecovery" />
              <Label htmlFor="enableKeyRecovery">Enable key recovery</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end space-x-3">
        <Button variant="outline">Reset to Defaults</Button>
        <Button className="bg-cyan-600 hover:bg-cyan-700">
          <Save className="h-4 w-4 mr-2" />
          Save PKI Settings
        </Button>
      </div>
    </div>
  )
}
