"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"

export function CertificateIssueForm() {
  const [sanList, setSanList] = useState<string[]>([])
  const [newSan, setNewSan] = useState("")

  const addSan = () => {
    if (newSan.trim() && !sanList.includes(newSan.trim())) {
      setSanList([...sanList, newSan.trim()])
      setNewSan("")
    }
  }

  const removeSan = (san: string) => {
    setSanList(sanList.filter((s) => s !== san))
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Form */}
      <div className="lg:col-span-2 space-y-6">
        {/* Subject Information */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-slate-800">Subject Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="commonName">Common Name *</Label>
                <Input id="commonName" placeholder="example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="organization">Organization</Label>
                <Input id="organization" placeholder="Example Corp" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="organizationalUnit">Organizational Unit</Label>
                <Input id="organizationalUnit" placeholder="IT Department" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="CA">Canada</SelectItem>
                    <SelectItem value="GB">United Kingdom</SelectItem>
                    <SelectItem value="DE">Germany</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State/Province</Label>
                <Input id="state" placeholder="California" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="locality">City/Locality</Label>
                <Input id="locality" placeholder="San Francisco" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subject Alternative Names */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-slate-800">Subject Alternative Names</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Add SAN (e.g., www.example.com)"
                value={newSan}
                onChange={(e) => setNewSan(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addSan()}
              />
              <Button onClick={addSan} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {sanList.map((san) => (
                <Badge key={san} variant="secondary" className="flex items-center space-x-1">
                  <span>{san}</span>
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeSan(san)} />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Certificate Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-slate-800">Certificate Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="certificateType">Certificate Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tls">TLS Server Certificate</SelectItem>
                    <SelectItem value="client">Client Authentication</SelectItem>
                    <SelectItem value="email">Email Certificate</SelectItem>
                    <SelectItem value="code">Code Signing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="validityPeriod">Validity Period</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                    <SelectItem value="730">2 years</SelectItem>
                    <SelectItem value="1095">3 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="keyAlgorithm">Key Algorithm</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select algorithm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rsa">RSA</SelectItem>
                    <SelectItem value="ecdsa">ECDSA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="keySize">Key Size</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2048">2048 bits</SelectItem>
                    <SelectItem value="3072">3072 bits</SelectItem>
                    <SelectItem value="4096">4096 bits</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CSR Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-slate-800">Certificate Signing Request</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="csr">CSR (PEM Format)</Label>
              <Textarea
                id="csr"
                placeholder="-----BEGIN CERTIFICATE REQUEST-----
...
-----END CERTIFICATE REQUEST-----"
                rows={8}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="generateKeys" />
              <Label htmlFor="generateKeys">Generate new key pair if CSR not provided</Label>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Certificate Authority */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-slate-800">Issuing CA</CardTitle>
          </CardHeader>
          <CardContent>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select CA" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="intermediate">Intermediate CA</SelectItem>
                <SelectItem value="email">Email CA</SelectItem>
                <SelectItem value="code">Code Signing CA</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Key Usage */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-slate-800">Key Usage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="digitalSignature" defaultChecked />
              <Label htmlFor="digitalSignature">Digital Signature</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="keyEncipherment" defaultChecked />
              <Label htmlFor="keyEncipherment">Key Encipherment</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="dataEncipherment" />
              <Label htmlFor="dataEncipherment">Data Encipherment</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="keyAgreement" />
              <Label htmlFor="keyAgreement">Key Agreement</Label>
            </div>
          </CardContent>
        </Card>

        {/* Extended Key Usage */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-slate-800">Extended Key Usage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="serverAuth" defaultChecked />
              <Label htmlFor="serverAuth">Server Authentication</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="clientAuth" />
              <Label htmlFor="clientAuth">Client Authentication</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="codeSigning" />
              <Label htmlFor="codeSigning">Code Signing</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="emailProtection" />
              <Label htmlFor="emailProtection">Email Protection</Label>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button className="w-full bg-cyan-600 hover:bg-cyan-700">Issue Certificate</Button>
          <Button variant="outline" className="w-full bg-transparent">
            Save as Draft
          </Button>
        </div>
      </div>
    </div>
  )
}
