"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Download, AlertTriangle, RefreshCw, CheckCircle } from "lucide-react";

interface CertificateDetailsProps {
  certificateId: string;
}
function extractCN(subject: string) {
  return subject
    ?.split(" ")
    .find((part: string) => part.trim().startsWith("CN="))
    ?.replace("CN=", "")
    .trim();
}

export function CertificateDetails({ certificateId }: CertificateDetailsProps) {
  const [cert, setCert] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const res = await fetch(`/api/certificates/${certificateId}`);
        if (!res.ok) throw new Error(`Failed to fetch certificate: ${res.status}`);
        const data = await res.json();
        console.log("📜 Certificate from API:", data);
        setCert(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificate();
  }, [certificateId]);

  if (loading) return <p>Loading certificate...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!cert) return <p>No certificate found</p>;

  const parsed = cert.parsed || {};

  return (
    <div className="space-y-6">
       <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const pemFormatted = cert.certificate_pem.includes("BEGIN CERTIFICATE")
                    ? cert.certificate_pem
                    : `-----BEGIN CERTIFICATE-----\n${cert.certificate_pem}\n-----END CERTIFICATE-----`;
                  const element = document.createElement("a");
                  const file = new Blob([pemFormatted], { type: "application/x-pem-file" });
                  element.href = URL.createObjectURL(file);
                  element.download = `${"certificate"}.crt`;
                  document.body.appendChild(element);
                  element.click();
                  document.body.removeChild(element);
                }}
              >
                <Download className="h-4 w-4 mr-2" /> Download Certificate
              </Button>
            </div>


      <Tabs defaultValue="openssl" className="space-y-4">
        <TabsList>
          <TabsTrigger value="openssl">Certificate Info</TabsTrigger>
          <TabsTrigger value="pem">PEM Data</TabsTrigger>
        </TabsList>

        <TabsContent value="openssl">
          <Card>
            <CardHeader>
              <CardTitle>Certificate Info</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-xs font-mono whitespace-pre-wrap">{parsed.opensslText}</pre>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pem">
          <Card>
            <CardHeader>
              <CardTitle>PEM</CardTitle>
            </CardHeader>
            <CardContent>
             <Textarea
  value={cert.certificate_pem}
  readOnly
  className="w-[800px] max-w-full font-mono text-xs whitespace-pre-wrap break-words resize-none"
  rows={15}
/>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
