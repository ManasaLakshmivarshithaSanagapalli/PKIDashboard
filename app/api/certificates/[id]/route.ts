// import mysql from "mysql2/promise";
// import { NextResponse } from "next/server";
// import * as pkijs from "pkijs";
// import { fromBER } from "asn1js";
// import { Crypto } from "@peculiar/webcrypto";

// const crypto = new Crypto();
// pkijs.setEngine(
//   "newEngine",
//   crypto,
//   new pkijs.CryptoEngine({ name: "", crypto, subtle: crypto.subtle })
// );

// // Signature OID mapping
// const SIGNATURE_OIDS: Record<string, string> = {
//   "1.2.840.113549.1.1.5": "SHA1 with RSA",
//   "1.2.840.113549.1.1.11": "SHA256 with RSA",
//   "1.2.840.113549.1.1.12": "SHA384 with RSA",
//   "1.2.840.113549.1.1.13": "SHA512 with RSA",
//   "1.2.840.10045.4.3.2": "ECDSA with SHA256",
//   "1.2.840.10045.4.3.3": "ECDSA with SHA384",
//   "1.2.840.10045.4.3.4": "ECDSA with SHA512",
// };

// // Key usage mapping
// const KEY_USAGE_MAP: Record<string, string> = {
//   digitalSignature: "Digital Signature",
//   nonRepudiation: "Non Repudiation",
//   keyEncipherment: "Key Encipherment",
//   dataEncipherment: "Data Encipherment",
//   keyAgreement: "Key Agreement",
//   keyCertSign: "Certificate Sign",
//   cRLSign: "CRL Sign",
//   encipherOnly: "Encipher Only",
//   decipherOnly: "Decipher Only",
// };

// // Extended Key Usage mapping
// const EXT_KEY_USAGE_MAP: Record<string, string> = {
//   serverAuth: "TLS Web Server Authentication",
//   clientAuth: "TLS Web Client Authentication",
//   codeSigning: "Code Signing",
//   emailProtection: "E-mail Protection",
//   timeStamping: "Time Stamping",
//   ocspSigning: "OCSP Signing",
// };

// // Convert PEM to DER
// function pemToDer(pem: string): ArrayBuffer {
//   const b64 = pem
//     .replace(/-----BEGIN CERTIFICATE-----/, "")
//     .replace(/-----END CERTIFICATE-----/, "")
//     .replace(/\s+/g, "");
//   const buf = Buffer.from(b64, "base64");
//   return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
// }

// // Parse RSA public key
// function parseRsaPublicKey(cert: pkijs.Certificate) {
//   const bitString = new Uint8Array(cert.subjectPublicKeyInfo.subjectPublicKey.valueBlock.valueHex);
//   const data = bitString[0] === 0 ? bitString.slice(1) : bitString;
//   const asn1 = fromBER(data.buffer);
//   if (asn1.offset === -1) throw new Error("Failed to parse RSA public key");
//   const rsaKey = new pkijs.RSAPublicKey({ schema: asn1.result });
//   return {
//     publicKeyAlgorithm: "RSA",
//     publicKeySize: rsaKey.modulus.valueBlock.valueHex.byteLength * 8,
//     exponent: Buffer.from(rsaKey.publicExponent.valueBlock.valueHex).readUIntBE(0, rsaKey.publicExponent.valueBlock.valueHex.byteLength),
//   };
// }

// // Format extensions like OpenSSL
// function formatExtensions(extensions: pkijs.Extension[]) {
//   return extensions
//     .map((ext) => {
//       let name = ext.extnID;
//       let value = "";

