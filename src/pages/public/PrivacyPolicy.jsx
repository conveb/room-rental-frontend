import React, { useState } from "react";
import PrivacyPolicyImg from '../../Assets/Images/privacypolicy.jpg';

const sections = [
  { id: "s1", title: "1. Who We Are" },
  { id: "s2", title: "2. Data We Collect" },
  { id: "s3", title: "3. How We Use Your Data" },
  { id: "s4", title: "4. Data Sharing" },
  { id: "s5", title: "5. Payment Processing" },
  { id: "s6", title: "6. Landlord Module" },
  { id: "s7", title: "7. Data Retention" },
  { id: "s8", title: "8. Your Rights (GDPR)" },
  { id: "s9", title: "9. Cookies" },
  { id: "s10", title: "10. Security" },
  { id: "s11", title: "11. Policy Updates" },
  { id: "s12", title: "12. Contact & DPO" },
];

const PrivacyPolicy = () => {
  const [activeId, setActiveId] = useState(null);

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  };

  return (
    <div
      className="min-h-screen pb-20"
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#f9f7f4" }}
    >
      {/* Hero Banner */}
      <div className="relative w-full h-64 md:h-80">
        <img
          src={PrivacyPolicyImg}
          alt="privacy-policy"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.55)" }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <p className="text-xs md:text-sm tracking-[0.3em] text-amber-300 uppercase mb-3 font-sans">
            Alive Paris · Room Rentals
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center leading-tight">
            Privacy Policy
          </h1>
          <p className="mt-3 text-white/70 text-sm md:text-base font-sans">
            Last updated: March 2026 · Effective immediately
          </p>
        </div>
      </div>

      {/* GDPR Badge */}
      <div className="flex justify-center mt-8 px-4">
        <div
          className="inline-flex items-center gap-3 px-5 py-3 rounded-full text-sm font-sans"
          style={{
            background: "#fff",
            border: "1px solid #d4c9b8",
            color: "#5a4a3a",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          }}
        >
          <span style={{ color: "#2d6a4f" }}>●</span>
          This policy complies with the GDPR, French Data Protection Law, and CNIL requirements.
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-6xl mx-auto mt-12 px-4 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Sticky Sidebar */}
        <aside className="col-span-2 md:col-span-1">
          <div
            className="sticky top-24 rounded-2xl p-5 font-sans"
            style={{ background: "#fff", border: "1px solid #e8e0d5", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}
          >
            <p
              className="text-xs tracking-widest uppercase mb-4 font-semibold"
              style={{ color: "#9c8570" }}
            >
              Contents
            </p>
            <ul className="space-y-1">
              {sections.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => handleScroll(s.id)}
                    className="text-left w-full text-xs md:text-sm py-1.5 px-2 rounded-lg transition-all"
                    style={{
                      color: activeId === s.id ? "#1a1a1a" : "#6b5c4c",
                      background: activeId === s.id ? "#f0ebe3" : "transparent",
                      fontWeight: activeId === s.id ? "600" : "400",
                    }}
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Content */}
        <div
          className="col-span-2 md:col-span-3 rounded-3xl p-2 md:p-12 font-sans"
        >
          <p className="text-gray-600 mb-8 leading-relaxed text-sm md:text-base">
            At <strong>Alive Paris</strong>, we take data protection seriously. This Privacy Policy explains
            what personal information we collect, why we collect it, how we use it, and the rights you have
            regarding your data. We operate in full compliance with the{" "}
            <strong>General Data Protection Regulation (GDPR)</strong>, French Law No. 78-17 on Data
            Processing, Files and Freedoms (<em>Loi Informatique et Libertés</em>), and the guidelines
            issued by the <strong>CNIL</strong> (Commission Nationale de l'Informatique et des Libertés).
          </p>

          {/* Section 1 */}
          <section id="s1" className="mb-10 scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 pb-2" style={{ borderBottom: "2px solid #e8e0d5" }}>
              1. Who We Are
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              <strong>Alive Paris</strong> is a room rental platform based in France, connecting tenants
              seeking accommodation with available rental listings. As the operator of this platform, Alive
              Paris acts as the <strong>Data Controller</strong> for all personal data collected through
              this website, as defined under Article 4(7) of the GDPR.
            </p>
          </section>

          {/* Section 2 */}
          <section id="s2" className="mb-10 scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 pb-2" style={{ borderBottom: "2px solid #e8e0d5" }}>
              2. Data We Collect
            </h2>
            <p className="text-gray-600 mb-3 text-sm md:text-base">
              We collect only the minimum data necessary to provide our services (<em>data minimisation</em>,
              Art. 5(1)(c) GDPR):
            </p>
            <ul className="space-y-3 text-gray-600 text-sm md:text-base">
              {[
                { label: "Full Name", desc: "To identify your account and personalise your experience on the platform." },
                { label: "Email Address", desc: "For account registration, login, notifications, and support communications." },
                { label: "Phone Number", desc: "To facilitate contact in relation to rental enquiries where relevant." },
                { label: "Usage & Technical Data", desc: "IP address, browser type, pages visited — collected automatically for security and performance purposes." },
              ].map((item) => (
                <li
                  key={item.label}
                  className="flex gap-3 p-3 rounded-xl"
                  style={{ background: "#f9f7f4", border: "1px solid #ede7dc" }}
                >
                  <span style={{ color: "#2d6a4f", marginTop: "2px" }}>✓</span>
                  <span>
                    <strong>{item.label}:</strong> {item.desc}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-gray-500 mt-4 text-xs md:text-sm italic">
              We do not collect sensitive data (e.g. racial origin, health data, biometric data) as defined
              under Article 9 GDPR.
            </p>
          </section>

          {/* Section 3 */}
          <section id="s3" className="mb-10 scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 pb-2" style={{ borderBottom: "2px solid #e8e0d5" }}>
              3. How We Use Your Data
            </h2>
            <p className="text-gray-600 mb-3 text-sm md:text-base">
              Your personal data is used <strong>solely for the following purposes</strong>, each grounded
              in a lawful basis under Article 6 GDPR:
            </p>
            <div className="space-y-3 text-sm md:text-base">
              {[
                {
                  purpose: "Account Creation & Management",
                  basis: "Contract (Art. 6(1)(b))",
                  desc: "Your name, email, and phone number are used to create and manage your account on the platform.",
                },
                {
                  purpose: "Authentication & Security",
                  basis: "Legitimate Interest (Art. 6(1)(f))",
                  desc: "To verify your identity during login and protect the platform against fraud or unauthorised access.",
                },
                {
                  purpose: "Platform Communications",
                  basis: "Contract (Art. 6(1)(b))",
                  desc: "To send you service-related notifications such as booking confirmations, account changes, or support responses.",
                },
                {
                  purpose: "Legal Compliance",
                  basis: "Legal Obligation (Art. 6(1)(c))",
                  desc: "To meet obligations under French law and respond to lawful requests from competent authorities.",
                },
              ].map((item) => (
                <div
                  key={item.purpose}
                  className="p-4 rounded-xl"
                  style={{ background: "#f9f7f4", border: "1px solid #ede7dc" }}
                >
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <strong className="text-gray-800">{item.purpose}</strong>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: "#e8f5ee", color: "#1a6b40" }}
                    >
                      {item.basis}
                    </span>
                  </div>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4 */}
          <section id="s4" className="mb-10 scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 pb-2" style={{ borderBottom: "2px solid #e8e0d5" }}>
              4. Data Sharing
            </h2>
            <div
              className="flex gap-3 p-4 rounded-2xl mb-4"
              style={{ background: "#e8f5ee", border: "1px solid #b7dfca" }}
            >
              <span className="text-2xl">🔒</span>
              <p className="text-gray-700 font-medium text-sm md:text-base">
                <strong>We do not sell, rent, or share your personal data with any third parties or
                third-party applications.</strong> Your information stays within the Alive Paris platform.
              </p>
            </div>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              We have no current commercial relationships with advertising networks, data brokers, or
              analytics providers that receive your personal data. In the rare event that a legal authority
              (such as a French court or law enforcement) compels disclosure under applicable French law,
              we will comply strictly within the scope of such obligation and, where legally permitted,
              notify you.
            </p>
          </section>

          {/* Section 5 — Future: Stripe */}
          <section id="s5" className="mb-10 scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 pb-2" style={{ borderBottom: "2px solid #e8e0d5" }}>
              5. Payment Processing (Future Feature)
            </h2>
            <div
              className="flex gap-3 p-4 rounded-2xl mb-4"
              style={{ background: "#fff8ec", border: "1px solid #f0d9a0" }}
            >
              <span className="text-2xl">⚠️</span>
              <p className="text-gray-700 text-sm md:text-base">
                <strong>This feature is not yet active.</strong> We are disclosing this in advance in the
                interest of transparency and GDPR accountability.
              </p>
            </div>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              In the future, we intend to integrate a <strong>payment gateway (Stripe)</strong> to enable
              secure rental transactions on the platform. When this feature is introduced:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-gray-600 text-sm md:text-base">
              <li>
                Stripe will act as an <strong>independent data controller</strong> for payment data (card
                details, billing information). We will never store your card details ourselves.
              </li>
              <li>
                Only the minimum data required to initiate a transaction (such as your name and email) may
                be passed to Stripe, strictly for payment identification purposes.
              </li>
              <li>
                Stripe is a GDPR-compliant processor and maintains Standard Contractual Clauses (SCCs) for
                any data transfers outside the EEA.
              </li>
              <li>
                You will be notified via email and prompted to review an updated Privacy Policy and, where
                required, provide fresh consent before this feature is activated.
              </li>
            </ul>
          </section>

          {/* Section 6 — Landlord Module */}
          <section id="s6" className="mb-10 scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 pb-2" style={{ borderBottom: "2px solid #e8e0d5" }}>
              6. Landlord Module (Future Feature)
            </h2>
            <div
              className="flex gap-3 p-4 rounded-2xl mb-4"
              style={{ background: "#fff8ec", border: "1px solid #f0d9a0" }}
            >
              <span className="text-2xl">⚠️</span>
              <p className="text-gray-700 text-sm md:text-base">
                <strong>This feature is not yet active.</strong> We are disclosing this in advance as required
                by GDPR transparency obligations (Art. 13 & 14).
              </p>
            </div>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-3">
              We plan to introduce a <strong>Landlord Module</strong> that allows verified property owners
              listed on the platform to view the profile details of tenants who express interest in or
              apply for their listings. Specifically, landlords may have access to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm md:text-base mb-4">
              <li>Your <strong>full name</strong></li>
              <li>Your <strong>email address</strong></li>
            </ul>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              This sharing will be limited to the context of a specific rental enquiry or application and
              will be based on your explicit consent or the performance of a contract (Art. 6(1)(a) or
              6(1)(b) GDPR). Landlords registered on Alive Paris will be bound by data processing
              obligations consistent with this policy. Your phone number will <strong>not</strong> be
              shared with landlords without separate, explicit consent. You will be notified and given the
              opportunity to review updated terms before this feature goes live.
            </p>
          </section>

          {/* Section 7 */}
          <section id="s7" className="mb-10 scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 pb-2" style={{ borderBottom: "2px solid #e8e0d5" }}>
              7. Data Retention
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-3">
              We retain your personal data only for as long as is necessary for the purposes set out in
              this policy, in accordance with the <em>principe de limitation de la conservation</em>
              (Art. 5(1)(e) GDPR):
            </p>
            <ul className="space-y-2 text-gray-600 text-sm md:text-base list-disc list-inside">
              <li><strong>Active accounts:</strong> Data is retained for the duration of your account.</li>
              <li>
                <strong>Deleted or dormant accounts:</strong> Personal data is deleted or anonymised
                within <strong>12 months</strong> of account deletion or 24 months of inactivity,
                unless a longer retention period is required by French law.
              </li>
              <li>
                <strong>Legal records:</strong> Certain transactional or compliance-related records may be
                kept for up to 5 years as required under French commercial law.
              </li>
            </ul>
          </section>

          {/* Section 8 */}
          <section id="s8" className="mb-10 scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 pb-2" style={{ borderBottom: "2px solid #e8e0d5" }}>
              8. Your Rights Under GDPR
            </h2>
            <p className="text-gray-600 mb-4 text-sm md:text-base">
              Under Articles 15–22 of the GDPR and French data protection law, you have the following rights:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm md:text-base">
              {[
                { icon: "👁", right: "Right of Access", desc: "Request a copy of your personal data." },
                { icon: "✏️", right: "Right to Rectification", desc: "Correct inaccurate or incomplete data." },
                { icon: "🗑", right: "Right to Erasure", desc: "Request deletion of your data ('right to be forgotten')." },
                { icon: "⏸", right: "Right to Restriction", desc: "Limit how we process your data in certain circumstances." },
                { icon: "📦", right: "Right to Portability", desc: "Receive your data in a structured, machine-readable format." },
                { icon: "🚫", right: "Right to Object", desc: "Object to processing based on legitimate interests." },
                { icon: "↩️", right: "Withdraw Consent", desc: "Withdraw consent at any time where processing is consent-based." },
                { icon: "⚖️", right: "Lodge a Complaint", desc: "File a complaint with the CNIL (www.cnil.fr)." },
              ].map((item) => (
                <div
                  key={item.right}
                  className="flex gap-3 p-3 rounded-xl"
                  style={{ background: "#f9f7f4", border: "1px solid #ede7dc" }}
                >
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <strong className="text-gray-800 block">{item.right}</strong>
                    <span className="text-gray-600">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-gray-600 text-sm md:text-base">
              To exercise any of these rights, please contact us at{" "}
              <a href="mailto:contact@aliveparis.fr" className="underline" style={{ color: "#1a6b40" }}>
                contact@aliveparis.fr
              </a>
              . We will respond within <strong>30 days</strong> in accordance with GDPR timelines.
            </p>
          </section>

          {/* Section 9 */}
          <section id="s9" className="mb-10 scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 pb-2" style={{ borderBottom: "2px solid #e8e0d5" }}>
              9. Cookies
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              We use strictly necessary cookies for session management and authentication. We do not
              currently use advertising, tracking, or analytics cookies that share data with third parties.
              In line with CNIL guidelines, any future use of non-essential cookies will require your prior,
              informed consent via a cookie consent banner. You may manage cookie preferences through your
              browser settings at any time.
            </p>
          </section>

          {/* Section 10 */}
          <section id="s10" className="mb-10 scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 pb-2" style={{ borderBottom: "2px solid #e8e0d5" }}>
              10. Security
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              We implement appropriate technical and organisational measures to protect your personal data
              against unauthorised access, loss, or disclosure, as required by Article 32 GDPR. These
              include encrypted data transmission (HTTPS), secure password storage, and access controls
              limiting data access to authorised personnel only. In the event of a personal data breach
              that poses a risk to your rights and freedoms, we will notify the CNIL within 72 hours and
              inform affected users without undue delay, as required by Art. 33–34 GDPR.
            </p>
          </section>

          {/* Section 11 */}
          <section id="s11" className="mb-10 scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 pb-2" style={{ borderBottom: "2px solid #e8e0d5" }}>
              11. Policy Updates
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              We may update this Privacy Policy from time to time, particularly ahead of the introduction
              of new features (such as payment processing or the landlord module). Any material changes
              will be communicated by email and/or a prominent notice on the platform at least{" "}
              <strong>14 days before</strong> they take effect, unless we are legally required to implement
              changes sooner. The date of the latest revision is displayed at the top of this page.
            </p>
          </section>

          {/* Section 12 */}
          <section id="s12" className="mb-4 scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 pb-2" style={{ borderBottom: "2px solid #e8e0d5" }}>
              12. Contact & Data Protection
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
              For any questions about this policy or to exercise your data protection rights, please
              contact us:
            </p>
            <div
              className="p-5 rounded-2xl text-sm md:text-base"
              style={{ background: "#f9f7f4", border: "1px solid #ede7dc" }}
            >
              <p><strong>Alive Paris</strong></p>
              <p className="text-gray-600 mt-1">
                Email:{" "}
                <a href="mailto:contact@aliveparis.fr" className="underline" style={{ color: "#1a6b40" }}>
                  contact@aliveparis.fr
                </a>
              </p>
              <p className="text-gray-600 mt-1">Country of operation: France</p>
              <p className="text-gray-600 mt-3 text-xs">
                You also have the right to lodge a complaint with the French data protection authority:
                <br />
                <strong>CNIL</strong> — Commission Nationale de l'Informatique et des Libertés
                <br />
                <a
                  href="https://www.cnil.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                  style={{ color: "#1a6b40" }}
                >
                  www.cnil.fr
                </a>
              </p>
            </div>
          </section>

          <p className="mt-10 text-gray-400 text-xs text-center">
            © 2026 Alive Paris · Last updated: March 2026
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;