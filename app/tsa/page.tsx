"use client"

import { useState } from "react"
import axios from "axios"
import { Suspense } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { RefreshCw, Trash2 } from "lucide-react"

interface TsaResult {
  timestamp?: string
  message?: string
  error?: string
}

export default function TSAPage() {
  const [tsaHash, setTsaHash] = useState<string>("")
  const [tsaResult, setTsaResult] = useState<TsaResult | null>(null)

  const generateTimestamp = async (): Promise<void> => {
    try {
      const formData = new FormData()
      formData.append("algo", "SHA256")
      formData.append("data_hash", tsaHash.trim())

      const res = await axios.post<TsaResult>(
        "http://localhost:5298/api/TSA/pkcs7timestamp",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      )

      setTsaResult(res.data)
    } catch (err: any) {
      setTsaResult({ error: err.response?.data?.message || err.message })
    }
  }

  const downloadFile = (
    content: string,
    filename: string,
    type: string = "application/octet-stream"
  ): void => {
    const element = document.createElement("a")
    const file = new Blob([content], { type })
    element.href = URL.createObjectURL(file)
    element.download = filename
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <main className="flex-1 p-6 space-y-6">
          {/* Page Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-black font-heading text-cyan-800">
              Time Stamping Authority (TSA)
            </h1>
            <p className="text-slate-600 font-body">
              Generate PKCS7 timestamps and manage timestamping requests
            </p>
          </div>

          {/* TSA Form */}
          <Suspense fallback={<div className="animate-pulse bg-white rounded-lg h-64" />}>
            <div className="rounded-lg border bg-white shadow-sm p-6 space-y-6">
              {/* Algorithm */}
              <div>
                <label className="block mb-2 font-medium text-slate-700">Algorithm</label>
                <input
                  type="text"
                  value="SHA256"
                  readOnly
                  className="border border-slate-300 bg-slate-100 text-slate-700 px-3 py-2 rounded w-64"
                />
              </div>

              {/* Data Hash */}
              <div>
                <label className="block mb-2 font-medium text-slate-700">
                  Data Hash (Base64)
                </label>
                <textarea
                  value={tsaHash}
                  onChange={(e) => setTsaHash(e.target.value)}
                  placeholder="Paste Base64-encoded SHA256 hash…"
                  rows={4}
                  className="border border-slate-300 px-3 py-2 rounded w-full"
                />
              </div>

              {/* Action buttons */}
              <div className="flex space-x-3">
                <Button
                  onClick={generateTimestamp}
                  disabled={!tsaHash.trim()}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Get Timestamp
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setTsaHash("")
                    setTsaResult(null)
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>

              {/* Results */}
              {tsaResult && (
                <div className="p-4 border border-slate-200 rounded-lg bg-slate-50">
                  {tsaResult.error ? (
                    <div className="text-red-600 font-semibold">{tsaResult.error}</div>
                  ) : (
                    <>
                      <div className="mb-3">
                        <strong className="text-slate-800">Timestamp:</strong>
                        <div>{tsaResult.timestamp}</div>
                      </div>

                      <div>
                        <strong className="text-slate-800">
                          PKCS#7 Signature (Base64):
                        </strong>
                        <textarea
                          readOnly
                          rows={8}
                          className="mt-2 border border-slate-300 px-3 py-2 rounded w-full"
                          value={tsaResult.message || ""}
                        />
                        <div className="flex space-x-3 mt-3">
                          <Button
                            onClick={() =>
                              downloadFile(
                                tsaResult.message || "",
                                `pkcs7_timestamp_${(tsaResult.timestamp || "")
                                  .replace(/[:.]/g, "-")}.p7s`,
                                "application/pkcs7-mime"
                              )
                            }
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            Download
                          </Button>

                          <a
                            href={`data:text/plain;charset=utf-8,${encodeURIComponent(
                              tsaResult.message || ""
                            )}`}
                            download={`pkcs7_${(tsaResult.timestamp || "")
                              .replace(/[:.]/g, "-")}.b64.txt`}
                          >
                            <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
                              Download Base64
                            </Button>
                          </a>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </Suspense>
        </main>
      </div>
    </div>
  )
}