//       switch (ext.extnID) {
//         case "2.5.29.19":
//           name = "X509v3 Basic Constraints";
//           value = ext.parsedValue?.cA ? "CA:TRUE" : "CA:FALSE";
//           break;
//         case "2.5.29.15":
//           name = "X509v3 Key Usage";
//           value = Object.entries(ext.parsedValue || {})
//             .filter(([_, v]) => v)
//             .map(([k]) => KEY_USAGE_MAP[k] || k)
//             .join(", ");
//           break;
//         case "2.5.29.37":
//           name = "X509v3 Extended Key Usage";
//           value = Object.entries(ext.parsedValue || {})
//             .filter(([_, v]) => v)
//             .map(([k]) => EXT_KEY_USAGE_MAP[k] || k)
//             .join(", ");
//           break;
//         case "2.5.29.17":
//           name = "X509v3 Subject Alternative Name";
//           value = (ext.parsedValue?.altNames || []).map((a: any) => a.value).join(", ");
//           break;
//         default:
//           value = "(unsupported)";
//       }

//       if (ext.critical) name += ": critical";
//       return `            ${name}\n                ${value}`;
//     })
//     .join("\n");
// }

// // Get Common Name
// function getCN(name: any) {
//   return name?.typesAndValues.find((t: any) => t.type === "2.5.4.3")?.value.valueBlock.value;
// }

// // Build OpenSSL-style textual output
// function buildOpenSSLText(cert: pkijs.Certificate) {
//   const serialHex = Buffer.from(cert.serialNumber.valueBlock.valueHex)
//     .toString("hex")
//     .match(/.{1,2}/g)?.join(":") || "";

//   const sigAlg = SIGNATURE_OIDS[cert.signatureAlgorithm.algorithmId] || cert.signatureAlgorithm.algorithmId;
//   const subjectCN = getCN(cert.subject) || "";
//   const issuerCN = getCN(cert.issuer) || "";
//   const notBefore = cert.notBefore.value.toUTCString();
//   const notAfter = cert.notAfter.value.toUTCString();

//   // Public Key info
//   const algOid = cert.subjectPublicKeyInfo.algorithm.algorithmId;
//   let pubKeyInfo = "";
//   if (algOid === "1.2.840.10045.2.1") {
//     // const curve = cert.subjectPublicKeyInfo.algorithm.parameters?.valueBlock?.toString() || "Unknown";
//     // const keySize = cert.subjectPublicKeyInfo.parsedKey?.x?.length*8 || "Unknown";
//     const curve = (cert.subjectPublicKeyInfo.algorithm as any).parameters?.valueBlock?.toString() || "Unknown";

// let keySize: number | string = "Unknown";
// const parsedKey = cert.subjectPublicKeyInfo.parsedKey;
// if (parsedKey && "x" in parsedKey && parsedKey.x) {
//   keySize = (parsedKey.x as ArrayBuffer).byteLength * 8;
// }

//     pubKeyInfo = `            Public-Key: (${keySize} bit)
//                 ASN1 OID: ${curve}
//                 NIST CURVE: ${curve}`;
//   } else if (algOid === "1.2.840.113549.1.1.1") {
//     const rsa = parseRsaPublicKey(cert);
//     pubKeyInfo = `            Public-Key: (${rsa.publicKeySize} bit)
//                 Exponent: ${rsa.exponent}`;
//   } else {
//     pubKeyInfo = `            Public-Key Algorithm OID: ${algOid}`;
//   }

//   const extensionsText = formatExtensions(cert.extensions ?? []);

//   return `
// Certificate:
//     Data:
//         Version: ${cert.version + 1} (0x${cert.version.toString(16)})
//         Serial Number:
//             ${serialHex}
//         Signature Algorithm: ${sigAlg}
//         Issuer: ${issuerCN}
//         Validity
//             Not Before: ${notBefore}
//             Not After : ${notAfter}
//         Subject: ${subjectCN}
//         Subject Public Key Info:
// ${pubKeyInfo}
//         X509v3 extensions:
// ${extensionsText}
//     Signature Algorithm: ${sigAlg}
//   `;
// }

