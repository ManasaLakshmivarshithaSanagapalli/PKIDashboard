-- Seed initial data for PKI system

-- Insert default HSM configuration (software-based for development)
INSERT INTO hsm_configurations (name, hsm_type, connection_string, configuration_params, status, health_status)
VALUES (
    'Software HSM (Development)',
    'software',
    'file:///var/lib/pki/keys',
    '{"key_storage_path": "/var/lib/pki/keys", "encryption": "AES256"}',
    'active',
    'healthy'
);

-- Insert root CA template
INSERT INTO certificate_templates (
    name,
    description,
    certificate_type,
    key_algorithm,
    key_size,
    validity_period,
    key_usage,
    extended_key_usage,
    subject_template,
    requires_approval
) VALUES (
    'Root CA Template',
    'Template for creating root Certificate Authorities',
    'root_ca',
    'RSA',
    4096,
    3650,
    ARRAY['cert_sign', 'crl_sign'],
    ARRAY['any'],
    '{"CN": "Root CA", "O": "Organization", "C": "US"}',
    true
);

-- Insert intermediate CA template
INSERT INTO certificate_templates (
    name,
    description,
    certificate_type,
    key_algorithm,
    key_size,
    validity_period,
    key_usage,
    extended_key_usage,
    subject_template,
    requires_approval
) VALUES (
    'Intermediate CA Template',
    'Template for creating intermediate Certificate Authorities',
    'intermediate_ca',
    'RSA',
    3072,
    1825,
    ARRAY['cert_sign', 'crl_sign'],
    ARRAY['any'],
    '{"CN": "Intermediate CA", "O": "Organization", "C": "US"}',
    true
);

-- Insert server certificate template
INSERT INTO certificate_templates (
    name,
    description,
    certificate_type,
    key_algorithm,
    key_size,
    validity_period,
    key_usage,
    extended_key_usage,
    subject_template,
    requires_approval
) VALUES (
    'TLS Server Certificate',
    'Template for TLS/SSL server certificates',
    'end_entity',
    'RSA',
    2048,
    365,
    ARRAY['digital_signature', 'key_encipherment'],
    ARRAY['server_auth'],
    '{"CN": "server.example.com", "O": "Organization", "C": "US"}',
    true
);

-- Insert client certificate template
INSERT INTO certificate_templates (
    name,
    description,
    certificate_type,
    key_algorithm,
    key_size,
    validity_period,
    key_usage,
    extended_key_usage,
    subject_template,
    requires_approval
) VALUES (
    'Client Authentication Certificate',
    'Template for client authentication certificates',
    'end_entity',
    'RSA',
    2048,
    365,
    ARRAY['digital_signature'],
    ARRAY['client_auth'],
    '{"CN": "client@example.com", "O": "Organization", "C": "US"}',
    true
);

-- Insert code signing certificate template
INSERT INTO certificate_templates (
    name,
    description,
    certificate_type,
    key_algorithm,
    key_size,
    validity_period,
    key_usage,
    extended_key_usage,
    subject_template,
    requires_approval
) VALUES (
    'Code Signing Certificate',
    'Template for code signing certificates',
    'end_entity',
    'RSA',
    3072,
    1095,
    ARRAY['digital_signature'],
    ARRAY['code_signing'],
    '{"CN": "Code Signer", "O": "Organization", "C": "US"}',
    true
);
