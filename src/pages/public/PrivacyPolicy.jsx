import React, { useState, useEffect } from "react";
import PrivacyPolicyImg from '../../Assets/Images/privacypolicy.jpg';

const sections = [
  { id: "s1",  title: "1. Who We Are" },
  { id: "s2",  title: "2. Data We Collect" },
  { id: "s3",  title: "3. How We Use Your Data" },
  { id: "s4",  title: "4. Data Sharing" },
  { id: "s5",  title: "5. Payment Processing" },
  { id: "s6",  title: "6. Landlord Module" },
  { id: "s7",  title: "7. Data Retention" },
  { id: "s8",  title: "8. Your Rights" },
  { id: "s9",  title: "9. Cookies" },
  { id: "s10", title: "10. Security" },
  { id: "s11", title: "11. Cross-Border Transfers" },
  { id: "s12", title: "12. Consent at Sign-In" },
  { id: "s13", title: "13. Policy Updates" },
  { id: "s14", title: "14. Grievance Officer" },
];

const Badge = ({ children, color = "green" }) => {
  const colors = {
    green:  { bg: "#e8f5ee", text: "#1a6b40", border: "#b7dfca" },
    amber:  { bg: "#fff8ec", text: "#92600a", border: "#f0d9a0" },
    blue:   { bg: "#e8f0fb", text: "#1a4a8a", border: "#b3caf0" },
  };
  const c = colors[color];
  return (
    <span
      className="text-xs px-2 py-0.5 rounded-full font-semibold"
      style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}
    >
      {children}
    </span>
  );
};

const SectionHeading = ({ children }) => (
  <h2
    className="text-xl md:text-2xl font-bold text-gray-900 mb-4 pb-2"
    style={{ borderBottom: "2px solid #e8e0d5", fontFamily: "'Georgia', serif" }}
  >
    {children}
  </h2>
);

const InfoBox = ({ children, variant = "neutral" }) => {
  const styles = {
    neutral: { background: "#f9f7f4", border: "1px solid #ede7dc" },
    green:   { background: "#e8f5ee", border: "1px solid #b7dfca" },
    amber:   { background: "#fff8ec", border: "1px solid #f0d9a0" },
    blue:    { background: "#e8f0fb", border: "1px solid #b3caf0" },
  };
  return (
    <div className="p-4 rounded-2xl text-sm md:text-base" style={styles[variant]}>
      {children}
    </div>
  );
};

