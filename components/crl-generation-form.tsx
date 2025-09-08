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
import { Progress } from "@/components/ui/progress"
import { CalendarIcon, FileX, RefreshCw, CheckCircle } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"

export function CRLGenerationForm() {
  const [selectedCA, setSelectedCA] = useState("")
  const [nextUpdate, setNextUpdate] = useState<Date>()
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generationComplete, setGenerationComplete] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    setGenerationProgress(0)

    // Simulate CRL generation process
    const interval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsGenerating(false)
          setGenerationComplete(true)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Form */}
      <div className="lg:col-span-2 space-y-6">
        {/* CA Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-slate-800">Certificate Authority</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ca">Select Certificate Authority *</Label>
              <Select value={selectedCA} onValueChange={setSelectedCA}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose CA to generate CRL for" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="root">Root CA</SelectItem>
                  <SelectItem value="intermediate">Intermediate CA</SelectItem>
                  <SelectItem value="email">Email CA</SelectItem>
                  <SelectItem value="codesign">Code Signing CA</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedCA && (
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="font-medium text-slate-600">CA Name:</span>
                  <span className="font-body">{selectedCA === "root" ? "Root CA" : "Intermediate CA"}</span>
                  <span className="font-medium text-slate-600">Active Certificates:</span>
                  <span className="font-body">1,247</span>
                  <span className="font-medium text-slate-600">Revoked Certificates:</span>
                  <span className="font-body text-red-600">23</span>
                  <span className="font-medium text-slate-600">Last CRL:</span>
                  <span className="font-body">2024-01-15</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* CRL Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-slate-800">CRL Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="crlNumber">CRL Number</Label>
                <Input id="crlNumber" placeholder="Auto-generated" disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signatureAlgorithm">Signature Algorithm</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="SHA256withRSA" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sha256rsa">SHA256withRSA</SelectItem>
                    <SelectItem value="sha384rsa">SHA384withRSA</SelectItem>
                    <SelectItem value="sha512rsa">SHA512withRSA</SelectItem>
                    <SelectItem value="sha256ecdsa">SHA256withECDSA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>This Update</Label>
                <Input value={new Date().toISOString().split("T")[0]} disabled />
              </div>
              <div className="space-y-2">
                <Label>Next Update *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {nextUpdate ? format(nextUpdate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent mode="single" selected={nextUpdate} onSelect={setNextUpdate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="includeExpired" />
                <Label htmlFor="includeExpired">Include expired certificates</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="includeReasons" defaultChecked />
                <Label htmlFor="includeReasons">Include revocation reasons</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="includeExtensions" defaultChecked />
                <Label htmlFor="includeExtensions">Include CRL extensions</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Distribution Points */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-slate-800">Distribution Points</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="distributionPoints">CRL Distribution Points</Label>
              <Textarea
                id="distributionPoints"
                placeholder="http://crl.example.com/ca.crl&#10;ldap://ldap.example.com/cn=crl"
                rows={4}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">http://crl.example.com/root.crl</Badge>
              <Badge variant="secondary">ldap://ldap.example.com/cn=crl</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Generation Progress */}
        {(isGenerating || generationComplete) && (
          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-slate-800">Generation Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {generationComplete ? "CRL Generated Successfully" : "Generating CRL..."}
                  </span>
                  <span className="text-sm text-slate-600">{generationProgress}%</span>
                </div>
                <Progress value={generationProgress} className="h-2" />
              </div>

              {generationComplete && (
                <div className="flex items-center space-x-2 p-3 bg-green-50 text-green-700 rounded-lg">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">CRL generated successfully with 23 revoked certificates</span>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Revoked Certificates Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-slate-800">Revoked Certificates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Total Revoked:</span>
                <Badge variant="destructive">23</Badge>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>Key Compromise:</span>
                  <span>8</span>
                </div>
                <div className="flex justify-between">
                  <span>Superseded:</span>
                  <span>12</span>
                </div>
                <div className="flex justify-between">
                  <span>Cessation of Operation:</span>
                  <span>3</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CRL Information */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-slate-800">CRL Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Format:</span>
                <span>DER/PEM</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Version:</span>
                <span>v2</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Estimated Size:</span>
                <span>3.2 KB</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Validity:</span>
                <span>7 days</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            onClick={handleGenerate}
            disabled={!selectedCA || !nextUpdate || isGenerating}
            className="w-full bg-cyan-600 hover:bg-cyan-700"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <FileX className="h-4 w-4 mr-2" />
                Generate CRL
              </>
            )}
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            Schedule Generation
          </Button>
        </div>
      </div>
    </div>
  )
}
