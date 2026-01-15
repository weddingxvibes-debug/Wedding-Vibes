import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - WeddingVibes',
  description: 'Privacy Policy for WeddingVibes Photography - How we collect, use, and protect your data',
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-700 mb-4">
                Welcome to WeddingVibes (we, our, or us). This Privacy Policy explains how we collect, 
                use, and protect your information when you use our wedding photography business management 
                platform and website.
              </p>
              <p className="text-gray-700">
                We are committed to protecting your privacy and ensuring the security of your personal information. 
                This policy applies to all users of our services, including clients, photographers, and administrators.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Personal Information</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Name and contact information (email, phone number)</li>
                <li>Wedding date and venue details</li>
                <li>Service preferences and booking information</li>
                <li>Communication history and preferences</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Google Account Information</h3>
              <p className="text-gray-700 mb-4">
                When you connect your Google account, we collect:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Basic profile information (name, email, profile picture)</li>
                <li>Google Drive folder metadata (folder names, structure, file names)</li>
                <li>Authentication tokens for secure access</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Technical Information</h3>
              <ul className="list-disc pl-6 text-gray-700">
                <li>IP address and browser information</li>
                <li>Usage patterns and preferences</li>
                <li>Device and operating system information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Google Drive Integration</h2>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                <h3 className="text-lg font-medium text-blue-800 mb-2">Read-Only Access</h3>
                <p className="text-blue-700">
                  <strong>Important:</strong> WeddingVibes only requests read-only access to your Google Drive. 
                  We cannot and do not modify, delete, or share your Google Drive files.
                </p>
              </div>

              <h3 className="text-xl font-medium text-gray-800 mb-3">What We Access</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>View folder structure and file names in specified folders only</li>
                <li>Read metadata (file names, dates, sizes) for gallery organization</li>
                <li>Display photos from shared folders in client galleries</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">What We Do Not Do</h3>
              <ul className="list-disc pl-6 text-gray-700">
                <li>We do not modify or delete any files in your Google Drive</li>
                <li>We do not share your Google Drive files with third parties</li>
                <li>We do not access files outside of specifically designated folders</li>
                <li>We do not store copies of your Google Drive files on our servers</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Provide and improve our photography services</li>
                <li>Manage bookings and client communications</li>
                <li>Create and organize photo galleries</li>
                <li>Send booking confirmations and updates</li>
                <li>Provide customer support</li>
                <li>Ensure platform security and prevent fraud</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Storage and Security</h2>
              <p className="text-gray-700 mb-4">
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Encrypted data transmission (HTTPS/SSL)</li>
                <li>Secure database storage with access controls</li>
                <li>Regular security audits and updates</li>
                <li>Limited access to personal information on a need-to-know basis</li>
              </ul>
              <p className="text-gray-700">
                Your data is stored securely using PostgreSQL database with Neon cloud infrastructure, 
                ensuring high availability and data protection.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Sharing</h2>
              
              <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
                <p className="text-green-700 font-medium">
                  We do not sell, rent, or share your personal information with third parties for marketing purposes.
                </p>
              </div>

              <p className="text-gray-700 mb-4">
                We may share information only in these limited circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>With your explicit consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and prevent fraud</li>
                <li>With service providers who help us operate our platform (under strict confidentiality agreements)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights and Choices</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Google Account Access</h3>
              <p className="text-gray-700 mb-4">
                You can revoke WeddingVibes access to your Google account at any time by:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Visiting your <a href="https://myaccount.google.com/permissions" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google Account Permissions</a></li>
                <li>Finding WeddingVibes in the list of connected apps</li>
                <li>Clicking Remove Access</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Data Rights</h3>
              <p className="text-gray-700 mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Export your data</li>
                <li>Opt out of marketing communications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies and Tracking</h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar technologies to:
              </p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Remember your preferences and settings</li>
                <li>Provide secure authentication</li>
                <li>Analyze website usage and performance</li>
                <li>Improve user experience</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Children&apos;s Privacy</h2>
              <p className="text-gray-700">
                Our services are not intended for children under 13 years of age. We do not knowingly 
                collect personal information from children under 13. If you believe we have collected 
                information from a child under 13, please contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to This Policy</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. We will notify you of any material 
                changes by posting the new policy on our website and updating the Last updated date. 
                Your continued use of our services after changes become effective constitutes acceptance 
                of the updated policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> <a href="mailto:support@weddingvibes.com" className="text-blue-600 hover:underline">support@weddingvibes.com</a>
                </p>
                <p className="text-gray-700">
                  <strong>Business:</strong> WeddingVibes Photography
                </p>
                <p className="text-gray-700">
                  <strong>Location:</strong> Betul, Madhya Pradesh, India
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Google OAuth Compliance</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 mb-2">
                  <strong>Google API Services User Data Policy Compliance:</strong>
                </p>
                <p className="text-blue-700 text-sm">
                  WeddingVibes use and transfer of information received from Google APIs adheres to the 
                  <a href="https://developers.google.com/terms/api-services-user-data-policy" className="underline" target="_blank" rel="noopener noreferrer">
                    Google API Services User Data Policy
                  </a>, including the Limited Use requirements. We only access the minimum necessary 
                  data to provide our photography gallery services and maintain strict data protection standards.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}