// export async function GET(req: Request) {
//   try {
//     const { pathname } = new URL(req.url);
//     const match = pathname.match(/\/api\/certificates\/(\d+)/);
//     const id = match?.[1];
//     if (!id) return NextResponse.json({ error: "Missing certificate id" }, { status: 400 });

//     const db = await mysql.createConnection({
//       host: "localhost",
//       user: "root",
//       password: "Dhanasri@30",
//       database: "ocsp_database",
//     });

//     const [rows] = await db.execute(
//       `SELECT e.cert_id, e.issuer_id, e.serial_number, e.subject_name, i.issuer_name, e.certificate_pem, e.key_type, e.status
//        FROM end_user_certificates e
//        JOIN issuers i ON e.issuer_id = i.issuer_id
//        WHERE e.cert_id = ?`,
//       [id]
//     );

//     await db.end();

//     if ((rows as any[]).length === 0)
//       return NextResponse.json({ error: "Certificate not found" }, { status: 404 });

//     const certRow = (rows as any[])[0];
//     let pem = certRow.certificate_pem;
//     if (!pem.includes("BEGIN CERTIFICATE")) {
//       pem = `-----BEGIN CERTIFICATE-----\n${pem}\n-----END CERTIFICATE-----`;
//     }

//     let parsed: any = {};
//     try {
//       const der = pemToDer(pem);
//       const asn1 = fromBER(der);
//       if (asn1.offset === -1) throw new Error("Failed to parse DER");

//       const cert = new pkijs.Certificate({ schema: asn1.result });
//       const opensslText = buildOpenSSLText(cert);

//       parsed = { opensslText, subjectCN: getCN(cert.subject), issuerCN: getCN(cert.issuer) };
//       console.log("📜 Parsed certificate:", parsed);
//     } catch (err) {
//       console.error("❌ Failed to parse certificate:", err);
//       parsed = { error: "Failed to parse certificate PEM" };
//     }

//     return NextResponse.json({ ...certRow, parsed });
//   } catch (err: any) {
//     console.error("❌ GET /api/certificates error:", err);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }




// Both code give the certificate data

import mysql from "mysql2/promise";
import { NextResponse } from "next/server";
import * as pkijs from "pkijs";
import { fromBER } from "asn1js";
import { Crypto } from "@peculiar/webcrypto";

// Setup WebCrypto for pkijs
const crypto = new Crypto();
pkijs.setEngine(
  "newEngine",
  crypto,
  new pkijs.CryptoEngine({ name: "", crypto, subtle: crypto.subtle })
);

// ECC curve OID mapping
const EC_CURVE_OIDS: Record<string, string> = {
  "1.2.840.10045.3.1.7": "P-256",
  "1.3.132.0.34": "P-384",
  "1.3.132.0.35": "P-521",
};

// Signature OID mapping
const SIGNATURE_OIDS: Record<string, string> = {
  "1.2.840.113549.1.1.5": "SHA1 with RSA",
  "1.2.840.113549.1.1.11": "SHA256 with RSA",
  "1.2.840.113549.1.1.12": "SHA384 with RSA",
  "1.2.840.113549.1.1.13": "SHA512 with RSA",
  "1.2.840.10045.4.3.2": "ECDSA with SHA256",
  "1.2.840.10045.4.3.3": "ECDSA with SHA384",
  "1.2.840.10045.4.3.4": "ECDSA with SHA512",
};

// Key Usage bit flags
const KEY_USAGE_FLAGS: Record<number, string> = {
  0: "Digital Signature",
  1: "Non Repudiation",
  2: "Key Encipherment",
  3: "Data Encipherment",
  4: "Key Agreement",
  5: "Certificate Sign",
  6: "CRL Sign",
  7: "Encipher Only",
  8: "Decipher Only",
};

// Extended Key Usage mapping
const EXT_KEY_USAGE_MAP: Record<string, string> = {
  serverAuth: "TLS Web Server Authentication",
  clientAuth: "TLS Web Client Authentication",
  codeSigning: "Code Signing",
  emailProtection: "E-mail Protection",
  timeStamping: "Time Stamping",
  ocspSigning: "OCSP Signing",
};

