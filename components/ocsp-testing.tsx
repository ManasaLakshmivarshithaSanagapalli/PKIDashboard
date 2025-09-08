"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TestTube, CheckCircle, AlertTriangle, Clock } from "lucide-react"

export function OCSPTesting() {
  const [testResult, setTestResult] = useState<"success" | "error" | "testing" | null>(null)
  const [testProgress, setTestProgress] = useState(0)

  const handleTest = () => {
    setTestResult("testing")
    setTestProgress(0)

    // Simulate OCSP test
    const interval = setInterval(() => {
      setTestProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTestResult(Math.random() > 0.3 ? "success" : "error")
          return 100
        }
        return prev + 20
      })
    }, 300)
  }

  return (
    <div className="space-y-6">
      {/* OCSP Test Tool */}
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="font-heading text-slate-800">OCSP Test Tool</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="responderUrl">OCSP Responder URL</Label>
            <Input id="responderUrl" placeholder="http://ocsp.example.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="serialNumber">Certificate Serial Number</Label>
            <Input id="serialNumber" placeholder="1234567890123456" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="issuer">Issuer CA</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select issuer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="root">Root CA</SelectItem>
                <SelectItem value="intermediate">Intermediate CA</SelectItem>
                <SelectItem value="email">Email CA</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleTest}
            disabled={testResult === "testing"}
            className="w-full bg-cyan-600 hover:bg-cyan-700"
          >
            <TestTube className="h-4 w-4 mr-2" />
            {testResult === "testing" ? "Testing..." : "Test OCSP Response"}
          </Button>

          {testResult === "testing" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Testing OCSP responder...</span>
                <span className="text-sm text-slate-600">{testProgress}%</span>
              </div>
              <Progress value={testProgress} className="h-2" />
            </div>
          )}

          {testResult === "success" && (
            <div className="flex items-center space-x-2 p-3 bg-green-50 text-green-700 rounded-lg">
              <CheckCircle className="h-5 w-5" />
              <div className="flex-1">
                <p className="text-sm font-medium">OCSP Response: Good</p>
                <p className="text-xs">Response time: 42ms</p>
              </div>
            </div>
          )}

          {testResult === "error" && (
            <div className="flex items-center space-x-2 p-3 bg-red-50 text-red-700 rounded-lg">
              <AlertTriangle className="h-5 w-5" />
              <div className="flex-1">
                <p className="text-sm font-medium">OCSP Test Failed</p>
                <p className="text-xs">Connection timeout or invalid response</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent OCSP Requests */}
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="font-heading text-slate-800">Recent Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { serial: "1234567890123456", status: "good", time: "2 min ago", responseTime: "42ms" },
              { serial: "1234567890123457", status: "revoked", time: "5 min ago", responseTime: "38ms" },
              { serial: "1234567890123458", status: "good", time: "8 min ago", responseTime: "45ms" },
              { serial: "1234567890123459", status: "unknown", time: "12 min ago", responseTime: "52ms" },
            ].map((request, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {request.status === "good" && <CheckCircle className="h-4 w-4 text-green-600" />}
                  {request.status === "revoked" && <AlertTriangle className="h-4 w-4 text-red-600" />}
                  {request.status === "unknown" && <Clock className="h-4 w-4 text-slate-600" />}
                  <div>
                    <p className="text-sm font-mono">{request.serial}</p>
                    <p className="text-xs text-slate-500">{request.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant={
                      request.status === "good" ? "default" : request.status === "revoked" ? "destructive" : "secondary"
                    }
                  >
                    {request.status}
                  </Badge>
                  <p className="text-xs text-slate-500 mt-1">{request.responseTime}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* OCSP Configuration */}
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="font-heading text-slate-800">Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Cache Duration:</span>
            <span>1 hour</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-medium">Max Response Size:</span>
            <span>64 KB</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-medium">Signing Algorithm:</span>
            <span>SHA256withRSA</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-medium">Next Update:</span>
            <span>24 hours</span>
          </div>
          <Button variant="outline" className="w-full bg-transparent">
            Edit Configuration
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
