export interface HSMConfiguration {
  id: string
  name: string
  type: HSMType
  status: HSMStatus
  connectionString: string
  slotId?: number
  tokenLabel?: string
  keyCount: number
  lastHealthCheck: Date
  healthStatus: HealthStatus
  configurationParams: Record<string, any>
}

export type HSMType = "pkcs11" | "azure" | "aws" | "software" | "thales" | "safenet"

export type HSMStatus = "active" | "inactive" | "error" | "maintenance"

export type HealthStatus = "healthy" | "warning" | "error" | "unknown"

export interface HSMOperation {
  id: string
  hsmId: string
  operation: OperationType
  keyId?: string
  status: "pending" | "completed" | "failed"
  timestamp: Date
  duration?: number
  error?: string
}

export type OperationType = "generate_key" | "sign" | "encrypt" | "decrypt" | "verify" | "delete_key"

export interface HSMKey {
  id: string
  hsmId: string
  keyId: string
  algorithm: string
  keySize: number
  usage: string[]
  createdAt: Date
  expiresAt?: Date
  certificateId?: string
}
