-- PKI System Database Schema
-- This script creates all necessary tables for a comprehensive PKI system

-- Certificate Authorities table
CREATE TABLE certificate_authorities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    common_name VARCHAR(255) NOT NULL UNIQUE,
    organization VARCHAR(255),
    organizational_unit VARCHAR(255),
    country VARCHAR(2),
    state VARCHAR(255),
    locality VARCHAR(255),
    email VARCHAR(255),
    key_algorithm VARCHAR(50) NOT NULL DEFAULT 'RSA',
    key_size INTEGER NOT NULL DEFAULT 2048,
    validity_period INTEGER NOT NULL DEFAULT 3650, -- days
    certificate_pem TEXT,
    private_key_pem TEXT,
    public_key_pem TEXT,
    serial_number BIGINT UNIQUE,
    is_root BOOLEAN DEFAULT false,
    parent_ca_id UUID REFERENCES certificate_authorities(id),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'revoked', 'expired', 'suspended')),
    hsm_key_id VARCHAR(255), -- HSM key identifier
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,
    revoked_at TIMESTAMP WITH TIME ZONE,
    revocation_reason VARCHAR(50)
);

-- Digital Certificates table
CREATE TABLE certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ca_id UUID NOT NULL REFERENCES certificate_authorities(id),
    serial_number BIGINT NOT NULL UNIQUE,
    common_name VARCHAR(255) NOT NULL,
    subject_alternative_names TEXT[], -- Array of SANs
    organization VARCHAR(255),
    organizational_unit VARCHAR(255),
    country VARCHAR(2),
    state VARCHAR(255),
    locality VARCHAR(255),
    email VARCHAR(255),
    certificate_type VARCHAR(50) NOT NULL DEFAULT 'end_entity' CHECK (certificate_type IN ('end_entity', 'intermediate_ca', 'root_ca')),
    key_algorithm VARCHAR(50) NOT NULL DEFAULT 'RSA',
    key_size INTEGER NOT NULL DEFAULT 2048,
    certificate_pem TEXT NOT NULL,
    public_key_pem TEXT,
    csr_pem TEXT, -- Certificate Signing Request
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'revoked', 'expired', 'suspended', 'pending')),
    usage_flags TEXT[], -- Key usage flags
    extended_key_usage TEXT[], -- Extended key usage
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    revoked_at TIMESTAMP WITH TIME ZONE,
    revocation_reason VARCHAR(50) CHECK (revocation_reason IN ('unspecified', 'key_compromise', 'ca_compromise', 'affiliation_changed', 'superseded', 'cessation_of_operation', 'certificate_hold', 'remove_from_crl', 'privilege_withdrawn', 'aa_compromise')),
    requester_info JSONB, -- Information about who requested the certificate
    approval_status VARCHAR(20) DEFAULT 'pending' CHECK (approval_status IN ('pending', 'approved', 'rejected')),
    approved_by UUID REFERENCES auth.users(id),
    approved_at TIMESTAMP WITH TIME ZONE
);

-- Certificate Revocation Lists (CRL) table
CREATE TABLE certificate_revocation_lists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ca_id UUID NOT NULL REFERENCES certificate_authorities(id),
    crl_number BIGINT NOT NULL,
    crl_pem TEXT NOT NULL,
    this_update TIMESTAMP WITH TIME ZONE NOT NULL,
    next_update TIMESTAMP WITH TIME ZONE NOT NULL,
    revoked_certificates JSONB, -- Array of revoked certificate info
    signature_algorithm VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    published_at TIMESTAMP WITH TIME ZONE,
    distribution_points TEXT[], -- CRL distribution points
    UNIQUE(ca_id, crl_number)
);

-- OCSP Responses table
CREATE TABLE ocsp_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    certificate_id UUID NOT NULL REFERENCES certificates(id),
    ca_id UUID NOT NULL REFERENCES certificate_authorities(id),
    serial_number BIGINT NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('good', 'revoked', 'unknown')),
    this_update TIMESTAMP WITH TIME ZONE NOT NULL,
    next_update TIMESTAMP WITH TIME ZONE,
    revocation_time TIMESTAMP WITH TIME ZONE,
    revocation_reason VARCHAR(50),
    response_data BYTEA, -- DER encoded OCSP response
    signature_algorithm VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Registration Authority (RA) table
