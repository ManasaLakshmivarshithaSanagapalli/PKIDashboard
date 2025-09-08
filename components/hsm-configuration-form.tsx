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
import { TestTube, Save, CheckCircle, AlertCircle } from "lucide-react"

export function HSMConfigurationForm() {
  const [hsmType, setHsmType] = useState("")
  const [testResult, setTestResult] = useState<"success" | "error" | null>(null)

  const handleTestConnection = () => {
    // Simulate connection test
    setTimeout(() => {
      setTestResult(Math.random() > 0.3 ? "success" : "error")
    }, 2000)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Configuration */}
      <div className="lg:col-span-2 space-y-6">
        <Tabs defaultValue="basic" className="space-y-4">
          <TabsList>
            <TabsTrigger value="basic">Basic Configuration</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
            <TabsTrigger value="security">Security Options</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-slate-800">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hsmName">HSM Name *</Label>
                    <Input id="hsmName" placeholder="Production HSM" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hsmType">HSM Type *</Label>
                    <Select value={hsmType} onValueChange={setHsmType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select HSM type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pkcs11">PKCS#11</SelectItem>
                        <SelectItem value="azure">Azure Key Vault</SelectItem>
                        <SelectItem value="aws">AWS CloudHSM</SelectItem>
                        <SelectItem value="software">Software HSM</SelectItem>
                        <SelectItem value="thales">Thales Luna</SelectItem>
                        <SelectItem value="safenet">SafeNet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="HSM description and purpose" rows={3} />
                </div>
              </CardContent>
            </Card>

            {/* Connection Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-slate-800">Connection Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {hsmType === "pkcs11" && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="libraryPath">PKCS#11 Library Path *</Label>
                        <Input id="libraryPath" placeholder="/usr/lib/pkcs11/libpkcs11.so" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="slotId">Slot ID</Label>
                        <Input id="slotId" type="number" placeholder="0" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tokenLabel">Token Label</Label>
                        <Input id="tokenLabel" placeholder="PROD-TOKEN-01" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pin">PIN/Password</Label>
                        <Input id="pin" type="password" placeholder="Enter PIN" />
                      </div>
                    </div>
                  </>
                )}

                {hsmType === "azure" && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="vaultUrl">Key Vault URL *</Label>
                        <Input id="vaultUrl" placeholder="https://myvault.vault.azure.net/" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tenantId">Tenant ID *</Label>
                        <Input id="tenantId" placeholder="tenant-id-here" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="clientId">Client ID *</Label>
                        <Input id="clientId" placeholder="client-id-here" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="clientSecret">Client Secret *</Label>
                        <Input id="clientSecret" type="password" placeholder="Enter client secret" />
                      </div>
                    </div>
                  </>
                )}

                {hsmType === "aws" && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="clusterId">Cluster ID *</Label>
                        <Input id="clusterId" placeholder="cluster-id-here" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="region">AWS Region *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select region" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                            <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
                            <SelectItem value="eu-west-1">Europe (Ireland)</SelectItem>
                            <SelectItem value="ap-southeast-1">Asia Pacific (Singapore)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="accessKey">Access Key ID *</Label>
                        <Input id="accessKey" placeholder="Enter access key" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="secretKey">Secret Access Key *</Label>
                        <Input id="secretKey" type="password" placeholder="Enter secret key" />
                      </div>
                    </div>
                  </>
                )}

                {hsmType === "software" && (
                  <div className="space-y-2">
                    <Label htmlFor="keyStorePath">Key Store Path *</Label>
                    <Input id="keyStorePath" placeholder="/var/lib/pki/keys" />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            {/* Advanced Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-slate-800">Advanced Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="connectionTimeout">Connection Timeout (seconds)</Label>
                    <Input id="connectionTimeout" type="number" placeholder="30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="operationTimeout">Operation Timeout (seconds)</Label>
                    <Input id="operationTimeout" type="number" placeholder="60" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxConnections">Max Connections</Label>
                    <Input id="maxConnections" type="number" placeholder="10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="healthCheckInterval">Health Check Interval (minutes)</Label>
                    <Input id="healthCheckInterval" type="number" placeholder="5" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="enableLogging" />
                    <Label htmlFor="enableLogging">Enable detailed logging</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="enableRetry" defaultChecked />
                    <Label htmlFor="enableRetry">Enable automatic retry on failure</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="enableLoadBalancing" />
                    <Label htmlFor="enableLoadBalancing">Enable load balancing (multiple HSMs)</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            {/* Security Options */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-slate-800">Security Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="requireAuth" defaultChecked />
                    <Label htmlFor="requireAuth">Require authentication for all operations</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="enableAudit" defaultChecked />
                    <Label htmlFor="enableAudit">Enable audit logging</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="validateCerts" defaultChecked />
                    <Label htmlFor="validateCerts">Validate HSM certificates</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="encryptComms" defaultChecked />
                    <Label htmlFor="encryptComms">Encrypt communications</Label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minKeySize">Minimum Key Size (bits)</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select minimum key size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2048">2048</SelectItem>
                        <SelectItem value="3072">3072</SelectItem>
                        <SelectItem value="4096">4096</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="allowedAlgorithms">Allowed Algorithms</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select algorithms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rsa">RSA Only</SelectItem>
                        <SelectItem value="ecdsa">ECDSA Only</SelectItem>
                        <SelectItem value="both">RSA and ECDSA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Connection Test */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-slate-800">Connection Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleTestConnection} className="w-full bg-transparent" variant="outline">
              <TestTube className="h-4 w-4 mr-2" />
              Test Connection
            </Button>

            {testResult && (
              <div
                className={`flex items-center space-x-2 p-3 rounded-lg ${
                  testResult === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                }`}
              >
                {testResult === "success" ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                <span className="text-sm font-medium">
                  {testResult === "success" ? "Connection successful!" : "Connection failed. Check configuration."}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Supported Features */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-slate-800">Supported Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Badge variant="secondary">Key Generation</Badge>
              <Badge variant="secondary">Digital Signing</Badge>
              <Badge variant="secondary">Key Storage</Badge>
              <Badge variant="secondary">Certificate Storage</Badge>
              <Badge variant="secondary">Hardware Encryption</Badge>
              <Badge variant="secondary">Audit Logging</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
            <Save className="h-4 w-4 mr-2" />
            Save Configuration
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            Save as Draft
          </Button>
        </div>
      </div>
    </div>
  )
}
