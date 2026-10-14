import type { Metadata } from "next";
import { PolicyHeader } from "@/components/policy-header";
import { STORE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Jasu Phones privacy policy — how we collect, use, share, retain and protect your personal information under the IT Act, 2000 and SPDI Rules, 2011.",
};

const SECTIONS: { title: string; body: (string | string[])[] }[] = [
  {
    title: "Introduction & scope",
    body: [
      "This Privacy Policy explains how Jasu Phones — a sole proprietorship registered in India — collects, uses, discloses, retains and safeguards your personal information when you access or transact on our website, in accordance with the Information Technology Act, 2000 and the SPDI Rules, 2011.",
      "We collect the information needed to process your orders — your name, email address, mobile number, billing and shipping addresses — along with transaction data, customer-support communications, marketing preferences, and cookie/analytics data described under our Cookies Policy below. By using the website you consent to the practices described in this Policy.",
    ],
  },
  {
    title: "Sensitive Personal Data or Information (SPDI)",
    body: [
      "Pursuant to the SPDI Rules, 2011, Sensitive Personal Data includes: passwords; financial information such as bank account or payment instrument details; physical, physiological, or mental health condition; and biometric information.",
      "Jasu Phones collects SPDI only to the extent strictly necessary for transaction processing or legal compliance. Such data is encrypted and stored securely. We shall not share SPDI with any third party without your explicit consent, except as required by law or to perform the transaction you have requested.",
      "Enhanced security for SPDI: in addition to general security measures, SPDI is subject to enhanced security protocols, including multi-factor authentication for access, regular encryption key rotations, and stringent access controls limited to authorized personnel on a strict need-to-know basis.",
    ],
  },
  {
    title: "Sharing and disclosure of information",
    body: [
      "Jasu Phones does not sell, rent, or trade your personal information to any third party for commercial purposes.",
      "We may share your information with the following categories of parties:",
      [
        "Logistics and Delivery Partners: name, address, and phone number solely for the purpose of order delivery.",
        "Payment Processors and Banks: for transaction completion and fraud prevention.",
        "Technology Service Providers: cloud hosting, website analytics, customer support tools, and similar platforms — all bound by data processing agreements.",
        "Legal and Regulatory Authorities: where disclosure is mandated by applicable law, a court order, or a request from a government authority with jurisdiction.",
        "Successor Entities: in the event of a merger, acquisition, or sale of business assets, subject to the same privacy protections.",
      ],
      "We ensure all third-party service providers who receive personal data are contractually obligated to maintain adequate security standards and use the data only for the specified purpose. Before engaging any provider we conduct thorough due diligence and require legally binding Data Processing Agreements (DPAs) covering data protection, confidentiality, security measures, and compliance with applicable law.",
      "No international data transfers (currently): as of the effective date of this policy, Jasu Phones does not intentionally transfer your personal data outside India. Should a future requirement arise, transfers will comply with applicable law — including obtaining your explicit consent where necessary and implementing adequate safeguards as prescribed by law.",
    ],
  },
  {
    title: "Data retention",
    body: [
      "Jasu Phones retains your personal data only for as long as is necessary for the purposes set out in this Policy or as required under applicable law. Indicative retention periods:",
      [
        "Account data: for the duration of the account, plus 3 years after account closure.",
        "Transaction / order data: 7 years, as required for tax and statutory compliance.",
        "Marketing preferences: until you opt out.",
        "Customer support communications: 2 years from resolution.",
      ],
      "Upon expiry of the applicable retention period, personal data is securely deleted or anonymized.",
    ],
  },
  {
    title: "Your rights",
    body: [
      "As a data principal, you have the following rights with respect to your personal data:",
      [
        "Right to Correction: request correction of inaccurate or incomplete data.",
        "Right to Withdrawal of Consent: withdraw consent for processing (where consent is the basis), without affecting lawfulness of prior processing.",
        "Right to Deletion: request deletion of your personal data, subject to our legal retention requirements.",
        "Right to Grievance Redressal: lodge a complaint with our Grievance Officer regarding the processing of your personal data.",
        "Right to Object to Processing: where we process your data based on legitimate interests, you may object; we will cease processing unless we demonstrate compelling legitimate grounds.",
        "Right to Review and Update: review the personal information you have provided and update it through your user profile on the website, or via our Grievance Officer for data that cannot be updated directly.",
        "Right to Data Portability: where technically feasible and not infringing on others' rights, receive your personal data in a structured, commonly used, machine-readable format and transmit it to another data fiduciary.",
      ],
      "To exercise any of these rights, write to our Grievance Officer (details below), clearly specifying the right you wish to exercise with sufficient information to verify your identity. We respond within thirty (30) days of receiving your verifiable request.",
    ],
  },
  {
    title: "Cookies policy",
    body: [
      "The website uses cookies and similar tracking technologies to enhance user experience, remember preferences, and analyse traffic. Types of cookies used:",
      [
        "Essential cookies — necessary for website functionality (e.g., shopping cart, login sessions).",
        "Performance cookies — analytics to understand how users interact with the website.",
        "Functional cookies — remembering preferences such as language or region.",
        "Marketing / targeting cookies — delivering relevant advertisements and tracking campaign effectiveness.",
      ],
      "You may configure your browser settings to reject or delete cookies. Note that disabling certain cookies may impair the functionality of the website.",
    ],
  },
  {
    title: "Security of your information",
    body: [
      "Jasu Phones implements reasonable security practices and procedures as mandated under Rule 8 of the SPDI Rules, 2011, including: SSL/TLS encryption for all data transmitted to and from the website; secure, encrypted storage of passwords and payment data; restricted internal access to personal data on a need-to-know basis; and regular security audits and vulnerability assessments.",
      "Notwithstanding the above, no security system is impenetrable. Jasu Phones does not guarantee absolute security of your personal data. In the event of a data breach, we shall notify affected users and regulatory authorities in accordance with applicable law.",
      "Accountability and governance: we maintain a robust internal data-governance framework — comprehensive internal policies for data handling, access control and incident management; mandatory and regular training for all employees who handle personal data; a well-defined breach incident-response plan with timely notification; and periodic internal and external security audits.",
      "User responsibility: use strong, unique passwords and change them periodically; keep your login credentials confidential; log out after each session, especially on shared devices; and stay vigilant against phishing attempts and suspicious communications.",
    ],
  },
  {
    title: "Children's privacy",
    body: [
      "The website is not directed at individuals below the age of 18 years. Jasu Phones does not knowingly collect personal data from minors. If a parent or guardian becomes aware that their minor child has provided personal data without consent, they should contact us immediately at support@jasuphones.com — we shall delete such data promptly upon verification.",
    ],
  },
  {
    title: "Links to third-party websites",
    body: [
      "The website may contain links to external websites not operated by Jasu Phones. This Policy does not apply to such external websites, and Jasu Phones is not responsible for the privacy practices or content of any third-party website. Customers are encouraged to review the privacy policies of third-party websites they visit.",
    ],
  },
  {
    title: "Changes to this privacy policy",
    body: [
      "Jasu Phones reserves the right to update this Policy at any time. Updated versions shall be posted on the website with a revised effective date. Continued use of the website after the effective date of a revised Policy constitutes acceptance of the revised Policy. We encourage you to review this Policy periodically.",
    ],
  },
  {
    title: "Grievance Officer — privacy complaints",
    body: [
      `In accordance with the IT Act, 2000 and SPDI Rules, 2011, Jasu Phones has designated a Grievance Officer to address privacy-related complaints. Name: ${STORE.grievance.officer}. Email: ${STORE.grievance.email}. Address: ${STORE.address}. Working Hours: Monday to Saturday, 11:00 AM – 7:00 PM IST (excluding public holidays).`,
      "The Grievance Officer shall acknowledge your complaint within forty-eight (48) hours of receipt and shall endeavor to resolve it expeditiously, typically within a period of thirty (30) days from the date of its receipt. Where additional time is required due to circumstances beyond the Company's reasonable control, you will be informed of the status and reasons for the delay.",
    ],
  },
  {
    title: "User's responsibility for accurate information",
    body: [
      "You are responsible for ensuring the accuracy, completeness, and currency of the personal information you provide. We rely on the information you provide to fulfil our obligations and deliver services. Please promptly update your personal information through your account settings or by contacting our Grievance Officer if anything changes. Jasu Phones shall not be liable for consequences arising from inaccurate or incomplete information provided by you.",
    ],
  },
  {
    title: "Severability",
    body: [
      "If any provision of this Privacy Policy is held to be invalid, illegal, or unenforceable by a court of competent jurisdiction, such provision shall be severed and the remaining provisions shall remain in full force and effect.",
    ],
  },
  {
    title: "No waiver",
    body: [
      "No failure or delay by Jasu Phones in exercising any right, power, or privilege under this Privacy Policy shall operate as a waiver thereof, nor shall any single or partial exercise preclude any other or further exercise of any right, power, or privilege.",
    ],
  },
  {
    title: "Governing law and jurisdiction",
    body: [
      "This Policy is governed by the laws of the Republic of India. Any disputes arising from this Policy shall be subject to the exclusive jurisdiction of courts in Mumbai, Maharashtra, India, without prejudice to your rights under the Consumer Protection Act, 2019.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div>
      <PolicyHeader
        kicker="Our policies"
        title="Privacy Policy"
        intro="How Jasu Phones collects, uses, shares, retains and protects your personal information — compliant with the Information Technology Act, 2000 and the SPDI Rules, 2011."
        facts={[
          { label: "We never", value: "Sell, rent or trade your personal data" },
          { label: "SPDI", value: "Encrypted storage, MFA + key rotation" },
          { label: "Data transfers", value: "No international transfers (currently)" },
          { label: "Response time", value: "Rights requests answered within 30 days" },
        ]}
      />
      <div className="container-x py-14 md:py-18">
        <div className="legal mx-auto max-w-3xl">
          {SECTIONS.map((s) => (
            <section key={s.title}>
              <h2>{s.title}</h2>
              <div className="clause">
                {s.body.map((block, i) =>
                  Array.isArray(block) ? (
                    <ul key={i}>
                      {block.map((li) => (
                        <li key={li}>{li}</li>
                      ))}
                    </ul>
                  ) : (
                    <p key={i}>{block}</p>
                  ),
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