CREATE TABLE registration_authorities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    ca_id UUID NOT NULL REFERENCES certificate_authorities(id),
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(50),
    address TEXT,
    authorized_users UUID[] DEFAULT '{}', -- Array of user IDs
    certificate_templates JSONB, -- Allowed certificate templates
    approval_required BOOLEAN DEFAULT true,
    auto_approve_domains TEXT[], -- Domains that can be auto-approved
    max_validity_days INTEGER DEFAULT 365,
    allowed_key_sizes INTEGER[] DEFAULT '{2048,3072,4096}',
    allowed_algorithms TEXT[] DEFAULT '{"RSA","ECDSA"}',
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- HSM Configuration table
CREATE TABLE hsm_configurations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    hsm_type VARCHAR(50) NOT NULL, -- 'pkcs11', 'azure_key_vault', 'aws_cloudhsm', etc.
    connection_string TEXT NOT NULL,
    slot_id INTEGER,
    token_label VARCHAR(255),
    pin_encrypted TEXT, -- Encrypted PIN/password
    certificate_store_path VARCHAR(500),
    key_store_path VARCHAR(500),
    configuration_params JSONB, -- Additional HSM-specific parameters
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'error')),
    last_health_check TIMESTAMP WITH TIME ZONE,
    health_status VARCHAR(20) DEFAULT 'unknown' CHECK (health_status IN ('healthy', 'warning', 'error', 'unknown')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Certificate Templates table
CREATE TABLE certificate_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    certificate_type VARCHAR(50) NOT NULL,
    key_algorithm VARCHAR(50) NOT NULL DEFAULT 'RSA',
    key_size INTEGER NOT NULL DEFAULT 2048,
    validity_period INTEGER NOT NULL DEFAULT 365, -- days
    key_usage TEXT[] NOT NULL DEFAULT '{"digital_signature","key_encipherment"}',
    extended_key_usage TEXT[],
    subject_template JSONB, -- Template for subject fields
    san_template JSONB, -- Template for Subject Alternative Names
    requires_approval BOOLEAN DEFAULT true,
    auto_renewal BOOLEAN DEFAULT false,
    renewal_threshold_days INTEGER DEFAULT 30,
    ca_id UUID REFERENCES certificate_authorities(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit Log table
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50) NOT NULL, -- 'certificate', 'ca', 'crl', etc.
    resource_id UUID,
    details JSONB,
    ip_address INET,
    user_agent TEXT,
    success BOOLEAN NOT NULL,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Certificate Requests table (for tracking certificate requests)
CREATE TABLE certificate_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ra_id UUID REFERENCES registration_authorities(id),
    template_id UUID REFERENCES certificate_templates(id),
    requester_id UUID REFERENCES auth.users(id),
    common_name VARCHAR(255) NOT NULL,
    subject_alternative_names TEXT[],
    organization VARCHAR(255),
    organizational_unit VARCHAR(255),
    country VARCHAR(2),
    state VARCHAR(255),
    locality VARCHAR(255),
    email VARCHAR(255),
    csr_pem TEXT NOT NULL,
    public_key_pem TEXT,
    key_algorithm VARCHAR(50),
    key_size INTEGER,
    requested_validity_days INTEGER,
    justification TEXT,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'issued', 'cancelled')),
    reviewed_by UUID REFERENCES auth.users(id),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    review_notes TEXT,
    certificate_id UUID REFERENCES certificates(id), -- Set when certificate is issued
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_certificates_ca_id ON certificates(ca_id);
CREATE INDEX idx_certificates_serial_number ON certificates(serial_number);
CREATE INDEX idx_certificates_status ON certificates(status);
CREATE INDEX idx_certificates_expires_at ON certificates(expires_at);
CREATE INDEX idx_certificates_common_name ON certificates(common_name);

CREATE INDEX idx_crl_ca_id ON certificate_revocation_lists(ca_id);
CREATE INDEX idx_crl_next_update ON certificate_revocation_lists(next_update);

CREATE INDEX idx_ocsp_certificate_id ON ocsp_responses(certificate_id);
CREATE INDEX idx_ocsp_serial_number ON ocsp_responses(serial_number);
CREATE INDEX idx_ocsp_expires_at ON ocsp_responses(expires_at);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX idx_audit_logs_resource_type ON audit_logs(resource_type);

CREATE INDEX idx_cert_requests_status ON certificate_requests(status);
CREATE INDEX idx_cert_requests_requester_id ON certificate_requests(requester_id);
CREATE INDEX idx_cert_requests_created_at ON certificate_requests(created_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_certificate_authorities_updated_at BEFORE UPDATE ON certificate_authorities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_certificates_updated_at BEFORE UPDATE ON certificates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_registration_authorities_updated_at BEFORE UPDATE ON registration_authorities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hsm_configurations_updated_at BEFORE UPDATE ON hsm_configurations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_certificate_templates_updated_at BEFORE UPDATE ON certificate_templates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_certificate_requests_updated_at BEFORE UPDATE ON certificate_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
