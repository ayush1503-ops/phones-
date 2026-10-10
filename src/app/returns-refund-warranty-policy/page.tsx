import type { Metadata } from "next";
import { PolicyHeader } from "@/components/policy-header";
import { ReturnsForm } from "@/components/returns-form";
import { STORE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Returns, Refund & Warranty Policy",
  description:
    "Dumbphones India returns, refund and warranty policy — 7-day return/refund for company-attributable faults, 15-day replacement window, mandatory unboxing evidence, and the official request form.",
};

export default function ReturnsPolicyPage() {
  return (
    <div>
      <PolicyHeader
        kicker="Our policies"
        title="Returns, Refund & Warranty Policy"
        intro="This Policy outlines the terms under which Dumbphones India processes refunds, returns and replacements. It is designed to be transparent, fair, and compliant with the applicable laws of India, and must be read together with our Shipping Policy — especially the mandatory evidence requirements of Clause 7."
        facts={[
          { label: "Days 0–7", value: "Return / replacement & refund for company-attributable faults" },
          { label: "Days 8–15", value: "Replacement / exchange for verified manufacturing defects" },
          { label: "Refund window", value: "7–10 business days after inspection & acceptance" },
          { label: "Always required", value: "Sealed-box photo + continuous unboxing video" },
        ]}
      />
      <div className="container-x py-14 md:py-18">
        <div className="legal mx-auto max-w-3xl">
          <h2>1. Preamble and scope</h2>
          <div className="clause">
            <p>1.1 This Policy outlines the terms and conditions under which Dumbphones India (hereinafter referred to as the “Company”, “we”, “us”, or “our”) shall process requests for refunds, returns, and replacements for products purchased through our official e-commerce website. This Policy is designed to be transparent, fair, and compliant with the applicable laws of India.</p>
            <p>1.2 This Policy must be read in conjunction with our Shipping Policy and Terms of Service. In particular, this Policy is contingent upon the mandatory adherence by the purchaser (hereinafter referred to as the “Customer” or “you”) to the conditions stipulated in <strong>Clause 7 of the Shipping Policy</strong>, which requires the provision of photographic and videographic evidence upon receipt and unboxing of the product.</p>
            <p>1.3 This Policy shall apply exclusively to instances where the reason for the return, refund, or replacement is directly and verifiably attributable to a fault on the part of the Company. Such instances include, but are not limited to, the dispatch of a technically defective product, delivery of an incorrect product, or damage sustained during transit where the Company&apos;s designated courier partner was used.</p>
          </div>

          <h2>2. General conditions for eligibility</h2>
          <div className="clause">
            <p>2.1 A request for a refund, return, or replacement shall be considered eligible only if the Customer satisfies all of the following conditions without exception:</p>
            <p>2.1.1 The product was purchased directly from the official Dumbphones India website. Proof of purchase, such as the original invoice and order confirmation email, must be furnished upon request.</p>
            <p>2.1.2 The Customer has strictly complied with the mandatory evidence requirements as detailed in Clause 7 of the Shipping Policy, specifically: (a) a clear photograph of the sealed outer packaging at the moment of delivery, before it is opened; (b) a continuous, unedited, and uninterrupted unboxing video, which must commence before the package seal is broken and clearly display the unboxing process and the product(s) contained therein.</p>
            <p>2.1.3 The product is returned in its original and unused condition, accompanied by all original accessories, manuals, warranty cards, and any bundled items or promotional materials.</p>
            <p>2.1.4 The product is returned in its original packaging, including all protective materials, to prevent damage during return transit.</p>
            <p>2.2 The Company reserves the absolute right to reject any claim for refund, return, or replacement if the Customer fails to comply with any of the conditions stipulated in this Policy or the Shipping Policy.</p>
          </div>

          <h2>3. Return, refund and replacement policy: within seven (7) days of delivery</h2>
          <div className="clause">
            <p>3.1 In the event of a fault attributable to the Company, the Customer is entitled to a replacement/return and refund of the product, provided the request is initiated or raised via the official email or website of the company — the discretion of which is solely with Dumbphones India — within seven (7) calendar days from the date of delivery.</p>
            <p>3.2 To avail this, the Customer must provide the mandatory photographic and videographic evidence as stipulated in Clause 1.2. Upon successful verification of the evidence and the reported issue, the Company shall process the replacement/refund and return.</p>
            <p>3.3 The onus of re-shipping of the product shall be on the customer in accordance to their convenience, as long as a request for return/refund or replacement has been initiated or raised via the official company email or website within the stipulated period of 7 days. Any damages to the product arising during the process of re-shipping are to be borne by the customer wholly and solely. Dumbphones India shall not be held liable and has no responsibility for the same. Upon receipt and inspection of the returned product at our facility to confirm its condition and the veracity of the claim, a new replacement unit shall be dispatched to the Customer.</p>
            <p>3.4 In the event that an identical model is out of stock or unavailable for replacement, the Company may, at its discretion, offer the Customer: (a) a functionally equivalent product of equal or greater value; or (b) a full refund in accordance with Clause 5 of this Policy.</p>
          </div>

          <h2>4. Replacement policy: post seven (7) days of delivery</h2>
          <div className="clause">
            <p>4.1 After the expiry of the initial seven (7) day period but before the expiry of a fifteen (15) day period, the Company shall only consider requests for replacement/exchange of product in cases of genuine and verifiable technical or manufacturing defects that are not attributable to customer misuse, negligence, or physical damage.</p>
            <p>4.2 The Customer must raise a request or initiate a request for replacement post the seven (7) day period but before the expiry of the fifteen (15) day period via the official company email or website — the discretion of which is solely with Dumbphones India. Upon the initiation of the same, a representative of Dumbphones India shall reach out to the customer with regards to the possible exchange/replacement.</p>
            <p>4.3 The onus of re-shipping of the product shall be on the customer in accordance to their convenience, as long as a request for replacement has been initiated or raised via the official company email or website within the fifteen (15) day period. Any damages to the product arising during the process of re-shipping are to be borne by the customer wholly and solely. Dumbphones India shall not be held liable and has no responsibility for the same.</p>
            <p>4.4 The decision to accept and issue a replacement/exchange after seven (7) days but before the expiry of a fifteen (15) day period shall rest solely and absolutely with the Company. The Company shall conduct a thorough technical inspection and diagnostic check of the to-be-replaced/exchanged product to ascertain the nature and cause of the defect.</p>
            <p>4.5 If the technical issue is verified and deemed to be a manufacturing defect, the Company, at its sole discretion, may elect to: (a) repair the product and return it to the Customer; (b) provide a replacement unit.</p>
            <p>4.6 The replacement/exchange, if approved, shall be processed only after the product has been received and the technical verification process is completed by the Company&apos;s team.</p>
          </div>

          <h2>5. Refund process and timelines</h2>
          <div className="clause">
            <p>5.1 All approved refunds shall be credited directly to the original payment source (bank account, credit/debit card, or digital wallet) used by the Customer at the time of purchase. No requests for refund to an alternative account shall be entertained.</p>
            <p>5.2 The refund shall be initiated by the Company only upon the physical receipt, inspection, and acceptance of the returned product at our designated facility.</p>
            <p>5.3 The Company shall process the refund within seven (7) to ten (10) business days from the date of acceptance of the returned product. The Customer acknowledges that the time taken for the amount to reflect in their account may vary depending on the policies of their bank or payment gateway, for which the Company shall not be held liable.</p>
            <p>5.4 Unless the fault is unequivocally attributable to the Company, any shipping charges, handling fees, or convenience fees paid at the time of purchase are non-refundable.</p>
          </div>

          <h2>6. Procedure for initiating a request</h2>
          <div className="clause">
            <p>6.1 To initiate any request for a refund, return, or replacement, the Customer must fill the form provided on the website (below on this page).</p>
            <p>6.2 The customer must select the type of request they are making via the Request Type option.</p>
            <p>6.3 The customer is then to incorporate their order number, product name, and their personal details, which include but are not limited to full name, mobile number and email address. After which a reasoning for initiating said request is to be given along with a picture of the product and a description of the issue being faced by the customer.</p>
            <p>6.4 Any request submitted without the complete and mandatory evidence as required herein shall be deemed incomplete and may be summarily rejected by the Company.</p>
          </div>

          <h2>7. Exclusions and limitations</h2>
          <div className="clause">
            <p>7.1 This Policy shall not be applicable in the following circumstances:</p>
            <ul>
              <li>(a) Damage or defects arising from customer negligence, misuse, improper handling, unauthorized repairs, or modifications.</li>
              <li>(b) Damage caused by liquid spillage, exposure to extreme temperatures, accidental drops, or any other form of physical abuse.</li>
              <li>(c) Issues arising from normal wear and tear or cosmetic imperfections that do not impact the functionality of the product.</li>
              <li>(d) Any claim where the serial number or IMEI number of the returned product does not match the records of the product dispatched by the Company.</li>
              <li>(e) Any loss of personal data stored on the device. The Customer is solely responsible for backing up and erasing all personal data before returning the product.</li>
            </ul>
            <p>7.2 The Company reserves the right to take appropriate legal action against any Customer found to be making fraudulent, misleading, or abusive claims, including but not limited to false claims of non-delivery, empty box receipt, or product tampering.</p>
          </div>

          <h2>8. Governing law and jurisdiction</h2>
          <div className="clause">
            <p>8.1 This Policy shall be governed by and construed in accordance with the laws of India.</p>
            <p>8.2 Any disputes arising out of or in connection with this Policy shall be subject to the exclusive jurisdiction of the competent courts in Mumbai, Maharashtra.</p>
          </div>

          <h2>9. Amendment</h2>
          <div className="clause">
            <p>9.1 Dumbphones India reserves the right to amend, modify, or update this Refund and Return Policy at any time without prior notice. The revised Policy will be effective from the date of its publication on our website.</p>
          </div>

          <h2>10. Grievance cell</h2>
          <div className="clause">
            <p>The Grievance Officer shall acknowledge your complaint within forty-eight (48) hours of receipt and shall endeavor to resolve it expeditiously, typically within a period of thirty (30) days from the date of its receipt. We are committed to providing a fair and transparent mechanism for grievance redressal. Where additional time is required due to circumstances beyond the Company&apos;s reasonable control, the customer shall be informed of the status and reasons for the delay.</p>
            <p>
              <strong>Grievance Officer:</strong> {STORE.grievance.officer}<br />
              <strong>Email:</strong> <a href={`mailto:${STORE.grievance.email}`}>{STORE.grievance.email}</a> ·{" "}
              <strong>Contact:</strong> {STORE.grievance.phone}
            </p>
          </div>
        </div>

        {/* Request form — Clause 6 */}
        <div className="mx-auto mt-16 max-w-3xl border border-line bg-cream p-7 md:p-10">
          <p className="kicker">Clause 6 — official request form</p>
          <h2 className="mt-2 font-display text-3xl text-ink">Initiate a return, refund or replacement</h2>
          <p className="mt-3 text-[0.88rem] leading-[1.75] text-mute">
            Submit the details below and our team will reach out. Requests submitted without the
            mandatory sealed-box photo and continuous unboxing video may be rejected as incomplete,
            per Clause 6.4.
          </p>
          <div className="mt-7">
            <ReturnsForm />
          </div>
        </div>
      </div>
    </div>
  );
}