// Convert PEM to DER
function pemToDer(pem: string): ArrayBuffer {
  const b64 = pem.replace(/-----BEGIN CERTIFICATE-----/, "")
                 .replace(/-----END CERTIFICATE-----/, "")
                 .replace(/\s+/g, "");
  const buf = Buffer.from(b64, "base64");
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
}

// Parse RSA public key
function parseRsaPublicKey(cert: pkijs.Certificate) {
  const bitString = new Uint8Array(cert.subjectPublicKeyInfo.subjectPublicKey.valueBlock.valueHex);
  const data = bitString[0] === 0 ? bitString.slice(1) : bitString;
  const asn1 = fromBER(data.buffer);
  if (asn1.offset === -1) throw new Error("Failed to parse RSA public key");
  const rsaKey = new pkijs.RSAPublicKey({ schema: asn1.result });
  return {
    publicKeyAlgorithm: "RSA",
    publicKeySize: rsaKey.modulus.valueBlock.valueHex.byteLength * 8,
    exponent: Buffer.from(rsaKey.publicExponent.valueBlock.valueHex).readUIntBE(0, rsaKey.publicExponent.valueBlock.valueHex.byteLength),
  };
}

// Get Common Name
function getCN(name: any) {
  return name?.typesAndValues.find((t: any) => t.type === "2.5.4.3")?.value.valueBlock.value || "";
}

// Parse Key Usage manually
function parseKeyUsage(ext: pkijs.Extension) {
  if (!ext) return "N/A";
  const bitString = new Uint8Array(ext.extnValue.valueBlock.valueHex);
  const usages: string[] = [];
  for (let i = 0; i < bitString.length; i++) {
    for (let bit = 0; bit < 8; bit++) {
      const flagIndex = i * 8 + bit;
      if ((bitString[i] & (1 << (7 - bit))) !== 0 && KEY_USAGE_FLAGS[flagIndex]) {
        usages.push(KEY_USAGE_FLAGS[flagIndex]);
      }
    }
  }
  return usages.join(", ");
}

