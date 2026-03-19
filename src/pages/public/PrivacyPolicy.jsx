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
  { id: "s8", title: "8. Your Rights" },
  { id: "s9", title: "9. Cookies" },
  { id: "s10", title: "10. Security" },
  { id: "s11", title: "11. Cross-Border Transfers" },
  { id: "s12", title: "12. Policy Updates" },
  { id: "s13", title: "13. Grievance Officer" },
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
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center leading-tight mt-10">
            Privacy Policy
          </h1>
          <p className="mt-3 text-white/70 text-sm md:text-base font-sans">
            Last updated: March 2026 · Effective immediately
          </p>
        </div>
      </div>

      {/* Compliance Badge */}
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
          This policy complies with the Digital Personal Data Protection Act, 2023 (India) and the Information Technology Act, 2000.
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
        <div className="col-span-2 md:col-span-3 rounded-3xl p-2 md:p-12 font-sans">

          <p className="text-gray-600 mb-8 leading-relaxed text-sm md:text-base">
            At <strong>Alive Paris</strong>, your privacy matters to us. This Privacy Policy describes
            what personal information we collect, why we collect it, how we use it, and the rights you
            hold over your data. We are a company incorporated and operating under the laws of{" "}
            <strong>India</strong>, and this policy is governed by the{" "}
            <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong> and the{" "}
            <strong>Information Technology Act, 2000</strong> (including the IT (Amendment) Act, 2008
            and applicable Rules). Where our services involve users located in France or the European
            Economic Area, we also observe applicable data protection principles under the GDPR on a
            best-efforts basis.
          </p>

          {/* Section 1 */}
          <section id="s1" className="mb-10 scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 pb-2" style={{ borderBottom: "2px solid #e8e0d5" }}>
              1. Who We Are
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              <strong>Alive Paris</strong> is a room rental platform registered in India, providing
              accommodation solutions primarily for students seeking rooms in France. As the operator of
              this platform, Alive Paris acts as the <strong>Data Fiduciary</strong> as defined under
              Section 2(i) of the Digital Personal Data Protection Act, 2023 — the entity that determines
              the purpose and means of processing your personal data.
            </p>
            <div
              className="mt-4 p-4 rounded-2xl text-sm md:text-base"
              style={{ background: "#f9f7f4", border: "1px solid #ede7dc" }}
            >
              <p><strong>Registered Business:</strong> Alive Paris</p>
              <p className="text-gray-600 mt-1"><strong>Country of Incorporation:</strong> India</p>
              <p className="text-gray-600 mt-1">
                <strong>Email:</strong>{" "}
                <a href="mailto:info@aliveparis.com" className="underline" style={{ color: "#1a6b40" }}>
                  info@aliveparis.com
                </a>
              </p>
              <p className="text-gray-600 mt-1"><strong>Service Region:</strong> France (student accommodation)</p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="s2" className="mb-10 scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 pb-2" style={{ borderBottom: "2px solid #e8e0d5" }}>
              2. Data We Collect
            </h2>
            <p className="text-gray-600 mb-3 text-sm md:text-base">
              We collect only the personal data necessary to provide and improve our services, consistent
              with the principle of <em>data minimisation</em> under the DPDP Act, 2023:
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
              We do not collect sensitive personal data or information (SPDI) as defined under the IT
              (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information)
              Rules, 2011, including financial information, health data, biometric data, or passwords
              beyond what is necessary for secure authentication.
            </p>
          </section>

          {/* Section 3 */}
          <section id="s3" className="mb-10 scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 pb-2" style={{ borderBottom: "2px solid #e8e0d5" }}>
              3. How We Use Your Data
            </h2>
            <p className="text-gray-600 mb-3 text-sm md:text-base">
              Your personal data is used <strong>solely for the following purposes</strong>, each
              grounded in a lawful basis. Under the DPDP Act, 2023, processing is permissible on the
              basis of your <strong>consent</strong> (Section 6) or for <strong>legitimate uses</strong>{" "}
              (Section 7), including the performance of a contract and legal compliance:
            </p>
            <div className="space-y-3 text-sm md:text-base">
              {[
                {
                  purpose: "Account Creation & Management",
                  basis: "Consent / Contract",
                  desc: "Your name, email, and phone number are used to create and manage your account on the platform.",
                },
                {
                  purpose: "Authentication & Security",
                  basis: "Legitimate Use",
                  desc: "To verify your identity during login and protect the platform against fraud or unauthorised access.",
                },
                {
                  purpose: "Platform Communications",
                  basis: "Contract",
                  desc: "To send you service-related notifications such as booking confirmations, account changes, or support responses.",
                },
                {
                  purpose: "Legal Compliance",
                  basis: "Legal Obligation",
                  desc: "To meet obligations under Indian law and respond to lawful requests from competent authorities.",
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
              <p className="text-gray-700 font-medium text-sm md:text-base">
                <strong>We do not sell, rent, or share your personal data with any third parties or
                third-party applications.</strong> Your information stays within the Alive Paris platform.
              </p>
            </div>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              We have no current commercial relationships with advertising networks, data brokers, or
              analytics providers that receive your personal data. In the event that a competent authority
              under Indian law (such as a court, tribunal, or government agency) compels disclosure, we
              will comply strictly within the scope of such obligation and, where legally permitted,
              notify you promptly.
            </p>
          </section>

          {/* Section 5 */}
          <section id="s5" className="mb-10 scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 pb-2" style={{ borderBottom: "2px solid #e8e0d5" }}>
              5. Payment Processing (Future Feature)
            </h2>
            <div
              className="flex gap-3 p-4 rounded-2xl mb-4"
              style={{ background: "#fff8ec", border: "1px solid #f0d9a0" }}
            >
              <p className="text-gray-700 text-sm md:text-base">
                <strong>This feature is not yet active.</strong> We are disclosing this in advance in the
                interest of transparency and compliance with notice obligations under the DPDP Act, 2023.
              </p>
            </div>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              In the future, we intend to integrate a <strong>payment gateway</strong> (such as Stripe or
              a RBI-approved payment aggregator) to enable secure rental transactions on the platform.
              When this feature is introduced:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-gray-600 text-sm md:text-base">
              <li>
                The payment processor will act as a <strong>Data Processor</strong> under our instruction,
                subject to a formal data processing agreement. We will never store your card or banking
                details ourselves.
              </li>
              <li>
                Only the minimum data required to initiate a transaction (such as your name and email) may
                be passed to the payment processor, strictly for payment identification purposes.
              </li>
              <li>
                Any international payment processor engaged will be required to comply with applicable
                Indian data protection laws, including data localisation requirements prescribed under
                the Reserve Bank of India (RBI) guidelines where applicable.
              </li>
              <li>
                You will be notified via email and prompted to review an updated Privacy Policy and
                provide fresh, informed consent before this feature is activated.
              </li>
            </ul>
          </section>

          {/* Section 6 */}
          <section id="s6" className="mb-10 scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 pb-2" style={{ borderBottom: "2px solid #e8e0d5" }}>
              6. Landlord Module (Future Feature)
            </h2>
            <div
              className="flex gap-3 p-4 rounded-2xl mb-4"
              style={{ background: "#fff8ec", border: "1px solid #f0d9a0" }}
            >
              <p className="text-gray-700 text-sm md:text-base">
                <strong>This feature is not yet active.</strong> We are disclosing this in advance as
                required by the notice obligations under Section 5 of the DPDP Act, 2023.
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
              will be based on your explicit, informed consent as required under Section 6 of the DPDP
              Act, 2023. Landlords registered on Alive Paris will be bound by data processing obligations
              consistent with this policy. Your phone number will <strong>not</strong> be shared with
              landlords without separate, explicit consent. You will be notified and given the opportunity
              to review updated terms before this feature goes live.
            </p>
          </section>

          {/* Section 7 */}
          <section id="s7" className="mb-10 scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 pb-2" style={{ borderBottom: "2px solid #e8e0d5" }}>
              7. Data Retention
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-3">
              We retain your personal data only for as long as is necessary to fulfil the purpose for
              which it was collected, consistent with Section 8(7) of the DPDP Act, 2023, which requires
              Data Fiduciaries to erase personal data once the specified purpose is no longer being served:
            </p>
            <ul className="space-y-2 text-gray-600 text-sm md:text-base list-disc list-inside">
              <li><strong>Active accounts:</strong> Data is retained for the duration of your account.</li>
              <li>
                <strong>Deleted or dormant accounts:</strong> Personal data is deleted or anonymised
                within <strong>12 months</strong> of account deletion or 24 months of inactivity,
                unless a longer retention period is required by applicable Indian law.
              </li>
              <li>
                <strong>Legal records:</strong> Certain transactional or compliance-related records may
                be retained for up to <strong>5–8 years</strong> as required under the Companies Act,
                2013, Income Tax Act, 1961, or other applicable Indian statutes.
              </li>
            </ul>
          </section>

          {/* Section 8 */}
          <section id="s8" className="mb-10 scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 pb-2" style={{ borderBottom: "2px solid #e8e0d5" }}>
              8. Your Rights
            </h2>
            <p className="text-gray-600 mb-4 text-sm md:text-base">
              Under the <strong>Digital Personal Data Protection Act, 2023</strong> (Sections 11–14),
              you have the following rights as a Data Principal:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm md:text-base">
              {[
                {  right: "Right to Access", desc: "Request a summary of your personal data and the processing activities undertaken." },
                {  right: "Right to Correction", desc: "Request correction of inaccurate, incomplete, or misleading personal data." },
                {  right: "Right to Erasure", desc: "Request deletion of your personal data, subject to legal retention obligations." },
                {  right: "Right to Withdraw Consent", desc: "Withdraw consent at any time; withdrawal will not affect prior lawful processing." },
                {  right: "Right to Grievance Redressal", desc: "Lodge a complaint with our Grievance Officer (details in Section 13)." },
                {  right: "Right to Nominate", desc: "Nominate another individual to exercise rights on your behalf in case of death or incapacity." },
              ].map((item) => (
                <div
                  key={item.right}
                  className="flex gap-3 p-3 rounded-xl"
                  style={{ background: "#f9f7f4", border: "1px solid #ede7dc" }}
                >
                  <div>
                    <strong className="text-gray-800 block">{item.right}</strong>
                    <span className="text-gray-600">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-gray-600 text-sm md:text-base">
              To exercise any of these rights, please contact us at{" "}
              <a href="mailto:info@aliveparis.com" className="underline" style={{ color: "#1a6b40" }}>
                info@aliveparis.com
              </a>
              . We will respond within <strong>30 days</strong> of receiving your request.
            </p>
            <p className="mt-3 text-gray-500 text-xs md:text-sm">
              If you are located in France or within the EEA, you may also have additional rights under
              the GDPR. We endeavour to honour GDPR-equivalent rights on a best-efforts basis. You may
              also lodge a complaint with the{" "}
              <strong>CNIL</strong> (Commission Nationale de l'Informatique et des Libertés) at{" "}
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "#1a6b40" }}>
                www.cnil.fr
              </a>.
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
              Any future use of non-essential cookies will require your prior, informed consent. You may
              manage cookie preferences through your browser settings at any time.
            </p>
          </section>

          {/* Section 10 */}
          <section id="s10" className="mb-10 scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 pb-2" style={{ borderBottom: "2px solid #e8e0d5" }}>
              10. Security
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              We implement reasonable security practices and procedures as mandated by the{" "}
              <strong>Information Technology (Reasonable Security Practices and Procedures and Sensitive
              Personal Data or Information) Rules, 2011</strong> and Section 8(5) of the DPDP Act, 2023.
              These include encrypted data transmission (HTTPS), secure password storage, and access
              controls limiting data access to authorised personnel only. In the event of a personal data
              breach, we will notify affected users and take prompt remedial action in accordance with
              applicable Indian law and any Rules notified under the DPDP Act.
            </p>
          </section>

          {/* Section 11 — Cross-Border Transfers */}
          <section id="s11" className="mb-10 scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 pb-2" style={{ borderBottom: "2px solid #e8e0d5" }}>
              11. Cross-Border Data Transfers
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-3">
              As Alive Paris serves students in France while being registered in India, your personal data
              may be transferred across borders. Under Section 16 of the DPDP Act, 2023, the Central
              Government may notify countries or territories to which personal data transfers are
              permitted. We will comply with all such notifications as they are issued.
            </p>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Where data is transferred outside India, we will ensure that appropriate safeguards are in
              place — including contractual protections with any Data Processors engaged — to ensure your
              personal data receives a level of protection consistent with the DPDP Act. For users in
              France or the EEA, we apply supplementary measures consistent with GDPR principles to the
              extent reasonably practicable.
            </p>
          </section>

          {/* Section 12 */}
          <section id="s12" className="mb-10 scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 pb-2" style={{ borderBottom: "2px solid #e8e0d5" }}>
              12. Policy Updates
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              We may update this Privacy Policy from time to time, particularly ahead of the introduction
              of new features (such as payment processing or the landlord module) or in response to
              changes in applicable law. Any material changes will be communicated by email and/or a
              prominent notice on the platform at least <strong>14 days before</strong> they take effect,
              unless we are legally required to implement changes sooner. We will also seek fresh consent
              where required under the DPDP Act, 2023. The date of the latest revision is displayed at
              the top of this page.
            </p>
          </section>

          {/* Section 13 */}
          <section id="s13" className="mb-4 scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 pb-2" style={{ borderBottom: "2px solid #e8e0d5" }}>
              13. Grievance Officer & Contact
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
              In accordance with the <strong>Information Technology Act, 2000</strong> and the IT
              (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, Alive Paris has
              designated a <strong>Grievance Officer</strong> to address any complaints or concerns
              regarding the processing of your personal data. You may contact them at:
            </p>
            <div
              className="p-5 rounded-2xl text-sm md:text-base"
              style={{ background: "#f9f7f4", border: "1px solid #ede7dc" }}
            >
              <p><strong>Alive Paris</strong></p>
              <p className="text-gray-600 mt-1"><strong>Grievance Officer / Data Protection Contact</strong></p>
              <p className="text-gray-600 mt-1">
                Email:{" "}
                <a href="mailto:info@aliveparis.com" className="underline" style={{ color: "#1a6b40" }}>
                  info@aliveparis.com
                </a>
              </p>
              <p className="text-gray-600 mt-1">Country of Incorporation: India</p>
              <p className="text-gray-600 mt-1">Service Region: France (student accommodation)</p>
              <p className="text-gray-600 mt-3 text-xs">
                We will acknowledge your grievance within <strong>48 hours</strong> and resolve it within
                <strong> 30 days</strong> of receipt, in accordance with applicable Indian law.
              </p>
              {/* <p className="text-gray-600 mt-3 text-xs">
                Users in France or the EEA may also contact the French data protection authority:
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
              </p> */}
            </div>
          </section>

          <p className="mt-10 text-gray-400 text-xs text-center">
            © 2026 Alive Paris · Last updated: March 2026 · Governed by the laws of India
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;