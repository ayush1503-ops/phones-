import type { Metadata } from "next";
import { PolicyHeader } from "@/components/policy-header";
import { STORE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and Conditions of Jasu Phones — governing your use of the website, purchases, payments, warranties, liability and dispute resolution under Indian law.",
};

const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: "1. Definitions",
    body: [
      "“Jasu Phones”, “we”, “us”, “our” means the sole proprietorship concern conducting business under the name and style of “Jasu Phones / JASU”, registered and operating in India in accordance with applicable laws, including the Indian Contract Act, 1872, the Information Technology Act, 2000, the Consumer Protection Act, 2019, and the Consumer Protection (E-Commerce) Rules, 2020.",
      "“Website” means the e-commerce platform operated by Jasu Phones at https://jasuphones.com/, including all pages, content, features and services. “User”, “you”, “Customer” means any natural or legal person who accesses, visits, browses or uses the Website, registers an account, places an order, or intends to purchase products. “Products” means keypad-based mobile phones and related products, accessories or merchandise listed for sale, intentionally designed to deliver essential communication functions. “Order” means any formal request placed through the Website's checkout process.",
    ],
  },
  {
    title: "2. Business description and philosophy",
    body: [
      "Jasu Phones is an e-commerce enterprise established with the objective of addressing the growing concerns of excessive digital dependency in modern society. The platform primarily offers touch screen + keypad-based mobile phones that are intentionally designed to deliver only essential communication functions, thereby minimizing unnecessary digital engagement and distractions.",
      "The core philosophy of Jasu Phones revolves around digital minimalism. By encouraging consumers to shift away from feature-heavy smartphones to simpler devices, the company aims to help individuals reclaim control over their time, attention, and mental well-being. By using the Website or purchasing our Products, you explicitly acknowledge, understand, and agree that the Products are curated with the specific objective of limiting digital features.",
    ],
  },
  {
    title: "3. Eligibility and acceptance",
    body: [
      "Use of the Website is available only to persons who can form legally binding contracts under the Indian Contract Act, 1872. Persons who are “incompetent to contract” within the meaning of the Act, including minors and un-discharged insolvents, are not eligible to use the Website.",
      "You represent and warrant that you are at least eighteen (18) years of age and possess the legal authority to enter into this agreement. If you are a minor, you may use the Website only with the involvement and under the supervision of a parent or legal guardian who agrees to be bound by these Terms; the parent or legal guardian shall be solely responsible for all acts and omissions of the minor.",
      "You further represent and warrant that all information provided during registration or any transaction is true, accurate, and complete. Any misrepresentation may lead to suspension or termination of your account and/or cancellation of your Order. These Terms, together with the Privacy Policy, Return & Refund Policy, and any other policy published on the Website, constitute the entire agreement between Jasu Phones and you; in the event of conflict, these Terms shall prevail. Jasu Phones reserves the right to refuse service, cancel orders, or terminate accounts at its sole discretion, particularly in cases of misuse, fraud, or suspected fraudulent activity.",
    ],
  },
  {
    title: "4. Amendment of terms",
    body: [
      "Jasu Phones reserves the absolute and unconditional right to modify, amend, update, or revise these Terms at any time, in its sole discretion, without any prior specific notice. Amendments are effective immediately upon posting; continued use of the Website and/or placement of Orders thereafter constitutes conclusive acceptance of the revised Terms. You are advised to review these Terms periodically.",
    ],
  },
  {
    title: "5. Website access, content, and use",
    body: [
      "Jasu Phones grants you a limited, non-exclusive, non-transferable, and revocable license to access and make personal, non-commercial use of this Website. This license excludes any resale or commercial use, collection of product listings/descriptions/prices, derivative use, downloading of account information for another merchant, or use of data mining, robots, or similar tools.",
      "All content on the Website — text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations and software — is the property of Dumb Phones India or its content suppliers and protected by Indian and international intellectual property laws.",
      "Prohibited activities include: interfering with or disrupting the Website or its servers/networks; attempting unauthorized access by hacking or password “mining”; probing or testing vulnerabilities; sending unsolicited advertising, spam or chain letters; impersonating any person or entity; and uploading viruses, trojans or malicious code.",
      "User-Generated Content: If you submit comments, reviews or other content, you are solely responsible for it and grant Jasu Phones a worldwide, non-exclusive, royalty-free, perpetual, irrevocable and fully sublicensable right to use, reproduce, modify, adapt, publish, translate, distribute and display it. Jasu Phones has the right, but not the obligation, to monitor, edit or remove User Content, and assumes no liability for it.",
    ],
  },
  {
    title: "6. Registration, account, and registration data",
    body: [
      "To place an Order, you may be required to create an account and provide information including your full name, email address, mobile number, billing address, and shipping address (“Registration Data”).",
      "You agree to provide true, accurate, current and complete information and to keep it updated. You are solely responsible for maintaining the confidentiality of your password and for all activities under your account, and must notify Jasu Phones immediately of any unauthorized use. Jasu Phones may suspend or terminate accounts where Registration Data is untrue, inaccurate, outdated, incomplete, or where these Terms have been violated.",
    ],
  },
  {
    title: "7. Product listings, descriptions, and availability",
    body: [
      "We strive to be as accurate as possible in Product descriptions, but Jasu Phones does not warrant that descriptions, images, specifications, or other content are accurate, complete, reliable, current, or error-free. Actual colours, appearance and dimensions may vary slightly due to monitor settings or photographic lighting.",
      "All Products are offered subject to availability. We may limit quantities, fulfil part of an Order, divide shipments, or cancel/refuse any Order if a Product becomes unavailable; you will be notified promptly and refunded for unavailable items.",
      "All prices are in Indian Rupees (INR) and may change at our discretion without prior notice. In case of a typographical or pricing error, Jasu Phones may refuse or cancel affected orders; any amount charged will be credited back. Jasu Phones shall not be liable for loss or damage arising from unavailability of a Product after an Order is placed — a full refund will be issued in such cases.",
    ],
  },
  {
    title: "8. Payment terms",
    body: [
      "You agree to pay the listed price in full before dispatch; an Order is confirmed only upon successful receipt of payment. We offer various payment options including credit/debit cards, net banking, and third-party payment gateways, and you warrant that you are authorized to use your designated payment method.",
      "We use secure PCI-DSS compliant third-party payment gateways. Jasu Phones does not store, log, or retain any card or banking credentials, and is not responsible for decline of authorization on account of preset issuer limits. In the event of payment failure, the Company is not responsible for double debit, reversal delays, or other banking errors — customers must contact their bank or payment provider directly.",
    ],
  },
  {
    title: "9. Shipping and delivery",
    body: [
      "Jasu Phones aims to ensure timely delivery of Products — products ordered before 6 PM are aimed to be delivered within the next 48 hours from order placement. However, delays may occur due to unforeseen circumstances, logistical issues, or Force Majeure Events.",
      "All shipping and delivery terms — estimated times, charges and serviceable areas — are governed by our separate Shipping Policy, which forms an integral part of these Terms. By placing an Order you agree to be bound by it.",
    ],
  },
  {
    title: "10. Return, refund and cancellation policy",
    body: [
      "Our policies regarding returns, refunds and cancellations are detailed in the separate Returns, Refund & Warranty Policy, which forms an integral part of these Terms. By placing an Order you acknowledge and agree to abide by it.",
    ],
  },
  {
    title: "11. Right to cancel the order by Jasu Phones",
    body: [
      "Jasu Phones reserves the right to refuse or cancel any Order for any reason, including: quantity limitations; inaccuracies in product or pricing information; problems identified by our credit and fraud avoidance department; technical errors; non-compliance with these Terms or policies; suspicion of fraudulent or unlawful activity; and product unavailability or inability to deliver to the specified address.",
      "We may require additional verifications before accepting an Order, and will contact you if any portion is cancelled or more information is needed. If your Order is cancelled after payment, the amount will be reversed to your original mode of payment within a reasonable timeframe.",
    ],
  },
  {
    title: "12. Warranty and product liability",
    body: [
      "Products sold may carry the original manufacturer's warranty as applicable. Jasu Phones does not provide any additional warranty over and above the manufacturer's warranty unless expressly stated. Warranty claims must be directed to the original manufacturer or its authorised service centres; Jasu Phones is not responsible for warranty services, replacement parts, or repairs.",
      "Jasu Phones' liability as a seller under the Consumer Protection Act, 2019 is limited to: ensuring authenticity of Products sourced from authorized channels; passing on manufacturer warranties where applicable; and facilitating the return/refund process under its Returns Policy.",
      "Jasu Phones shall not be liable for: defects arising from normal wear and tear; physical or liquid damage or misuse; modification, rooting, unlocking, or software alteration; loss of data stored on the device; or incompatibility with third-party applications or services.",
    ],
  },
  {
    title: "13. Intellectual property rights",
    body: [
      "The trademark “Jasu Phones”, its logo, and any other product or service name or slogan on the Website are trademarks of Jasu Phones and its suppliers or licensors, and may not be copied, imitated or used without prior written permission. All other trademarks and company names belong to their respective owners.",
      "All intellectual property rights in the Products — designs, software, technology — are owned by Jasu Phones or its licensors. Purchase grants you no IP rights beyond using the Product for its intended purpose. Customers are prohibited from copying, reproducing, distributing or commercially exploiting Website content; reverse engineering software used on the Website; or framing/mirroring any part of the Website without written consent. Violations may result in account termination and civil and/or criminal action.",
    ],
  },
  {
    title: "14. Electronic communications",
    body: [
      "When you use the Website or send us emails or other communications, you consent to receive communications from us electronically. You agree that all agreements, notices, disclosures, and other communications provided electronically satisfy any legal requirement that such communications be in writing.",
    ],
  },
  {
    title: "15. Third-party links",
    body: [
      "The Website may contain links to third-party websites or services not owned or controlled by Jasu Phones. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services, and shall not be liable for damage or loss caused by reliance on them. Read the terms and privacy policies of any third-party websites you visit.",
    ],
  },
  {
    title: "16. Disclaimer of warranties",
    body: [
      "The Website and all information, content, materials, products (including software) and services are provided on an “as is” and “as available” basis, without representations or warranties of any kind, express or implied, unless otherwise specified in writing — including implied warranties of merchantability and fitness for a particular purpose. Jasu Phones does not warrant that the Website, its servers, or electronic communications are free of viruses or other harmful components.",
    ],
  },
  {
    title: "17. Force majeure",
    body: [
      "Jasu Phones shall not be liable for any failure or delay in performance caused by a Force Majeure Event — any event beyond our reasonable control, including acts of God, fire, flood, storm, civil commotion, riots, insurrection, war, terrorism, sabotage, acts of government, strikes, lock-outs, failure of telecommunications or transport networks, epidemics, pandemics, or any other event rendering performance impossible or impracticable.",
    ],
  },
  {
    title: "18. Limitation of liability",
    body: [
      "To the maximum extent permitted by applicable law, Jasu Phones, its proprietor, employees, agents, or affiliates shall not be liable for any indirect, punitive, incidental, special, consequential, or exemplary damages — including loss of profits, goodwill, use, or data — arising out of use of, or inability to use, the Website or Products. Aggregate liability in connection with any Order shall be limited to the value of the Product(s) purchased under that Order, regardless of the form of action.",
    ],
  },
  {
    title: "19. Indemnification",
    body: [
      "You agree to indemnify, defend, and hold harmless Jasu Phones, its proprietor, officers, directors, employees, agents, licensors, and suppliers from and against all losses, expenses, damages, and costs, including reasonable attorneys' fees, resulting from any violation of these Terms, breach of your representations and warranties, your use of the Website, or any activity related to your account.",
    ],
  },
  {
    title: "20. Applicable law and jurisdiction",
    body: [
      "These Terms shall be governed by and construed in accordance with the laws of India without reference to conflict of laws principles. Subject to the arbitration clause below, the courts in Mumbai, Maharashtra, shall have exclusive jurisdiction in any proceedings arising out of this agreement.",
    ],
  },
  {
    title: "21. Dispute resolution and arbitration",
    body: [
      "The parties shall first attempt to resolve any dispute through good faith negotiation. If unresolved within thirty (30) days, the dispute shall be submitted to mediation before a neutral third-party mediator in Mumbai. If unresolved within sixty (60) days of the appointment of a mediator, the dispute shall be finally resolved by arbitration under the Arbitration and Conciliation Act, 1996, by a sole arbitrator appointed by mutual consent (failing which, per the Act).",
      "The seat and venue of arbitration shall be Mumbai, Maharashtra, India; the language English. The award shall be final and binding, and judgment may be entered in any court of competent jurisdiction.",
    ],
  },
  {
    title: "22. Grievance redressal mechanism",
    body: [
      `In accordance with the Information Technology Act, 2000 and the Consumer Protection (E-Commerce) Rules, 2020: Grievance Officer — ${STORE.grievance.officer}, Customer Associate. Email: ${STORE.grievance.email}. Phone: ${STORE.grievance.phone}. Address: ${STORE.address}.`,
      "The Grievance Officer shall acknowledge your complaint within forty-eight (48) hours of receipt and shall endeavor to resolve it expeditiously, typically within thirty (30) days. Where additional time is required due to circumstances beyond the Company's reasonable control, you will be informed of the status and reasons for the delay.",
    ],
  },
  {
    title: "23. Waiver",
    body: [
      "The failure of Jasu Phones to exercise or enforce any right or provision of these Terms shall not constitute a waiver thereof. Any waiver must be in writing and signed by an authorized representative of Jasu Phones to be valid.",
    ],
  },
  {
    title: "24. Severability",
    body: [
      "If any provision of these Terms is determined to be unlawful, void, or unenforceable, that provision shall be severed and shall not affect the validity and enforceability of the remaining provisions.",
    ],
  },
  {
    title: "25. Entire agreement",
    body: [
      "These Terms, together with the Privacy Policy, Shipping Policy, Return, Refund, and Cancellation Policy, and any other legal notices published by us, constitute the entire agreement between you and Jasu Phones concerning the Website, superseding all prior or contemporaneous communications.",
    ],
  },
  {
    title: "26. Contact information",
    body: [
      `For any queries, concerns, or communications: Email — ${STORE.sales.email}. Phone — ${STORE.sales.phone}. Address — ${STORE.address}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <div>
      <PolicyHeader
        kicker="Our policies"
        title="Terms & Conditions"
        intro="Please read these Terms carefully before placing an order or using this website. By accessing this website or completing a purchase, you agree to be legally bound by these Terms. If you do not agree, do not use this website."
        facts={[
          { label: "Entity", value: "Sole proprietorship, registered in India" },
          { label: "All prices", value: "Indian Rupees (INR), tax inclusive" },
          { label: "Payments", value: "PCI-DSS compliant third-party gateways" },
          { label: "Jurisdiction", value: "Courts of Mumbai, Maharashtra" },
        ]}
      />
      <div className="container-x py-14 md:py-18">
        <div className="legal mx-auto max-w-3xl">
          {SECTIONS.map((s) => (
            <section key={s.title}>
              <h2>{s.title}</h2>
              <div className="clause">
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