// Format extensions like OpenSSL
function formatExtensions(extensions: pkijs.Extension[]) {
  return extensions
    .map((ext) => {
      let name = ext.extnID;
      let value = "";
      switch (ext.extnID) {
        case "2.5.29.19": // Basic Constraints
          name = "X509v3 Basic Constraints";
          value = ext.parsedValue?.cA ? "CA:TRUE" : "CA:FALSE";
          break;
        case "2.5.29.15": // Key Usage
          name = "X509v3 Key Usage";
          value = parseKeyUsage(ext);
          break;
        case "2.5.29.37": // Extended Key Usage
          name = "X509v3 Extended Key Usage";
          value = Object.entries(ext.parsedValue?.keyPurposes || {})
            .filter(([_, v]) => v)
            .map(([k]) => EXT_KEY_USAGE_MAP[k] || k)
            .join(", ");
          break;
        case "2.5.29.17": // Subject Alternative Name
          name = "X509v3 Subject Alternative Name";
          value = (ext.parsedValue?.altNames || []).map((a: any) => a.value).join(", ");
          break;
        default:
          value = "(unsupported)";
      }
      if (ext.critical) name += ": critical";
      return `            ${name}\n                ${value}`;
    })
    .join("\n");
}
function buildOpenSSLText(cert: pkijs.Certificate) {
  // Serial
  const serialHex = Buffer.from(cert.serialNumber.valueBlock.valueHex)
    .toString("hex")
    .match(/.{1,2}/g)
    ?.join(":") || "";

  const sigAlg = SIGNATURE_OIDS[cert.signatureAlgorithm.algorithmId] || cert.signatureAlgorithm.algorithmId;
  const subjectCN = getCN(cert.subject);
  const issuerCN = getCN(cert.issuer);
  const notBefore = cert.notBefore.value.toUTCString();
  const notAfter = cert.notAfter.value.toUTCString();

  let pubKeyInfo = "";
  const algOid = cert.subjectPublicKeyInfo.algorithm.algorithmId;
  if (algOid === "1.2.840.10045.2.1") {
  // ECC
  const curveOid = (cert.subjectPublicKeyInfo.algorithm as any).parameters?.valueBlock?.toString();
  const curveName = EC_CURVE_OIDS[curveOid] || "Unknown";

  let keySize: number | string = "Unknown";
  const parsedKey = cert.subjectPublicKeyInfo.parsedKey;
  if (parsedKey && "x" in parsedKey && parsedKey.x) {
    keySize = (parsedKey.x as ArrayBuffer).byteLength * 8;
  }

  pubKeyInfo = `            Public-Key: (${keySize} bit)
                ASN1 OID: ${curveOid}
                NIST CURVE: ${curveName}`;
}
else if (algOid === "1.2.840.113549.1.1.1") {
    // RSA
    const rsa = parseRsaPublicKey(cert);
    pubKeyInfo = `            Public-Key: (${rsa.publicKeySize} bit)
                Exponent: ${rsa.exponent}`;
  } else {
    pubKeyInfo = `            Public-Key Algorithm OID: ${algOid}`;
  }

  const extensionsText = formatExtensions(cert.extensions ?? []);

  return `
Certificate:
    Data:
        Version: ${cert.version + 1} (0x${cert.version.toString(16)})
        Serial Number:
            ${serialHex}
        Signature Algorithm: ${sigAlg}
        Issuer: ${issuerCN}
        Validity
            Not Before: ${notBefore}
            Not After : ${notAfter}
        Subject: ${subjectCN}
        Subject Public Key Info:
${pubKeyInfo}
        X509v3 extensions:
${extensionsText}
    Signature Algorithm: ${sigAlg}
`;
}

// API Route: GET /api/certificates/:id
export async function GET(req: Request) {
  try {
    const { pathname } = new URL(req.url);
    const match = pathname.match(/\/api\/certificates\/(\d+)/);
    const id = match?.[1];
    if (!id) return NextResponse.json({ error: "Missing certificate id" }, { status: 400 });

    const db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Dhanasri@30",
      database: "ocsp_database",
    });

    const [rows] = await db.execute(
      `SELECT e.cert_id, e.issuer_id, e.serial_number, e.subject_name, i.issuer_name, e.certificate_pem, e.key_type, e.status
       FROM end_user_certificates e
       JOIN issuers i ON e.issuer_id = i.issuer_id
       WHERE e.cert_id = ?`,
      [id]
    );

    await db.end();

    if ((rows as any[]).length === 0)
      return NextResponse.json({ error: "Certificate not found" }, { status: 404 });

    const certRow = (rows as any[])[0];
    let pem = certRow.certificate_pem;
    if (!pem.includes("BEGIN CERTIFICATE")) {
      pem = `-----BEGIN CERTIFICATE-----\n${pem}\n-----END CERTIFICATE-----`;
    }

    let parsed: any = {};
    try {
      const der = pemToDer(pem);
      const asn1 = fromBER(der);
      if (asn1.offset === -1) throw new Error("Failed to parse DER");

      const cert = new pkijs.Certificate({ schema: asn1.result });
      const opensslText = buildOpenSSLText(cert);

      parsed = {
        opensslText,
        subjectCN: getCN(cert.subject),
        issuerCN: getCN(cert.issuer),
      };
      console.log("📜 Parsed certificate:", parsed);
    } catch (err) {
      console.error("❌ Failed to parse certificate:", err);
      parsed = { error: "Failed to parse certificate PEM" };
    }

    return NextResponse.json({ ...certRow, parsed });
  } catch (err: any) {
    console.error("❌ GET /api/certificates error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
