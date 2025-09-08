export default function APIDocumentation() {
  const id = "your_certificate_id_here" // Declare the id variable

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">PKI API Documentation</h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Authentication</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-2">Include your API key in the request header:</p>
                <code className="bg-gray-800 text-green-400 p-2 rounded block">X-API-Key: your_api_key_here</code>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Endpoints</h2>

              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-lg font-medium text-gray-900">GET /api/certificates</h3>
                  <p className="text-gray-600">List certificates with optional filtering</p>
                  <div className="mt-2">
                    <h4 className="font-medium text-gray-800">Query Parameters:</h4>
                    <ul className="list-disc list-inside text-gray-600 ml-4">
                      <li>
                        <code>status</code> - Filter by certificate status
                      </li>
                      <li>
                        <code>ca_id</code> - Filter by Certificate Authority
                      </li>
                      <li>
                        <code>limit</code> - Number of results (default: 50)
                      </li>
                      <li>
                        <code>offset</code> - Pagination offset (default: 0)
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-lg font-medium text-gray-900">POST /api/certificates</h3>
                  <p className="text-gray-600">Request a new certificate</p>
                  <div className="mt-2">
                    <h4 className="font-medium text-gray-800">Request Body:</h4>
                    <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
                      {`{
  "csr": "-----BEGIN CERTIFICATE REQUEST-----...",
  "ca_id": "uuid",
  "subject_dn": "CN=example.com,O=Example Corp",
  "validity_days": 365
}`}
                    </pre>
                  </div>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4">
                  <h3 className="text-lg font-medium text-gray-900">GET /api/certificates/{id}</h3>
                  <p className="text-gray-600">Get certificate details</p>
                </div>

                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="text-lg font-medium text-gray-900">DELETE /api/certificates/{id}</h3>
                  <p className="text-gray-600">Revoke a certificate</p>
                  <div className="mt-2">
                    <h4 className="font-medium text-gray-800">Request Body:</h4>
                    <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm">
                      {`{
  "reason": "keyCompromise"
}`}
                    </pre>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="text-lg font-medium text-gray-900">GET /api/ca</h3>
                  <p className="text-gray-600">List available Certificate Authorities</p>
                </div>

                <div className="border-l-4 border-indigo-500 pl-4">
                  <h3 className="text-lg font-medium text-gray-900">GET /api/requests</h3>
                  <p className="text-gray-600">List your certificate requests</p>
                </div>

                <div className="border-l-4 border-pink-500 pl-4">
                  <h3 className="text-lg font-medium text-gray-900">POST /api/webhooks</h3>
                  <p className="text-gray-600">Register webhook for certificate events</p>
                  <div className="mt-2">
                    <h4 className="font-medium text-gray-800">Request Body:</h4>
                    <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm">
                      {`{
  "url": "https://your-app.com/webhook",
  "events": ["certificate.issued", "certificate.revoked"],
  "secret": "webhook_secret"
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Response Format</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-2">All responses are in JSON format:</p>
                <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm">
                  {`{
  "success": true,
  "data": { ... },
  "error": null
}`}
                </pre>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Rate Limits</h2>
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <p className="text-yellow-800">
                  API requests are limited to 1000 requests per hour per API key. Rate limit headers are included in all
                  responses.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
