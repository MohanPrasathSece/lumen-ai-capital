import { Link } from "react-router-dom";

function Nav() {
  return (
    <header className="bg-white border-b hairline py-4 px-6">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-lg bg-ink text-white">
            <span className="font-display text-sm font-semibold">L</span>
          </div>
          <span className="font-display text-base font-semibold tracking-tight text-ink">The Market Vault</span>
        </Link>
        <div className="flex items-center gap-5 text-xs text-subtle">
          <Link to="/terms" className="hover:text-ink transition-colors">Terms</Link>
          <Link to="/" className="hover:text-ink transition-colors">Home</Link>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-white border-t hairline py-10 mt-20">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-xs text-subtle">© {new Date().getFullYear()} The Market Vault All rights reserved.</div>
        <div className="flex items-center gap-5 text-xs text-subtle">
          <Link to="/privacy-policy" className="hover:text-ink transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-ink transition-colors">Terms & Conditions</Link>
          <Link to="/" className="hover:text-ink transition-colors">Home</Link>
        </div>
      </div>
    </footer>
  );
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white text-ink antialiased">
      <Nav />
      <main className="mx-auto max-w-3xl px-6 py-20">
        <div className="mb-10">
          <div className="text-xs uppercase tracking-[0.25em] text-[var(--cobalt)] mb-3">Legal</div>
          <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-medium leading-tight tracking-[-0.03em] text-ink">Privacy Policy</h1>
          <p className="mt-3 text-sm text-subtle">Last Updated: 18 June 2026</p>
        </div>

        <div className="prose-lumen space-y-10 text-sm leading-relaxed text-subtle">

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">1. Introduction</h2>
            <p>The Market Vault ("The Market Vault", "we", "our", or "us") is committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this policy carefully. If you disagree with its terms, please discontinue use of our site.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">2. Definitions</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li><strong className="text-ink">Personal Data</strong> - any information that relates to an identified or identifiable natural person.</li>
              <li><strong className="text-ink">Processing</strong> - any operation performed on personal data, including collection, storage, use, disclosure, or deletion.</li>
              <li><strong className="text-ink">Data Controller</strong> - The Market Vault, which determines the purposes and means of processing personal data.</li>
              <li><strong className="text-ink">CRM</strong> - Customer Relationship Management system used to manage and track leads and communications.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">3. Information We Collect</h2>
            <h3 className="font-medium text-ink mb-2">3.1 Information You Voluntarily Provide</h3>
            <p className="mb-3">When you register an account, submit a contact or enquiry form, or otherwise interact with our website, we may collect:</p>
            <ul className="space-y-1 list-disc list-inside mb-4">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Messages or enquiry content you provide (optional)</li>
            </ul>
            <h3 className="font-medium text-ink mb-2">3.2 Automatically Collected Information</h3>
            <p>When you visit our website, certain information may be collected automatically, including your IP address, browser type, operating system, referring URLs, pages viewed, and time spent on pages. This information is collected via cookies and similar technologies (see Section 9).</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">4. Purpose of Data Collection</h2>
            <p className="mb-3">We collect your personal information to:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Create and manage your account on our platform</li>
              <li>Respond to your enquiries and requests</li>
              <li>Send you relevant information about our services</li>
              <li>Improve and personalise your experience on our website</li>
              <li>Comply with legal and regulatory obligations</li>
              <li>Prevent fraud and ensure the security of our platform</li>
              <li>Process and manage leads through our CRM system</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">5. Legal Basis for Processing</h2>
            <p className="mb-3">Where applicable under data protection law (including GDPR), we process your personal data on the following legal bases:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li><strong className="text-ink">Consent</strong> - where you have given clear consent for us to process your data for a specific purpose</li>
              <li><strong className="text-ink">Contractual necessity</strong> - where processing is necessary to perform a contract with you</li>
              <li><strong className="text-ink">Legitimate interests</strong> - where we have a legitimate business interest that is not overridden by your rights</li>
              <li><strong className="text-ink">Legal obligation</strong> - where we are required to process data to comply with law</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">6. How We Use Personal Information</h2>
            <p>Your information is used exclusively for the purposes described in this policy. We do not sell your personal data to third parties. We may share data with our service providers who assist in operating our website and CRM under strict data processing agreements.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">7. CRM and Third-Party Service Providers</h2>
            <p className="mb-3">Information submitted through our signup and contact forms is transmitted to our CRM platform (crmcore.me) for lead management purposes. This includes your name, email address, and phone number. We use your data within the CRM to:</p>
            <ul className="space-y-1 list-disc list-inside mb-4">
              <li>Track and manage your enquiry</li>
              <li>Follow up with relevant information about our services</li>
              <li>Maintain records of your interactions with The Market Vault</li>
            </ul>
            <p>Our CRM provider is required to process your data in accordance with our instructions and applicable data protection law. We do not share your data with other third parties without your consent unless required by law.</p>
            <p className="mt-3"><strong className="text-ink">Note:</strong> Login information (email address used for authentication) is not transmitted to the CRM or any third-party system.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">8. Cookies and Tracking Technologies</h2>
            <p className="mb-3">Our website uses cookies and similar technologies to improve user experience and analyse site usage. Types of cookies used:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li><strong className="text-ink">Essential cookies</strong> - required for the website to function</li>
              <li><strong className="text-ink">Analytics cookies</strong> - help us understand how visitors interact with our site</li>
              <li><strong className="text-ink">Preference cookies</strong> - remember your settings and preferences</li>
            </ul>
            <p className="mt-3">You can control or disable cookies through your browser settings. Please note that disabling essential cookies may affect site functionality.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">9. Data Security Measures</h2>
            <p>We implement appropriate technical and organisational security measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. These include encrypted data transmission (HTTPS), access controls, and regular security reviews. However, no method of transmission over the internet is 100% secure.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">10. Data Retention</h2>
            <p>We retain your personal data for as long as necessary to fulfil the purposes described in this policy, unless a longer retention period is required or permitted by law. When your data is no longer needed, we will securely delete or anonymise it.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">11. International Data Transfers</h2>
            <p>Your information may be transferred to and processed in countries other than your country of residence. Where such transfers occur, we ensure appropriate safeguards are in place in accordance with applicable data protection law, including standard contractual clauses where required.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">12. Your Rights</h2>
            <p className="mb-3">Depending on your jurisdiction, you may have the following rights regarding your personal data:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>The right to access your personal data</li>
              <li>The right to correct inaccurate data</li>
              <li>The right to request deletion of your data</li>
              <li>The right to restrict or object to processing</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent at any time</li>
            </ul>
            <p className="mt-3">To exercise any of these rights, please contact us at privacy@themarketvault.app.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">13. Marketing Communications</h2>
            <p>If you have provided your contact details and consented to receive marketing communications, we may contact you with information about our services. You may unsubscribe at any time by clicking the unsubscribe link in any marketing email or by contacting us directly.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">14. Children's Privacy</h2>
            <p>Our website and services are not directed to children under the age of 18. We do not knowingly collect personal data from children. If you believe we have inadvertently collected data from a child, please contact us immediately and we will take steps to delete such information.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">15. Third-Party Websites</h2>
            <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those websites. We encourage you to review the privacy policies of any third-party sites you visit.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">16. Policy Updates</h2>
            <p>We may update this Privacy Policy from time to time. When we do, we will revise the "Last Updated" date at the top of this page. We encourage you to review this policy periodically. Your continued use of our website after any changes constitutes your acceptance of the updated policy.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">17. Contact Information</h2>
            <p className="mb-2">If you have questions or concerns about this Privacy Policy or our data practices, please contact us:</p>
            <div className="rounded-2xl border hairline bg-[var(--ice)] p-5 text-sm">
              <p><strong className="text-ink">The Market Vault</strong></p>
              <p className="mt-1">Email: <a href="mailto:privacy@themarketvault.app" className="text-[var(--cobalt)] hover:underline">privacy@themarketvault.app</a></p>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
}
