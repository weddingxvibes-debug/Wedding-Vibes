import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms and Conditions - WeddingVibes',
  description: 'Terms and Conditions for WeddingVibes Photography - User responsibilities and service terms',
}

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms and Conditions</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using WeddingVibes (we, our, or us), you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
              </p>
              <p className="text-gray-700">
                These terms apply to all users of our wedding photography business management platform, including clients, photographers, and administrators.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Service Description</h2>
              <p className="text-gray-700 mb-4">
                WeddingVibes provides a comprehensive wedding photography business management platform that includes:
              </p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Client-facing website with portfolio and booking system</li>
                <li>Admin dashboard for business management</li>
                <li>Google Drive integration for photo gallery management</li>
                <li>User authentication and booking management</li>
                <li>Email notifications and communication tools</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Responsibilities</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Account Security</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Use strong passwords and enable two-factor authentication when available</li>
                <li>You are responsible for all activities under your account</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Content and Information</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Provide accurate and up-to-date information</li>
                <li>Ensure you have rights to any content you upload or share</li>
                <li>Respect intellectual property rights of others</li>
                <li>Keep your contact information current for service communications</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Google Account Integration</h3>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Ensure your Google account is secure and properly configured</li>
                <li>Grant only necessary permissions for our services to function</li>
                <li>Monitor and manage connected applications in your Google account</li>
                <li>Understand that revoking access may limit service functionality</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Acceptable Use</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Permitted Uses</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Use our services for legitimate wedding photography business purposes</li>
                <li>Access and manage your bookings and client information</li>
                <li>Upload and organize photos through our platform</li>
                <li>Communicate with clients through our messaging system</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Prohibited Activities</h3>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Use our services for any illegal or unauthorized purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Upload malicious software or harmful content</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Interfere with or disrupt our services</li>
                <li>Use automated systems to access our platform without permission</li>
                <li>Share account credentials with unauthorized parties</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Services</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Google Services Integration</h3>
              <p className="text-gray-700 mb-4">
                Our platform integrates with Google services including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Google OAuth for secure authentication</li>
                <li>Google Drive API for photo gallery management</li>
                <li>Google APIs for enhanced functionality</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Third-Party Disclaimer</h3>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <p className="text-yellow-800">
                  <strong>Important:</strong> We are not responsible for the availability, functionality, or policies of third-party services including Google services. Your use of these services is subject to their respective terms and conditions.
                </p>
              </div>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Google services are governed by Google Terms of Service</li>
                <li>We do not control Google service availability or performance</li>
                <li>Changes to Google APIs may affect our service functionality</li>
                <li>You must comply with Google terms when using integrated features</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Account Termination</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Termination by You</h3>
              <p className="text-gray-700 mb-4">
                You may terminate your account at any time by:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Contacting our support team</li>
                <li>Following account deletion procedures in your dashboard</li>
                <li>Revoking Google account permissions</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Termination by Us</h3>
              <p className="text-gray-700 mb-4">
                We reserve the right to suspend or terminate your account if:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>You violate these Terms and Conditions</li>
                <li>You engage in prohibited activities</li>
                <li>Your account remains inactive for extended periods</li>
                <li>We discontinue our services</li>
                <li>Required by law or regulatory authorities</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Effect of Termination</h3>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Your access to our services will be immediately suspended</li>
                <li>Your data may be deleted according to our data retention policy</li>
                <li>You remain responsible for any outstanding obligations</li>
                <li>Certain provisions of these terms will survive termination</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
              
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                <p className="text-red-800 font-medium">
                  IMPORTANT LEGAL NOTICE: Please read this section carefully as it limits our liability.
                </p>
              </div>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Service Availability</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Our services are provided as is without warranties</li>
                <li>We do not guarantee uninterrupted or error-free service</li>
                <li>Service availability may be affected by maintenance or technical issues</li>
                <li>Third-party service disruptions may impact our functionality</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Liability Limitations</h3>
              <p className="text-gray-700 mb-4">
                To the maximum extent permitted by law, WeddingVibes shall not be liable for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Indirect, incidental, or consequential damages</li>
                <li>Loss of profits, data, or business opportunities</li>
                <li>Damages resulting from third-party service failures</li>
                <li>User error or misuse of our services</li>
                <li>Unauthorized access to your account or data</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Maximum Liability</h3>
              <p className="text-gray-700">
                Our total liability for any claims related to our services shall not exceed the amount paid by you for our services in the 12 months preceding the claim, or ₹10,000, whichever is lower.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Intellectual Property</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Our Rights</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>WeddingVibes platform, design, and functionality are our property</li>
                <li>Our trademarks, logos, and branding are protected</li>
                <li>You may not copy, modify, or distribute our platform</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Your Content</h3>
              <ul className="list-disc pl-6 text-gray-700">
                <li>You retain ownership of photos and content you upload</li>
                <li>You grant us license to display and process your content for service provision</li>
                <li>You are responsible for ensuring you have rights to uploaded content</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Governing Law</h2>
              <p className="text-gray-700 mb-4">
                These Terms and Conditions are governed by the laws of India. Any disputes arising from these terms or our services shall be subject to the exclusive jurisdiction of the courts in Madhya Pradesh, India.
              </p>
              <p className="text-gray-700">
                If any provision of these terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services after changes constitutes acceptance of the updated terms.
              </p>
              <p className="text-gray-700">
                We will notify users of material changes through email or prominent notices on our platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have questions about these Terms and Conditions, please contact us:
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
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Acknowledgment</h2>
              <p className="text-gray-700">
                By using WeddingVibes, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. You also acknowledge that you have read our Privacy Policy and understand how we collect, use, and protect your information.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}