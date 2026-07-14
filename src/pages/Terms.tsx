import { Link } from "react-router-dom";

function Nav() {
  return (
    <header className="bg-white border-b hairline py-4 px-6">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-lg bg-ink text-white">
            <span className="font-display text-sm font-semibold">L</span>
          </div>
          <span className="font-display text-base font-semibold tracking-tight text-ink">Lumen</span>
        </Link>
        <div className="flex items-center gap-5 text-xs text-subtle">
          <Link to="/privacy-policy" className="hover:text-ink transition-colors">Privacy</Link>
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
        <div className="text-xs text-subtle">© {new Date().getFullYear()} Lumen Capital Technologies, Inc. All rights reserved.</div>
        <div className="flex items-center gap-5 text-xs text-subtle">
          <Link to="/privacy-policy" className="hover:text-ink transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-ink transition-colors">Terms & Conditions</Link>
          <Link to="/" className="hover:text-ink transition-colors">Home</Link>
        </div>
      </div>
    </footer>
  );
}

export default function Terms() {
  return (
    <div className="min-h-screen bg-white text-ink antialiased">
      <Nav />
      <main className="mx-auto max-w-3xl px-6 py-20">
        <div className="mb-10">
          <div className="text-xs uppercase tracking-[0.25em] text-[var(--cobalt)] mb-3">Legal</div>
          <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-medium leading-tight tracking-[-0.03em] text-ink">Terms & Conditions</h1>
          <p className="mt-3 text-sm text-subtle">Last Updated: 18 June 2026</p>
        </div>

        <div className="space-y-10 text-sm leading-relaxed text-subtle">

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using the Lumen website and services (collectively, the "Services"), you agree to be bound by these Terms & Conditions ("Terms"). If you do not agree to these Terms, please do not access or use our Services. These Terms constitute a legally binding agreement between you and Lumen Capital Technologies, Inc. ("Lumen", "we", "our", or "us").</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">2. Eligibility</h2>
            <p>You must be at least 18 years of age to use our Services. By using our Services, you represent and warrant that you are of legal age in your jurisdiction and that you have the legal capacity to enter into these Terms. If you are using our Services on behalf of an entity, you represent that you have authority to bind that entity.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">3. Website Purpose</h2>
            <p>The Lumen website is an informational and educational platform providing content related to cryptocurrency, digital asset investing, blockchain technology, and market analysis. Our Services are designed to help users learn about digital assets and explore investment concepts. We do not operate as a licensed financial services provider, broker, or investment manager.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">4. User Responsibilities</h2>
            <p className="mb-3">By using our Services, you agree to:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Provide accurate and complete information when registering or submitting forms</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorised use of your account</li>
              <li>Use the Services only for lawful purposes and in accordance with these Terms</li>
              <li>Not use the Services in any way that could damage, disable, or impair our platform</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">5. Acceptable Use</h2>
            <p>You may use our Services for personal, non-commercial informational and educational purposes. Any other use, including commercial use, reproduction, or distribution of our content, requires prior written consent from Lumen.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">6. Prohibited Activities</h2>
            <p className="mb-3">You agree not to:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Use our Services for any unlawful purpose or in violation of any regulations</li>
              <li>Attempt to gain unauthorised access to any part of our platform</li>
              <li>Use automated means to scrape, crawl, or extract data from our website</li>
              <li>Impersonate any person or entity or misrepresent your affiliation</li>
              <li>Transmit any harmful, offensive, or disruptive content</li>
              <li>Attempt to reverse engineer any portion of our Services</li>
              <li>Engage in any activity that could manipulate or defraud other users</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">7. Intellectual Property</h2>
            <p>All content on the Lumen website, including text, graphics, logos, icons, images, audio clips, and software, is the property of Lumen Capital Technologies, Inc. or its content suppliers and is protected by intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our express written permission.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">8. Accuracy of Information</h2>
            <p>We strive to provide accurate, current, and complete information on our website. However, we do not warrant the accuracy, completeness, or reliability of any content on our site. Market data, prices, and statistics presented are for illustrative and educational purposes only and may not reflect current conditions.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">9. No Financial, Investment, Tax, or Legal Advice</h2>
            <p>The information provided on this website is for general educational and informational purposes only. <strong className="text-ink">Nothing on this website constitutes financial advice, investment advice, trading advice, tax advice, or legal advice.</strong> You should not rely on any information on this website as a substitute for professional financial, legal, or tax guidance. Always consult a qualified professional before making any investment decision.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">10. Cryptocurrency Risk Disclosure</h2>
            <p>Cryptocurrency and digital assets are highly volatile and speculative. The value of digital assets can increase or decrease substantially within short periods. Past performance is not indicative of future results. Digital assets are not backed by any government, central bank, or physical commodity. Trading and investing in digital assets involves significant risk of financial loss, including the possible loss of all invested capital. You should only invest funds that you can afford to lose entirely.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">11. No Guarantee of Investment Returns</h2>
            <p>Lumen makes no representations, warranties, or guarantees regarding potential investment returns or outcomes. Any figures, percentages, or performance metrics shown on our website are illustrative or historical and do not guarantee future results. We expressly disclaim any promise or guarantee of profit from the use of information on this website.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">12. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, Lumen, its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of our Services, including but not limited to financial losses, loss of data, or loss of business opportunities. Our total liability shall not exceed the amount paid by you, if any, for access to our Services.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">13. Indemnification</h2>
            <p>You agree to indemnify, defend, and hold harmless Lumen and its affiliates, officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable legal fees, arising out of or related to your use of the Services, your violation of these Terms, or your violation of any rights of another party.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">14. Third-Party Links</h2>
            <p>Our website may contain links to third-party websites. These links are provided for convenience only. We have no control over third-party sites and are not responsible for their content, privacy practices, or accuracy. The inclusion of any link does not imply our endorsement of the linked site.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">15. Privacy Policy Reference</h2>
            <p>Your use of our Services is also governed by our <Link to="/privacy-policy" className="text-[var(--cobalt)] hover:underline">Privacy Policy</Link>, which is incorporated into these Terms by reference. By using our Services, you consent to the collection and use of your information as described in the Privacy Policy.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">16. Suspension or Termination of Access</h2>
            <p>We reserve the right, in our sole discretion, to suspend or terminate your access to the Services at any time, with or without notice, for any reason, including violation of these Terms. Upon termination, your right to use the Services ceases immediately.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">17. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with applicable law. Any dispute arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of the relevant jurisdiction.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">18. Dispute Resolution</h2>
            <p>In the event of any dispute arising from these Terms or your use of our Services, we encourage you to first contact us directly at legal@lumen.app to seek an informal resolution. If the dispute cannot be resolved informally, the parties agree to attempt mediation before pursuing formal legal proceedings.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">19. Severability</h2>
            <p>If any provision of these Terms is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall continue in full force and effect.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">20. Changes to These Terms</h2>
            <p>We reserve the right to modify these Terms at any time. We will indicate the date of the most recent revision at the top of this page. Your continued use of our Services after any changes constitutes your acceptance of the updated Terms. We recommend reviewing these Terms periodically.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">21. Contact Information</h2>
            <div className="rounded-2xl border hairline bg-[var(--ice)] p-5 text-sm">
              <p><strong className="text-ink">Lumen Capital Technologies, Inc.</strong></p>
              <p className="mt-1">Legal enquiries: <a href="mailto:legal@lumen.app" className="text-[var(--cobalt)] hover:underline">legal@lumen.app</a></p>
              <p className="mt-1">General: <a href="mailto:hello@lumen.app" className="text-[var(--cobalt)] hover:underline">hello@lumen.app</a></p>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
}
