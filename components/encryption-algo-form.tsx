import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useState } from "react";
import { Check } from "lucide-react";

export default function GenerateKeyPageEncrypAlgo() {
    const [algorithm, setAlgorithm] = useState<string>("");
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [certificateText, setCertificateText] = useState<string>("");
    const [isCopied, setIsCopied] = useState<boolean>(false);

    const handleSubmit = async () => {
        setSuccessMessage("");
        setErrorMessage("");
        if (!algorithm) {
            setErrorMessage("Please select an encryption algorithm.");
            return;
        }
        try {
            setSubmitting(true);
            const response = await fetch("https://localhost:7224/api/CA_Services/GenerateEndCert", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ encryptionAlgorithm: algorithm }),
            });

            if (!response.ok) {
                const text = await response.text().catch(() => "");
                throw new Error(text || `Request failed with status ${response.status}`);
            }

            const text = await response.text();
            setCertificateText(text || "");
            setSuccessMessage(`${algorithm} certificate generated successfully.`);
        } catch (error: any) {
            setErrorMessage(error?.message || "Failed to generate certificate.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="space-y-6 lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-slate-800">Certificate Algorithm</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="certificateType">Encryption Algorithm Type *</Label>
              <Select
                value={algorithm}
                onValueChange={(value) => setAlgorithm(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="RSA">RSA</SelectItem>
                  <SelectItem value="ECC">ECC</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
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
                    navigator.clipboard.writeText(certificateText).catch(() => {});
                    setIsCopied(true);
                    setTimeout(() => {
                        setIsCopied(false);
                    }, 2000);
                  }}
                >
                  {isCopied ? "Copied" : "Copy"}
                  {isCopied && <Check className="h-4 w-4" />}
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
                Submit the form to generate and view the certificate here.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}