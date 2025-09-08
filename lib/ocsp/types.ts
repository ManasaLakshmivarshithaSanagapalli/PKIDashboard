export interface OCSPRequest {
  version: number
  requestorName?: string
  requestList: SingleRequest[]
  requestExtensions?: Extension[]
}

export interface SingleRequest {
  reqCert: CertID
  singleRequestExtensions?: Extension[]
}

export interface CertID {
  hashAlgorithm: AlgorithmIdentifier
  issuerNameHash: Uint8Array
  issuerKeyHash: Uint8Array
  serialNumber: Uint8Array
}

export interface OCSPResponse {
  responseStatus: OCSPResponseStatus
  responseBytes?: ResponseBytes
}

export interface ResponseBytes {
  responseType: string
  response: Uint8Array
}

export interface BasicOCSPResponse {
  tbsResponseData: ResponseData
  signatureAlgorithm: AlgorithmIdentifier
  signature: Uint8Array
  certs?: Certificate[]
}

export interface ResponseData {
  version: number
  responderID: ResponderID
  producedAt: Date
  responses: SingleResponse[]
  responseExtensions?: Extension[]
}

export interface SingleResponse {
  certID: CertID
  certStatus: CertStatus
  thisUpdate: Date
  nextUpdate?: Date
  singleExtensions?: Extension[]
}

export type CertStatus = "good" | "revoked" | "unknown"

export interface RevokedInfo {
  revocationTime: Date
  revocationReason?: RevocationReason
}

export type RevocationReason =
  | "unspecified"
  | "keyCompromise"
  | "cACompromise"
  | "affiliationChanged"
  | "superseded"
  | "cessationOfOperation"
  | "certificateHold"
  | "removeFromCRL"
  | "privilegeWithdrawn"
  | "aACompromise"

export type OCSPResponseStatus =
  | "successful"
  | "malformedRequest"
  | "internalError"
  | "tryLater"
  | "sigRequired"
  | "unauthorized"

export interface ResponderID {
  byName?: string
  byKey?: Uint8Array
}

export interface AlgorithmIdentifier {
  algorithm: string
  parameters?: any
}

export interface Extension {
  extnID: string
  critical: boolean
  extnValue: Uint8Array
}

export interface Certificate {
  // Certificate structure would be defined here
  serialNumber: string
  issuer: string
  subject: string
  // ... other certificate fields
}

export interface OCSPResponderConfig {
  id: string
  name: string
  url: string
  caId: string
  signingCertId: string
  status: "active" | "inactive" | "error"
  cacheMaxAge: number
  nextUpdateInterval: number
  maxResponseSize: number
  signatureAlgorithm: string
}
