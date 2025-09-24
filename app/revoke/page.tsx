"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type RevocationReason =
  | "unspecified"
  | "keycompromise"
  | "cacompromise"
  | "affiliationchanged"
  | "superseded"
  | "cessationofoperation"
  | "certificatehold"
  | "removefromcrl"
  | "privilegewithdrawn"
  | "aacompromise"

const REASONS: { label: string; value: RevocationReason; code: number }[] = [
  { label: "Unspecified", value: "unspecified", code: 0 },
  { label: "Key Compromise", value: "keycompromise", code: 1 },
  { label: "CA Compromise", value: "cacompromise", code: 2 },
  { label: "Affiliation Changed", value: "affiliationchanged", code: 3 },
  { label: "Superseded", value: "superseded", code: 4 },
  { label: "Cessation of Operation", value: "cessationofoperation", code: 5 },
  { label: "Certificate Hold", value: "certificatehold", code: 6 },
  { label: "Remove from CRL", value: "removefromcrl", code: 8 },
  { label: "Privilege Withdrawn", value: "privilegewithdrawn", code: 9 },
  { label: "AA Compromise", value: "aacompromise", code: 10 },
]

export default function RevokePage() {
  const [serialNumber, setSerialNumber] = useState("")
  const [reason, setReason] = useState<RevocationReason | "">("")
  const [errors, setErrors] = useState<{ serial?: string; reason?: string }>({})
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const validate = () => {
    const newErrors: { serial?: string; reason?: string } = {}
    if (!serialNumber.trim()) newErrors.serial = "Serial number is required"
    if (!reason) newErrors.reason = "Revocation reason is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleClickRevoke = () => {
    setSubmitMessage(null)
    if (!validate()) return
    setConfirmOpen(true)
  }

  const handleConfirmRevoke = async () => {
    setIsSubmitting(true)
    setSubmitMessage(null)
    try {
      const response = await fetch("https://localhost:7224/api/CA_Services/RevokeCertificate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          certificateSerialNumber: serialNumber.trim(),
          reason: reason,
        }),
      })

      if (!response.ok) {
        const text = await response.text().catch(() => "")
        throw new Error(text || `Request failed (${response.status})`)
      }

      setSubmitMessage({ type: "success", text: "Certificate revoked successfully." })
      setSerialNumber("")
      setReason("")
      setConfirmOpen(false)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error"
      setSubmitMessage({ type: "error", text: msg })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <main className="flex-1 p-6 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-cyan-800 font-sans">Revoke Certificate</h1>
            <p className="text-slate-600 font-sans">Permanently invalidate an issued certificate</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-slate-800">Revocation Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="serial">Serial Number *</Label>
                    <Input
                      id="serial"
                      placeholder="Enter certificate serial number"
                      value={serialNumber}
                      onChange={(e) => setSerialNumber(e.target.value)}
                      aria-invalid={!!errors.serial}
                    />
                    {errors.serial ? (
                      <p className="text-sm text-destructive">{errors.serial}</p>
                    ) : null}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">Revocation Reason *</Label>
                    <Select value={reason} onValueChange={(v) => setReason(v as RevocationReason)}>
                      <SelectTrigger id="reason" className="w-full">
                        <SelectValue placeholder="Select reason" />
                      </SelectTrigger>
                      <SelectContent>
                        {REASONS.map((r) => (
                          <SelectItem key={r.value} value={r.value}>
                            {r.label} ({r.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.reason ? (
                      <p className="text-sm text-destructive">{errors.reason}</p>
                    ) : null}
                  </div>

                  {submitMessage ? (
                    <div
                      className={
                        submitMessage.type === "success"
                          ? "text-sm text-emerald-600"
                          : "text-sm text-destructive"
                      }
                    >
                      {submitMessage.text}
                    </div>
                  ) : null}

                  <div className="pt-2">
                    <Button
                      variant="destructive"
                      className="bg-red-600 hover:bg-red-700"
                      onClick={handleClickRevoke}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Revoking..." : "Revoke"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-slate-800">Guidance</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-slate-600 space-y-2">
                  <p>Revocation is irreversible for most reasons. Ensure the serial number is correct.</p>
                  <p>
                    Selecting <span className="font-medium">Remove from CRL (8)</span> is typically used to
                    indicate reinstatement after a hold.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Revocation</DialogTitle>
            <DialogDescription>
              Once revoked, the certificate will be unusable. This action is typically permanent. Please confirm.
            </DialogDescription>
          </DialogHeader>
          <div className="text-sm text-slate-700 space-y-1">
            <p>
              <span className="text-slate-500">Serial:</span> {serialNumber || "-"}
            </p>
            <p>
              <span className="text-slate-500">Reason:</span> {REASONS.find((r) => r.value === reason)?.label || "-"}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmRevoke} disabled={isSubmitting}>
              {isSubmitting ? "Revoking..." : "Confirm Revoke"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}


