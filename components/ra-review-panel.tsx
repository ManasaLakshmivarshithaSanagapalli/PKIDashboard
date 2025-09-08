"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, XCircle, AlertTriangle, FileText, User, Globe } from "lucide-react"

interface RAReviewPanelProps {
  requestData: any
  verificationData: any
  onComplete: (data: any) => void
}

export function RAReviewPanel({ requestData, verificationData, onComplete }: RAReviewPanelProps) {
  const [reviewData, setReviewData] = useState({
    decision: "",
    reviewNotes: "",
    conditions: "",
    validityOverride: "",
    reviewer: "Alice Johnson", // Current RA operator
    reviewDate: new Date().toISOString(),
  })

  const handleApprove = () => {
    setReviewData((prev) => ({ ...prev, decision: "approved" }))
    onComplete({ ...reviewData, decision: "approved" })
  }

  const handleReject = () => {
    if (!reviewData.reviewNotes) {
      alert("Please provide rejection reason")
      return
    }
    setReviewData((prev) => ({ ...prev, decision: "rejected" }))
    onComplete({ ...reviewData, decision: "rejected" })
  }

  const handleRequestMoreInfo = () => {
    setReviewData((prev) => ({ ...prev, decision: "more_info_required" }))
    onComplete({ ...reviewData, decision: "more_info_required" })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-black text-cyan-800">RA Review & Approval</CardTitle>
          <CardDescription>Review certificate request and verification results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-slate-600" />
              <div>
                <p className="text-sm font-medium">Reviewer</p>
                <p className="text-sm text-slate-600">{reviewData.reviewer}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-slate-600" />
              <div>
                <p className="text-sm font-medium">Request ID</p>
                <p className="text-sm text-slate-600">REQ-2024-{Math.floor(Math.random() * 1000)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-slate-600" />
              <div>
                <p className="text-sm font-medium">Review Date</p>
                <p className="text-sm text-slate-600">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="request" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="request">Request Details</TabsTrigger>
          <TabsTrigger value="verification">Verification Results</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="review">Review Decision</TabsTrigger>
        </TabsList>

        <TabsContent value="request" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-slate-800">Certificate Request Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="text-sm font-medium text-slate-700">Common Name</Label>
                  <p className="text-sm text-slate-900">{requestData?.commonName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-700">Organization</Label>
                  <p className="text-sm text-slate-900">{requestData?.organization || "N/A"}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-700">Certificate Type</Label>
                  <p className="text-sm text-slate-900">{requestData?.certificateType}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-700">Validity Period</Label>
                  <p className="text-sm text-slate-900">{requestData?.validityPeriod} days</p>
                </div>
              </div>

              {requestData?.sanList?.length > 0 && (
                <div>
                  <Label className="text-sm font-medium text-slate-700">Subject Alternative Names</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {requestData.sanList.map((san: string) => (
                      <Badge key={san} variant="secondary">
                        {san}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <Label className="text-sm font-medium text-slate-700">Business Justification</Label>
                <p className="text-sm text-slate-900 mt-1">{requestData?.justification}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-slate-800">Identity Verification Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-cyan-600" />
                    <span className="font-medium">Domain Validation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <Badge className="bg-emerald-100 text-emerald-800">Verified</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-cyan-600" />
                    <span className="font-medium">Organization Validation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <Badge className="bg-emerald-100 text-emerald-800">Completed</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-cyan-600" />
                    <span className="font-medium">Document Review</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <Badge className="bg-emerald-100 text-emerald-800">Approved</Badge>
                  </div>
                </div>
              </div>

              {verificationData?.notes && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <Label className="text-sm font-medium text-blue-800">Verification Notes</Label>
                  <p className="text-sm text-blue-700 mt-1">{verificationData.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-slate-800">Uploaded Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {verificationData?.documents?.map((doc: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-slate-600" />
                      <div>
                        <p className="font-medium">{doc.file}</p>
                        <p className="text-sm text-slate-600">{doc.type.replace("_", " ")}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="review" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-slate-800">Review Decision</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reviewNotes">Review Notes *</Label>
                <Textarea
                  id="reviewNotes"
                  placeholder="Provide detailed review notes and decision rationale..."
                  rows={4}
                  value={reviewData.reviewNotes}
                  onChange={(e) => setReviewData((prev) => ({ ...prev, reviewNotes: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="conditions">Special Conditions (Optional)</Label>
                <Textarea
                  id="conditions"
                  placeholder="Any special conditions or requirements for this certificate..."
                  rows={2}
                  value={reviewData.conditions}
                  onChange={(e) => setReviewData((prev) => ({ ...prev, conditions: e.target.value }))}
                />
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700" onClick={handleApprove}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve Request
                </Button>

                <Button
                  variant="outline"
                  className="flex-1 text-amber-600 hover:text-amber-700 border-amber-300 hover:border-amber-400 bg-transparent"
                  onClick={handleRequestMoreInfo}
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Request More Info
                </Button>

                <Button
                  variant="outline"
                  className="flex-1 text-red-600 hover:text-red-700 border-red-300 hover:border-red-400 bg-transparent"
                  onClick={handleReject}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject Request
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
