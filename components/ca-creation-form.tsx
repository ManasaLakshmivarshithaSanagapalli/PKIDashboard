"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Shield, Save, TestTube } from "lucide-react"

export function CACreationForm() {
  const [caType, setCAType] = useState("")
  const [parentCA, setParentCA] = useState("")

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Form */}
      <div className="lg:col-span-2 space-y-6">
        <Tabs defaultValue="basic" className="space-y-4">
          <TabsList>
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="subject">Subject Details</TabsTrigger>
            <TabsTrigger value="crypto">Cryptographic Settings</TabsTrigger>
            <TabsTrigger value="policies">Policies & Extensions</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            {/* CA Type and Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-slate-800">CA Type & Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="caName">CA Name *</Label>
                    <Input id="caName" placeholder="Production Root CA" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="caType">CA Type *</Label>
                    <Select value={caType} onValueChange={setCAType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select CA type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="root_ca">Root CA</SelectItem>
                        <SelectItem value="intermediate_ca">Intermediate CA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {caType === "intermediate_ca" && (
                  <div className="space-y-2">
                    <Label htmlFor="parentCA">Parent CA *</Label>
                    <Select value={parentCA} onValueChange={setParentCA}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select parent CA" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="root-001">Production Root CA</SelectItem>
                        <SelectItem value="root-002">Development Root CA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="CA description and purpose" rows={3} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subject" className="space-y-6">
            {/* Subject Information */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-slate-800">Subject Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="commonName">Common Name *</Label>
                    <Input id="commonName" placeholder="Production Root CA" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization *</Label>
                    <Input id="organization" placeholder="Company Inc" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organizationalUnit">Organizational Unit</Label>
                    <Input id="organizationalUnit" placeholder="IT Security" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
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
          </TabsContent>

          <TabsContent value="crypto" className="space-y-6">
            {/* Cryptographic Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-slate-800">Cryptographic Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="keyAlgorithm">Key Algorithm *</Label>
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
                    <Label htmlFor="keySize">Key Size *</Label>
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
                    <Label htmlFor="signatureAlgorithm">Signature Algorithm *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select signature algorithm" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sha256">SHA-256</SelectItem>
                        <SelectItem value="sha384">SHA-384</SelectItem>
                        <SelectItem value="sha512">SHA-512</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="validityPeriod">Validity Period (years) *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select validity period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 years</SelectItem>
                        <SelectItem value="10">10 years</SelectItem>
                        <SelectItem value="20">20 years</SelectItem>
                        <SelectItem value="30">30 years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="useHSM" />
                    <Label htmlFor="useHSM">Store private key in HSM</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="selfSigned" defaultChecked={caType === "root_ca"} disabled={caType === "root_ca"} />
                    <Label htmlFor="selfSigned">Self-signed certificate</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="policies" className="space-y-6">
            {/* Policies and Extensions */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-slate-800">Key Usage & Extensions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label>Key Usage</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="certSign" defaultChecked />
                      <Label htmlFor="certSign">Certificate Sign</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="crlSign" defaultChecked />
                      <Label htmlFor="crlSign">CRL Sign</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="digitalSignature" />
                      <Label htmlFor="digitalSignature">Digital Signature</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="keyEncipherment" />
                      <Label htmlFor="keyEncipherment">Key Encipherment</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Basic Constraints</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="isCA" defaultChecked />
                    <Label htmlFor="isCA">Certificate Authority</Label>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pathLength">Path Length Constraint</Label>
                    <Input id="pathLength" type="number" placeholder="Leave empty for unlimited" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* CA Type Info */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-slate-800">CA Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {caType && (
              <div className="flex items-center space-x-2">
                <Shield className={`h-5 w-5 ${caType === "root_ca" ? "text-emerald-600" : "text-blue-600"}`} />
                <Badge variant="outline">{caType === "root_ca" ? "Root CA" : "Intermediate CA"}</Badge>
              </div>
            )}

            <div className="text-sm text-slate-600">
              {caType === "root_ca" ? (
                <p>
                  Root CAs are self-signed and form the trust anchor of your PKI. They should be kept offline and used
                  only to sign intermediate CAs.
                </p>
              ) : caType === "intermediate_ca" ? (
                <p>
                  Intermediate CAs are signed by a parent CA and are used to issue end-entity certificates. They provide
                  operational flexibility.
                </p>
              ) : (
                <p>Select a CA type to see more information.</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* HSM Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-slate-800">HSM Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select HSM" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="software">Software HSM (Development)</SelectItem>
                <SelectItem value="pkcs11">PKCS#11 HSM</SelectItem>
                <SelectItem value="azure">Azure Key Vault</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
            <Save className="h-4 w-4 mr-2" />
            Create CA
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            <TestTube className="h-4 w-4 mr-2" />
            Test Configuration
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            Save as Draft
          </Button>
        </div>
      </div>
    </div>
  )
}
