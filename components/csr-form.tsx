import { FileText, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

export default function GenerateKeyPageCSR() {
  const [userId, setUserId] = useState<string>("");
  const [keyId, setKeyId] = useState<string>("");
  const [commonName, setCommonName] = useState<string>("");
  const [countryName, setCountryName] = useState<string>("");
  const [csrMode, setCsrMode] = useState<"upload" | "paste">("upload");
  const [csrBase64, setCsrBase64] = useState<string>("");
  const [csrFileName, setCsrFileName] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [certificateText, setCertificateText] = useState<string>("");
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const isValidBase64 = (value: string): boolean => {
    if (!value) return false;
    const normalized = value.replace(/\s+/g, "");
    if (!/^[A-Za-z0-9+/=]+$/.test(normalized)) return false;
    try {
      // atob throws if not valid base64
      // eslint-disable-next-line no-undef
      atob(normalized);
      return true;
    } catch {
      return false;
    }
  };

  const handleFileUpload = async (file: File | null) => {
    setFieldErrors((prev) => ({ ...prev, csr: "" }));
    setCsrBase64("");
    setCsrFileName("");
    if (!file) return;
    setCsrFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result || "");
      // Encode entire file content to base64; CSR files are ASCII PEM
      // eslint-disable-next-line no-undef
      const encoded = btoa(text);
      setCsrBase64(encoded);
    };
    reader.onerror = () => {
      setFieldErrors((prev) => ({ ...prev, csr: "Failed to read file" }));
    };
    reader.readAsText(file);
  };

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!userId) errors.userId = "User is required";
    if (!keyId) errors.keyId = "Key ID is required";
    if (!commonName) errors.commonName = "Common Name is required";
    if (!countryName) errors.countryName = "Country is required";

    if (!csrBase64) {
      errors.csr = "CSR is required";
    } else if (!isValidBase64(csrBase64)) {
      errors.csr = "CSR must be valid base64";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    setSuccessMessage("");
    setErrorMessage("");
    setCertificateText("");
    if (!validate()) return;

    const body = {
      csrBase64: csrBase64.replace(/\s+/g, ""),
      user: userId,
      keyId,
      commonName,
      countryName,
    };

    try {
      setSubmitting(true);
      const response = await fetch("https://localhost:7224/api/CA_Services/GenerateEndCertCSR", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const text = await response.text().catch(() => "");
        throw new Error(text || `Request failed with status ${response.status}`);
      }
      const data = await response.json().catch(() => null);
      const apiSuccess = data?.success === true;
      const apiMessage = data?.message || (apiSuccess ? "CSR submitted successfully." : "CSR submission completed.");
      const certBase64 = data?.result?.cert as string | undefined;

      if (certBase64) {
        try {
          // eslint-disable-next-line no-undef
          const decoded = atob(certBase64.replace(/\s+/g, ""));
          setCertificateText(decoded);
        } catch {
          // Fallback: if not decodable, show raw
          setCertificateText(certBase64);
        }
      }

      if (apiSuccess) setSuccessMessage(apiMessage);
      else setErrorMessage(apiMessage || "Request completed with an error.");
    } catch (err: any) {
      setErrorMessage(err?.message || "Failed to submit CSR.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="space-y-6 lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-slate-800">Certificate Signing Request</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userId">User (UUID) *</Label>
              <Input
                id="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className={`${fieldErrors.userId ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                placeholder="720daf8d-f73a-49c9-807f-9fb9d52cb0aa"
              />
              {fieldErrors.userId && (
                <div className="text-xs text-red-600">{fieldErrors.userId}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="keyId">Key ID *</Label>
              <Input
                id="keyId"
                value={keyId}
                onChange={(e) => setKeyId(e.target.value)}
                className={`${fieldErrors.keyId ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                placeholder="ad5cfb9b-3b07-465b-824d-568a9464f91c"
              />
              {fieldErrors.keyId && (
                <div className="text-xs text-red-600">{fieldErrors.keyId}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="commonName">Common Name *</Label>
              <Input
                id="commonName"
                value={commonName}
                onChange={(e) => setCommonName(e.target.value)}
                className={`${fieldErrors.commonName ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                placeholder="DAES"
              />
              {fieldErrors.commonName && (
                <div className="text-xs text-red-600">{fieldErrors.commonName}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="countryName">Country (2-letter) *</Label>
              <Input
                id="countryName"
                value={countryName}
                onChange={(e) => setCountryName(e.target.value)}
                className={`${fieldErrors.countryName ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                placeholder="IN"
              />
              {fieldErrors.countryName && (
                <div className="text-xs text-red-600">{fieldErrors.countryName}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="csrMode">CSR Input Mode *</Label>
              <Select value={csrMode} onValueChange={(v) => setCsrMode(v as any)}>
                <SelectTrigger id="csrMode">
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upload">Upload CSR file</SelectItem>
                  <SelectItem value="paste">Paste base64 CSR</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {csrMode === "upload" ? (
              <div className="space-y-2">
                <Label>Upload CSR File *</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="file"
                    accept=".csr,.pem,.txt"
                    onChange={(e) => handleFileUpload(e.target.files?.[0] || null)}
                    className="hidden"
                    id="csr-upload"
                  />
                  <Label htmlFor="csr-upload" className="cursor-pointer">
                    <div className={`flex items-center space-x-2 px-4 py-2 border rounded-md hover:bg-slate-50 ${fieldErrors.csr ? "border-red-500" : "border-slate-300"}`}>
                      <Upload className="h-4 w-4" />
                      <span>Choose CSR File</span>
                    </div>
                  </Label>
                  {csrFileName && (
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <FileText className="h-4 w-4" />
                      <span>{csrFileName}</span>
                    </div>
                  )}
                </div>
                {fieldErrors.csr && (
                  <div className="text-xs text-red-600">{fieldErrors.csr}</div>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="csrBase64">Paste Base64 CSR *</Label>
                <Textarea
                  id="csrBase64"
                  placeholder="LS0tLS1CRUdJTiBDRVJUSUZJQ0FURSBSRVFVRVNULS0tLS0uLi4="
                  rows={6}
                  value={csrBase64}
                  onChange={(e) => setCsrBase64(e.target.value)}
                  className={`${fieldErrors.csr ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                />
                {fieldErrors.csr && (
                  <div className="text-xs text-red-600">{fieldErrors.csr}</div>
                )}
              </div>
            )}

          </CardContent>
        </Card>

        <div className="space-y-3">
          <Button className="w-full bg-cyan-600 hover:bg-cyan-700" onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Request"}
          </Button>
          {successMessage && (
            <div className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded p-2">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded p-2">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
      <div className="lg:col-span-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="font-heading text-slate-800 flex items-center justify-between">
              <span>Generated Certificate</span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  disabled={!certificateText}
                  onClick={() => {
                    if (!certificateText) return;
                    navigator.clipboard.writeText(certificateText).then(() => {
                      setIsCopied(true);
                      setTimeout(() => setIsCopied(false), 2000);
                    }).catch(() => {});
                  }}
                >
                  {isCopied ? "Copied" : "Copy"}
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {certificateText ? (
              <div className="rounded-md border border-slate-200 bg-slate-50 p-3 max-h-[500px] overflow-auto">
                <pre className="text-xs leading-5 whitespace-pre-wrap break-words font-mono text-slate-800">
{certificateText}
                </pre>
              </div>
            ) : (
              <div className="text-sm text-slate-600">
                Submit a CSR to generate and view the certificate here.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}