const PrivacyPolicy = () => {
  const [activeId, setActiveId] = useState("s1");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveId(e.target.id); });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); setActiveId(id); }
  };

  return (
    <div className="min-h-screen pb-24" style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#f9f7f4" }}>

      {/* Hero */}
      <div className="relative w-full h-64 md:h-80">
        <img src={PrivacyPolicyImg} alt="privacy-policy" className="w-full h-full object-cover" style={{ filter: "brightness(0.5)" }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center leading-tight">Privacy Policy</h1>
          <p className="mt-3 text-white/70 text-sm md:text-base" style={{ fontFamily: "sans-serif" }}>
            Last updated: March 2026 · Effective immediately
          </p>
        </div>
      </div>

      {/* Compliance badges */}
      <div className="flex flex-wrap justify-center gap-3 mt-8 px-4">
        {[
          { label: "DPDP Act 2023 (India)", color: "#2d6a4f" },
          { label: "IT Act 2000 (India)",   color: "#2d6a4f" },
          { label: "GDPR – Best-Efforts Compliance", color: "#1a4a8a" },
        ].map(({ label, color }) => (
          <div
            key={label}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-sans font-medium"
            style={{ background: "#fff", border: "1px solid #d4c9b8", color: "#5a4a3a", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
          >
            <span style={{ color }}>●</span> {label}
          </div>
        ))}
      </div>

      {/* Layout */}
      <div className="max-w-6xl mx-auto mt-12 px-4 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Sidebar */}
        <aside className="col-span-1">
          <div
            className="sticky top-24 rounded-2xl p-5 font-sans"
            style={{ background: "#fff", border: "1px solid #e8e0d5", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}
          >
            <p className="text-xs tracking-widest uppercase mb-4 font-semibold" style={{ color: "#9c8570" }}>Contents</p>
            <ul className="space-y-0.5">
              {sections.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => handleScroll(s.id)}
                    className="text-left w-full text-xs py-1.5 px-2 rounded-lg transition-all duration-150"
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
        <div className="col-span-3 font-sans">

          {/* Intro */}
          <p className="text-gray-600 mb-8 leading-relaxed text-sm md:text-base">
            At <strong>Alive Paris</strong>, your privacy matters to us. This Privacy Policy describes what personal
            information we collect, why we collect it, how we use it, and the rights you hold over your data. We are a
            company incorporated and operating under the laws of <strong>India</strong>, governed by the{" "}
            <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong> and the{" "}
            <strong>Information Technology Act, 2000</strong>. Where our services involve users located in France or the
            European Economic Area, we also observe applicable GDPR principles and comply with cross-border transfer
            requirements under <strong>Chapter V of the GDPR</strong>.
          </p>

          {/* ── S1: Who We Are ── */}
          <section id="s1" className="mb-10 scroll-mt-24">
            <SectionHeading>1. Who We Are</SectionHeading>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-4">
              <strong>Alive Paris</strong> is a room rental platform registered in India, providing accommodation
              solutions primarily for Indian students seeking rooms in France. As the operator of this platform, Alive
              Paris acts as the <strong>Data Fiduciary</strong> under Section 2(i) of the DPDP Act, 2023 — the entity
              that determines the purpose and means of processing your personal data.
            </p>
            <InfoBox>
              <div className="space-y-1 text-sm text-gray-700">
                <p><strong>Registered Business:</strong> Alive Paris</p>
                <p><strong>Country of Incorporation:</strong> India</p>
                <p><strong>Email:</strong>{" "}
                  <a href="mailto:info@aliveparis.com" className="underline" style={{ color: "#1a6b40" }}>info@aliveparis.com</a>
                </p>
                <p><strong>Service Region:</strong> France (student accommodation)</p>
                <p className="mt-2 pt-2" style={{ borderTop: "1px solid #ede7dc" }}>
                  <strong>EU Representative:</strong>{" "}
                  <span className="text-gray-500 italic">
                    To be appointed — required under GDPR Article 27 for organisations outside the EU serving EEA users.
                    Alive Paris is in the process of appointing one and will update this policy accordingly.
                  </span>
                </p>
              </div>
            </InfoBox>
          </section>

          {/* ── S2: Data We Collect ── */}
          <section id="s2" className="mb-10 scroll-mt-24">
            <SectionHeading>2. Data We Collect</SectionHeading>
            <p className="text-gray-600 mb-4 text-sm md:text-base">
              We collect only the personal data necessary to provide and improve our services, consistent with the
              principle of <em>data minimisation</em> under the DPDP Act, 2023 and <strong>GDPR Article 5(1)(c)</strong>:
            </p>
            <ul className="space-y-3">
              {[
                { label: "Full Name",              desc: "To identify your account and personalise your experience on the platform." },
                { label: "Email Address",           desc: "For account registration, login, notifications, and support communications." },
                { label: "Phone Number",            desc: "To facilitate contact in relation to rental enquiries where relevant." },
                { label: "Usage & Technical Data",  desc: "IP address, browser type, pages visited — collected automatically for security and performance purposes." },
              ].map(({ label, desc }) => (
                <li key={label} className="flex gap-3 p-3 rounded-xl text-sm md:text-base" style={{ background: "#f9f7f4", border: "1px solid #ede7dc" }}>
                  <span style={{ color: "#2d6a4f", marginTop: "2px", flexShrink: 0 }}>✓</span>
                  <span className="text-gray-600"><strong>{label}:</strong> {desc}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-500 mt-4 text-xs md:text-sm italic">
              We do not collect sensitive personal data or information (SPDI) as defined under the IT Rules, 2011,
              including financial information, health data, biometric data, or passwords beyond what is necessary for
              secure authentication.
            </p>
          </section>

          {/* ── S3: How We Use Your Data ── */}
          <section id="s3" className="mb-10 scroll-mt-24">
            <SectionHeading>3. How We Use Your Data</SectionHeading>
            <p className="text-gray-600 mb-4 text-sm md:text-base">
              Your personal data is used <strong>solely for the following purposes</strong>, each grounded in a lawful
              basis under both the DPDP Act, 2023 and the GDPR:
            </p>
            <div className="space-y-3">
              {[
                { purpose: "Account Creation & Management", dpdp: "Consent (§6)", gdpr: "Contract Art.6(1)(b)",    desc: "Your name, email, and phone number are used to create and manage your account on the platform." },
                { purpose: "Authentication & Security",     dpdp: "Legitimate Use (§7)", gdpr: "Legitimate Interests Art.6(1)(f)", desc: "To verify your identity during login and protect the platform against fraud or unauthorised access." },
                { purpose: "Platform Communications",       dpdp: "Contract (§7)", gdpr: "Contract Art.6(1)(b)",   desc: "To send you service-related notifications such as booking confirmations, account changes, or support responses." },
                { purpose: "Legal Compliance",              dpdp: "Legal Obligation (§7)", gdpr: "Legal Obligation Art.6(1)(c)", desc: "To meet obligations under Indian law and respond to lawful requests from competent authorities." },
              ].map(({ purpose, dpdp, gdpr, desc }) => (
                <div key={purpose} className="p-4 rounded-xl text-sm md:text-base" style={{ background: "#f9f7f4", border: "1px solid #ede7dc" }}>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <strong className="text-gray-800">{purpose}</strong>
                    <Badge color="green">{dpdp}</Badge>
                    <Badge color="blue">{gdpr}</Badge>
                  </div>
                  <p className="text-gray-600">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── S4: Data Sharing ── */}
          <section id="s4" className="mb-10 scroll-mt-24">
            <SectionHeading>4. Data Sharing</SectionHeading>
            <InfoBox variant="green">
              <p className="text-gray-700 font-medium text-sm md:text-base">
                <strong>We do not sell, rent, or share your personal data with any third parties or third-party
                applications.</strong> Your information stays within the Alive Paris platform.
              </p>
            </InfoBox>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mt-4">
              We have no current commercial relationships with advertising networks, data brokers, or analytics providers
              that receive your personal data. In the event that a competent authority under Indian law compels
              disclosure, we will comply strictly within the scope of such obligation and, where legally permitted,
              notify you promptly.
            </p>
          </section>

          {/* ── S5: Payment Processing ── */}
          <section id="s5" className="mb-10 scroll-mt-24">
            <SectionHeading>5. Payment Processing (Future Feature)</SectionHeading>
            <InfoBox variant="amber">
              <p className="text-gray-700 text-sm md:text-base">
                <strong>This feature is not yet active.</strong> We are disclosing this in advance in the interest of
                transparency and compliance with notice obligations under the DPDP Act, 2023.
              </p>
            </InfoBox>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mt-4 mb-3">
              In the future, we intend to integrate a <strong>payment gateway</strong> (such as Stripe or an
              RBI-approved payment aggregator) to enable secure rental transactions. When this feature is introduced:
            </p>
            <ul className="space-y-2 text-gray-600 text-sm md:text-base">
              {[
                "The payment processor will act as a Data Processor under our instruction, subject to a formal Data Processing Agreement (DPA). We will never store your card or banking details ourselves.",
                "Only the minimum data required to initiate a transaction (such as your name and email) may be passed to the payment processor.",
                "Any international payment processor will be required to sign Standard Contractual Clauses (SCCs) to ensure GDPR-compliant data transfer.",
                "You will be notified via email and prompted to provide fresh, informed consent before this feature is activated.",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 p-3 rounded-xl" style={{ background: "#f9f7f4", border: "1px solid #ede7dc" }}>
                  <span style={{ color: "#92600a", flexShrink: 0 }}>→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── S6: Landlord Module ── */}
          <section id="s6" className="mb-10 scroll-mt-24">
            <SectionHeading>6. Landlord Module (Future Feature)</SectionHeading>
            <InfoBox variant="amber">
              <p className="text-gray-700 text-sm md:text-base">
                <strong>This feature is not yet active.</strong> We are disclosing this in advance as required by
                notice obligations under Section 5 of the DPDP Act, 2023.
              </p>
            </InfoBox>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mt-4 mb-3">
              We plan to introduce a <strong>Landlord Module</strong> allowing verified property owners to view the
              profile details of tenants who express interest in their listings. Specifically, landlords may access:
            </p>
            <ul className="space-y-2 mb-4">
              {["Your full name", "Your email address"].map((item) => (
                <li key={item} className="flex gap-3 p-3 rounded-xl text-sm text-gray-600" style={{ background: "#f9f7f4", border: "1px solid #ede7dc" }}>
                  <span style={{ color: "#2d6a4f" }}>✓</span> {item}
                </li>
              ))}
            </ul>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              This sharing will be limited to specific rental enquiries and will require your <strong>explicit,
              informed consent</strong> under DPDP Act Section 6 and <strong>GDPR Article 7</strong>. Your phone
              number will <strong>not</strong> be shared without separate, explicit consent. You will be notified and
              given the opportunity to review updated terms before this feature goes live.
            </p>
          </section>

          {/* ── S7: Data Retention ── */}
          <section id="s7" className="mb-10 scroll-mt-24">
            <SectionHeading>7. Data Retention</SectionHeading>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
              We retain your personal data only for as long as is necessary to fulfil the purpose for which it was
              collected, consistent with Section 8(7) of the DPDP Act, 2023 and <strong>GDPR Article 5(1)(e)</strong>:
            </p>
            <div className="space-y-3">
              {[
                { label: "Active Accounts",           detail: "Data is retained for the duration of your account." },
                { label: "Deleted / Dormant Accounts", detail: "Personal data is deleted or anonymised within 12 months of account deletion or 24 months of inactivity, unless a longer retention period is required by applicable Indian law." },
                { label: "Legal Records",              detail: "Certain compliance-related records may be retained for 5–8 years as required under the Companies Act 2013, Income Tax Act 1961, or other applicable Indian statutes." },
              ].map(({ label, detail }) => (
                <div key={label} className="p-4 rounded-xl text-sm md:text-base" style={{ background: "#f9f7f4", border: "1px solid #ede7dc" }}>
                  <strong className="text-gray-800">{label}</strong>
                  <p className="text-gray-600 mt-1">{detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── S8: Your Rights ── */}
          <section id="s8" className="mb-10 scroll-mt-24">
            <SectionHeading>8. Your Rights</SectionHeading>

            <h3 className="font-semibold text-gray-800 mb-3 text-sm md:text-base">
              Under the DPDP Act, 2023 (Sections 11–14) — All Users
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                { right: "Right to Access",           desc: "Request a summary of your personal data and processing activities." },
                { right: "Right to Correction",       desc: "Request correction of inaccurate, incomplete, or misleading data." },
                { right: "Right to Erasure",          desc: "Request deletion of your personal data, subject to legal retention obligations." },
                { right: "Right to Withdraw Consent", desc: "Withdraw consent at any time; withdrawal will not affect prior lawful processing." },
                { right: "Right to Grievance Redressal", desc: "Lodge a complaint with our Grievance Officer (see Section 14)." },
                { right: "Right to Nominate",         desc: "Nominate another individual to exercise rights on your behalf in case of death or incapacity." },
              ].map(({ right, desc }) => (
                <div key={right} className="p-3 rounded-xl text-sm" style={{ background: "#f9f7f4", border: "1px solid #ede7dc" }}>
                  <strong className="text-gray-800 block mb-1">{right}</strong>
                  <span className="text-gray-600">{desc}</span>
                </div>
              ))}
            </div>

            <h3 className="font-semibold text-gray-800 mb-3 text-sm md:text-base">
              Additional Rights for Users in France / EEA (GDPR Articles 15–22)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {[
                { right: "Right to Data Portability", gdpr: "Art. 20", desc: "Receive your data in a structured, machine-readable format." },
                { right: "Right to Object",           gdpr: "Art. 21", desc: "Object to processing based on legitimate interests." },
                { right: "Right to Restrict Processing", gdpr: "Art. 18", desc: "Request that we limit how we use your data." },
                { right: "Right to Lodge a CNIL Complaint", gdpr: "Art. 77", desc: "Contact the CNIL at www.cnil.fr if you believe your GDPR rights have been violated." },
              ].map(({ right, gdpr, desc }) => (
                <div key={right} className="p-3 rounded-xl text-sm" style={{ background: "#e8f0fb", border: "1px solid #b3caf0" }}>
                  <div className="flex items-center gap-2 mb-1">
                    <strong className="text-gray-800">{right}</strong>
                    <Badge color="blue">{gdpr}</Badge>
                  </div>
                  <span className="text-gray-600">{desc}</span>
                </div>
              ))}
            </div>

            <p className="text-gray-600 text-sm md:text-base mt-2">
              To exercise any of these rights, contact us at{" "}
              <a href="mailto:info@aliveparis.com" className="underline" style={{ color: "#1a6b40" }}>info@aliveparis.com</a>.
              We will respond within <strong>30 days</strong> of receiving your request.
            </p>
          </section>

          {/* ── S9: Cookies ── */}
          <section id="s9" className="mb-10 scroll-mt-24">
            <SectionHeading>9. Cookies</SectionHeading>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              We use strictly necessary cookies for session management and authentication only. We do not currently use
              advertising, tracking, or analytics cookies that share data with third parties. Any future use of
              non-essential cookies will require your prior, informed, and freely given consent in accordance with{" "}
              <strong>GDPR Article 7</strong> and CNIL guidelines. You may manage cookie preferences through your
              browser settings at any time.
            </p>
          </section>

          {/* ── S10: Security ── */}
          <section id="s10" className="mb-10 scroll-mt-24">
            <SectionHeading>10. Security</SectionHeading>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
              We implement reasonable security practices as mandated by the IT (Reasonable Security Practices) Rules,
              2011 and Section 8(5) of the DPDP Act, 2023, including:
            </p>
            <ul className="space-y-2">
              {[
                "Encrypted data transmission (HTTPS) across the platform.",
                "Secure password hashing and storage — we never store passwords in plain text.",
                "Access controls limiting data access to authorised personnel only.",
                "Regular security reviews of the platform and infrastructure.",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 p-3 rounded-xl text-sm text-gray-600" style={{ background: "#f9f7f4", border: "1px solid #ede7dc" }}>
                  <span style={{ color: "#2d6a4f", flexShrink: 0 }}>✓</span> {item}
                </li>
              ))}
            </ul>
            <InfoBox variant="blue" >
              <p className="text-sm text-gray-700 mt-4">
                <strong>Data Breach Notification:</strong> In the event of a personal data breach, we will notify the
                relevant supervisory authority <strong>within 72 hours</strong> as required under{" "}
                <strong>GDPR Article 33</strong>, and notify affected users without undue delay where there is a high
                risk to their rights and freedoms (GDPR Article 34), and in accordance with applicable Indian law.
              </p>
            </InfoBox>
          </section>

          {/* ── S11: Cross-Border Transfers ── */}
          <section id="s11" className="mb-10 scroll-mt-24">
            <SectionHeading>11. Cross-Border Data Transfers</SectionHeading>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
              As Alive Paris serves students located in France while being registered and operating in India, your
              personal data is transferred from France (where you are located) to India (where our servers and team are
              based). India does not currently hold an EU adequacy decision under GDPR Article 45. Accordingly, we
              implement the following safeguards:
            </p>
            <div className="space-y-3">
              {[
                { label: "Standard Contractual Clauses (SCCs)", desc: "We rely on the European Commission's approved SCCs (2021) as the legal transfer mechanism for personal data transferred from the EEA to India." },
                { label: "Transfer Impact Assessment (TIA)",    desc: "We have conducted a documented assessment of India's legal environment to identify any risks to GDPR-standard protections and have implemented supplementary technical measures accordingly." },
                { label: "Encryption",                          desc: "All personal data is encrypted in transit and at rest, serving as a supplementary safeguard under GDPR guidelines." },
                { label: "Data Processing Agreements",          desc: "Any third-party processors engaged are bound by contractual data protection obligations consistent with GDPR Chapter V." },
              ].map(({ label, desc }) => (
                <div key={label} className="p-4 rounded-xl text-sm md:text-base" style={{ background: "#f9f7f4", border: "1px solid #ede7dc" }}>
                  <strong className="text-gray-800">{label}</strong>
                  <p className="text-gray-600 mt-1">{desc}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-xs mt-4">
              We will comply with all transfer-related notifications issued under Section 16 of the DPDP Act, 2023 as
              they are issued by the Central Government of India.
            </p>
          </section>

          {/* ── S12: Consent at Sign-In (NEW) ── */}
          <section id="s12" className="mb-10 scroll-mt-24">
            <SectionHeading>12. Consent at Sign-In</SectionHeading>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
              When you create an account or sign in to Alive Paris, you will be presented with the following
              confirmation before proceeding:
            </p>
            <div
              className="p-5 rounded-2xl text-sm md:text-base font-medium text-gray-800 text-center"
              style={{ background: "#e8f5ee", border: "2px solid #b7dfca" }}
            >
              "By signing in, you agree to our{" "}
              <span className="underline" style={{ color: "#1a6b40" }}>Privacy Policy</span>."
            </div>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mt-4">
              Your consent is freely given, specific, informed, and unambiguous as required under{" "}
              <strong>GDPR Article 7</strong> and <strong>DPDP Act Section 6</strong>. You may withdraw your consent
              at any time by contacting us or deleting your account. Withdrawal of consent will not affect the
              lawfulness of processing carried out before withdrawal.
            </p>
          </section>

          {/* ── S13: Policy Updates ── */}
          <section id="s13" className="mb-10 scroll-mt-24">
            <SectionHeading>13. Policy Updates</SectionHeading>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              We may update this Privacy Policy from time to time, particularly ahead of new features (such as payment
              processing or the Landlord Module) or in response to changes in applicable law. Any material changes will
              be communicated by email and/or a prominent notice on the platform at least{" "}
              <strong>14 days before</strong> they take effect, unless we are legally required to implement changes
              sooner. We will seek fresh consent where required under the DPDP Act, 2023 or GDPR. The date of the
              latest revision is displayed at the top of this page.
            </p>
          </section>

          {/* ── S14: Grievance Officer ── */}
          <section id="s14" className="mb-4 scroll-mt-24">
            <SectionHeading>14. Grievance Officer & Contact</SectionHeading>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
              In accordance with the <strong>Information Technology Act, 2000</strong> and the IT (Intermediary
              Guidelines and Digital Media Ethics Code) Rules, 2021, Alive Paris has designated a{" "}
              <strong>Grievance Officer</strong> to address complaints regarding the processing of your personal data.
            </p>
            <InfoBox>
              <div className="space-y-1 text-sm text-gray-700">
                <p><strong>Organisation:</strong> Alive Paris</p>
                <p><strong>Role:</strong> Grievance Officer / Data Protection Contact</p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:info@aliveparis.com" className="underline" style={{ color: "#1a6b40" }}>info@aliveparis.com</a>
                </p>
                <p><strong>Country of Incorporation:</strong> India</p>
                <p><strong>Response Time:</strong> Acknowledgement within 48 hours · Resolution within 30 days</p>
                
              </div>
            </InfoBox>
          </section>

          <p className="mt-10 text-gray-400 text-xs text-center">
            © 2026 Alive Paris · Last updated: March 2026 · Governed by the laws of India · info@aliveparis.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;