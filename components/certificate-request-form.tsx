"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Upload, FileText } from "lucide-react"

interface CertificateRequestFormProps {
  onComplete: (data: any) => void
}

export function CertificateRequestForm({ onComplete }: CertificateRequestFormProps) {
  const [formData, setFormData] = useState({
    commonName: "",
    organization: "",
    organizationalUnit: "",
    country: "",
    state: "",
    locality: "",
    email: "",
    certificateType: "",
    validityPeriod: "",
    keyAlgorithm: "",
    keySize: "",
    csr: "",
    generateKeys: false,
    sanList: [] as string[],
    keyUsage: [] as string[],
    extendedKeyUsage: [] as string[],
    justification: "",
  })

  const [newSan, setNewSan] = useState("")
  const [csrFile, setCsrFile] = useState<File | null>(null)

  const addSan = () => {
    if (newSan.trim() && !formData.sanList.includes(newSan.trim())) {
      setFormData((prev) => ({
        ...prev,
        sanList: [...prev.sanList, newSan.trim()],
      }))
      setNewSan("")
    }
  }

  const removeSan = (san: string) => {
    setFormData((prev) => ({
      ...prev,
      sanList: prev.sanList.filter((s) => s !== san),
    }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setCsrFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setFormData((prev) => ({ ...prev, csr: content }))
      }
      reader.readAsText(file)
    }
  }

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.commonName || !formData.certificateType) {
      alert("Please fill in all required fields")
      return
    }

    if (!formData.csr && !formData.generateKeys) {
      alert("Please provide a CSR or enable key generation")
      return
    }

    onComplete(formData)
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
                <Input
                  id="commonName"
                  placeholder="example.com"
                  value={formData.commonName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, commonName: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="organization">Organization</Label>
                <Input
                  id="organization"
                  placeholder="Example Corp"
                  value={formData.organization}
                  onChange={(e) => setFormData((prev) => ({ ...prev, organization: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="organizationalUnit">Organizational Unit</Label>
                <Input
                  id="organizationalUnit"
                  placeholder="IT Department"
                  value={formData.organizationalUnit}
                  onChange={(e) => setFormData((prev) => ({ ...prev, organizationalUnit: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select
                  value={formData.country}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, country: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="CA">Canada</SelectItem>
                    <SelectItem value="GB">United Kingdom</SelectItem>
                    <SelectItem value="DE">Germany</SelectItem>
                    <SelectItem value="DE">India</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State/Province</Label>
                <Input
                  id="state"
                  placeholder="California"
                  value={formData.state}
                  onChange={(e) => setFormData((prev) => ({ ...prev, state: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="locality">City/Locality</Label>
                <Input
                  id="locality"
                  placeholder="San Francisco"
                  value={formData.locality}
                  onChange={(e) => setFormData((prev) => ({ ...prev, locality: e.target.value }))}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              />
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
              {formData.sanList.map((san) => (
                <Badge key={san} variant="secondary" className="flex items-center space-x-1">
                  <span>{san}</span>
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeSan(san)} />
                </Badge>
              ))}
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
              <Label>Upload CSR File</Label>
              <div className="flex items-center space-x-2">
                <Input
                  type="file"
                  accept=".csr,.pem,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="csr-upload"
                />
                <Label htmlFor="csr-upload" className="cursor-pointer">
                  <div className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-md hover:bg-slate-50">
                    <Upload className="h-4 w-4" />
                    <span>Choose CSR File</span>
                  </div>
                </Label>
                {csrFile && (
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <FileText className="h-4 w-4" />
                    <span>{csrFile.name}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="csr">Or Paste CSR (PEM Format)</Label>
              <Textarea
                id="csr"
                placeholder="-----BEGIN CERTIFICATE REQUEST-----
...
-----END CERTIFICATE REQUEST-----"
                rows={8}
                value={formData.csr}
                onChange={(e) => setFormData((prev) => ({ ...prev, csr: e.target.value }))}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="generateKeys"
                checked={formData.generateKeys}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, generateKeys: !!checked }))}
              />
              <Label htmlFor="generateKeys">Generate new key pair if CSR not provided</Label>
            </div>
          </CardContent>
        </Card>

        {/* Justification */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-slate-800">Request Justification</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="justification">Business Justification *</Label>
              <Textarea
                id="justification"
                placeholder="Please provide a detailed justification for this certificate request..."
                rows={4}
                value={formData.justification}
                onChange={(e) => setFormData((prev) => ({ ...prev, justification: e.target.value }))}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Certificate Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-slate-800">Certificate Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="certificateType">Certificate Type *</Label>
              <Select
                value={formData.certificateType}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, certificateType: value }))}
              >
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
              <Select
                value={formData.validityPeriod}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, validityPeriod: value }))}
              >
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
              <Select
                value={formData.keyAlgorithm}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, keyAlgorithm: value }))}
              >
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
              <Select
                value={formData.keySize}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, keySize: value }))}
              >
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
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button className="w-full bg-cyan-600 hover:bg-cyan-700" onClick={handleSubmit}>
            Submit Request
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            Save as Draft
          </Button>
        </div>
      </div>
    </div>
  )
}
