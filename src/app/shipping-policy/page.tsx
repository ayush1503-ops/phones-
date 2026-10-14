import type { Metadata } from "next";
import { PolicyHeader } from "@/components/policy-header";
import { STORE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description:
    "Jasu Phones shipping policy — India-only delivery, free shipping on prepaid orders, ₹599 non-refundable COD confirmation fee, WhatsApp tracking and mandatory unboxing evidence.",
};

export default function ShippingPolicyPage() {
  return (
    <div>
      <PolicyHeader
        kicker="Our policies"
        title="Shipping Policy"
        intro="This Shipping Policy outlines the terms governing shipment and delivery of products purchased from Jasu Phones, a sole proprietorship registered in India. By placing an order, you agree to be bound by these shipping conditions."
        facts={[
          { label: "Delivery area", value: "India only — no international shipping" },
          { label: "Prepaid orders", value: "Free shipping, no delivery charges" },
          { label: "COD orders", value: "₹599 non-refundable confirmation & handling fee" },
          { label: "Delivery aim", value: "Within 48 hrs of orders placed by 5 PM" },
        ]}
      />
      <div className="container-x py-14 md:py-18">
        <div className="legal mx-auto max-w-3xl">
          <h2>1. Applicability and delivery locations</h2>
          <div className="clause">
            <p>1.1 This Shipping Policy applies to all purchases made through Jasu Phones.</p>
            <p>1.2 Jasu Phones exclusively delivers products within the geographical boundaries of India. We do not offer international shipping or delivery services to any foreign countries.</p>
            <p>1.3 All orders placed must have a valid Indian shipping address. Orders with international shipping addresses will be automatically cancelled.</p>
          </div>

          <h2>2. Order processing and delivery framework</h2>
          <div className="clause">
            <p><strong>2.1 Order Confirmation:</strong> Upon successful placement of an order and completion of payment, you will receive an order confirmation via email and/or SMS/registered WhatsApp number to your registered contact details. This confirmation signifies that your order has been received and is being processed.</p>
            <p><strong>2.2 Packaging:</strong> Once confirmed, your product will undergo a thorough quality check and be securely packaged to prevent damage during transit. We ensure that all products are packed in tamper-evident packaging.</p>
            <p><strong>2.3 Dispatch and Out for Delivery:</strong> After packaging, your order will be handed over to our logistics partner. Before dispatch, a picture/video of the packaged or unpackaged parcel will be shared via our official WhatsApp number along with tracking details for the said order. You will receive a notification when your order is “Out for Delivery,” indicating that it has left our facility and is en-route to your specified delivery address.</p>
            <p><strong>2.4 Final Delivery:</strong> Our logistics partner will attempt to deliver the product to the shipping address provided by you. Delivery will be completed upon successful handover of the product to the recipient or an authorized person at the delivery address. Jasu Phones aims to provide delivery of those products the order for which has been placed by 5 PM within the next 48 hours of the order being placed. However, delays due to unforeseen circumstances may occur. The aforementioned delivery time is a mere estimate and not binding.</p>
          </div>

          <h2>3. Shipping charges</h2>
          <div className="clause">
            <p><strong>3.1</strong> No delivery charges shall be applicable to prepaid orders. For Cash on Delivery (COD) orders, a non-refundable partial confirmation and handling fee of <strong>₹599/-</strong>, or such other amount as may be applicable to a specific product and communicated at the time of purchase, shall be payable in advance. Such amount shall be non-refundable under any circumstances unless expressly stated otherwise by the Company. The exact confirmation/handling charges will be displayed at the time of checkout before you confirm your purchase for Cash on Delivery orders. It is pertinent to note that Jasu Phones does not charge any customs clearance amount and does not create any other hidden charges. Apart from the sale price, Jasu Phones does not charge any other amount except a confirmation/handling charge which is non-refundable under any circumstances for COD orders.</p>
            <p><strong>3.2</strong> These convenience and handling charges are non-refundable under any circumstances. This includes, but is not limited to, cases of product return, product cancellation after the product has been packaged, or after the product has been dispatched and is “Out for Delivery.” The non-refundable nature of shipping charges covers the costs incurred by the Company for logistics and handling up to the point of dispatch.</p>
          </div>

          <h2>4. Tracking your order</h2>
          <div className="clause">
            <p><strong>4.1</strong> To ensure transparency and convenience, consumers or purchasers can easily track their product or order. A tracking link will be sent to your registered WhatsApp number once the order has been dispatched. This link will provide real-time updates on the status and location of your shipment.</p>
            <p><strong>4.2</strong> It is the customer&apos;s responsibility to ensure that the registered WhatsApp number is accurate and active to receive tracking updates.</p>
          </div>

          <h2>5. Courier and logistics partners</h2>
          <div className="clause">
            <p><strong>5.1</strong> Jasu Phones partners with reputed and reliable courier and logistics services to ensure efficient and safe delivery of your products.</p>
            <p><strong>5.2</strong> While we strive for timely deliveries, Jasu Phones shall not be liable for any delays caused by our courier partners due to unforeseen circumstances, operational issues, or external factors beyond our direct control. We will, however, assist in coordinating with the courier partner to resolve any such delays.</p>
          </div>

          <h2>6. Incorrect/incomplete address and delivery failures</h2>
          <div className="clause">
            <p><strong>6.1 Customer Responsibility for Address Accuracy:</strong> Customers are solely responsible for providing complete and accurate shipping details, including the correct address, landmark, and contact number, at the time of placing the order. Any errors or omissions in the shipping information can lead to delivery complications.</p>
            <p><strong>6.2 Non-Delivery Due to Incorrect Address:</strong> In case of an incorrect or incomplete address provided by the customer, Jasu Phones shall not be liable for the non-delivery of the product. Upon the occurrence of such a situation the order will be returned to origin; in case of RTO the cost of re-shipment is to be borne by the Buyer. Jasu Phones shall not bear the cost of re-delivery and re-shipping in any circumstances except those which may be exceptional in nature.</p>
            <p><strong>6.3 Return to Origin (RTO) and Re-shipment:</strong> If an order is returned to us due to reasons attributable to an incorrect address, unavailability of the recipient, or refusal to accept delivery (hereinafter referred to as “RTO”), the customer may request re-shipment. Such re-shipment will be subject to the payment of additional shipping charges by the customer. Jasu Phones only provides free shipping and delivery for the initial shipping. The cost of shipping or delivery is to be borne by the buyer in the case of re-shipment.</p>
            <p><strong>6.4 Refunds for RTO Orders:</strong> In instances where a refund is applicable for an RTO order, it shall be processed only with the sale amount being refunded to the buyer. However the confirmation/handling charge created for COD orders shall not be refunded under any circumstances. The Company reserves the right to deduct any additional costs incurred due to the RTO process.</p>
            <p><strong>6.5 Proof of Delivery:</strong> Where the tracking status indicates successful delivery, Jasu Phones shall rely on the proof of delivery (including but not limited to OTP confirmation, recipient&apos;s signature, or photographic evidence) provided by the logistics partner. This proof shall be considered conclusive evidence of delivery.</p>
            <p><strong>6.6 Claims of Non-Receipt:</strong> Any claim of non-receipt of a product, despite the tracking status showing successful delivery, must be reported to Jasu Phones within 24–48 hours of the delivery status being updated. The Company shall initiate an investigation with the courier partner; however, it shall not be liable for claims where valid proof of delivery is established by the logistics partner.</p>
            <p><strong>6.7 Finality of Delivery Proof:</strong> The Company shall not be liable for delivery failures arising due to incorrect address, unavailability of the recipient, or refusal to accept delivery. In the event the shipment is returned to origin (RTO), the customer shall bear the cost of re-shipping. Where delivery is marked complete based on courier proof (OTP/signature/photo), the same shall be treated as final and binding, unless proven otherwise by compelling evidence from the customer.</p>
          </div>

          <h2>7. Customer responsibilities upon delivery</h2>
          <div className="clause">
            <p><strong>7.1 Mandatory Picture of the Box:</strong> To safeguard against potential issues such as transit loss, courier theft, tampering during transit, fake non-delivery complaints, wrong address disputes, and courier liability disputes, the consumer or purchaser is mandatorily required to click a clear picture of the product packaging box <em>upon</em> receiving it from the delivery person or courier executive. This picture should clearly show the condition of the outer packaging. The picture has to be maintained with the consumer in their cloud or electronic device and is to be shared with Jasu Phones upon the arising of any dispute with regards to shipping and for the purpose of refund, return and exchange/replacement.</p>
            <p><strong>7.2 Mandatory Videography of Unboxing:</strong> To avoid disputes related to an empty box, receipt of a wrong product, or a damaged product and easement in return process if the same may arise, the consumer or purchaser must mandatorily record a continuous video of the unboxing process. This video must commence from the opening of the sealed package and clearly show the products inside the box without any cuts or edits. This videography serves as crucial evidence in case of any discrepancy. The video has to be maintained with the consumer in their cloud or electronic device and is to be shared with Jasu Phones upon the arising of any dispute with regards to shipping and for the purpose of refund, return and exchange/replacement.</p>
            <p><strong>7.3</strong> Failure to adhere to these mandatory conditions (7.1 and 7.2) may significantly impact the Company&apos;s ability to investigate and resolve any claims of transit damage, missing items, or incorrect products, and may lead to the rejection of such claims.</p>
          </div>

          <h2>8. Force majeure</h2>
          <div className="clause">
            <p><strong>8.1</strong> Jasu Phones shall not be held responsible or liable for any failure or delay in the performance of its obligations under this Shipping Policy, including delivery of products, if such failure or delay is caused by events beyond its reasonable control (“Force Majeure Event”).</p>
            <p><strong>8.2</strong> Force Majeure Events include, but are not limited to, acts of God (such as floods, earthquakes, storms, natural disasters), war, hostilities, invasion, rebellion, revolution, insurrection, military or usurped power, civil war, acts of terrorism, riots, civil commotion, strikes, lockouts, industrial disputes, epidemics, pandemics, government restrictions, embargoes, fire, explosion, breakdown of plant or machinery, or any other cause beyond the reasonable control of Jasu Phones.</p>
            <p><strong>8.3</strong> In the event of a Force Majeure Event, Jasu Phones will make reasonable efforts to notify affected customers and resume performance as soon as practicable.</p>
          </div>

          <h2>9. Governing law and jurisdiction</h2>
          <div className="clause">
            <p><strong>9.1</strong> This Shipping Policy and all transactions conducted through Jasu Phones shall be governed by and construed in accordance with the laws of India.</p>
            <p><strong>9.2</strong> Any disputes arising out of or in connection with this policy shall be subject to the exclusive jurisdiction of the courts in Mumbai, India.</p>
          </div>

          <h2>10. Amendments to the policy</h2>
          <div className="clause">
            <p><strong>10.1</strong> Jasu Phones reserves the right to modify or update this Shipping Policy at any time without prior notice. Any changes will be effective immediately upon posting on our website. Customers are encouraged to review this policy periodically for any updates.</p>
          </div>

          <h2>11. Dispute resolution / ADR clause</h2>
          <div className="clause">
            <p>In the event of any dispute, controversy, claim, or difference arising out of or relating to the present transaction, purchase, services, terms and conditions, or any related matter, the Consumer and the Company shall, prior to initiating any proceedings before any competent Court, Tribunal, or Authority, first attempt to resolve the dispute through Alternate Dispute Resolution (“ADR”) mechanisms, including Negotiation, Mediation, Conciliation, and Arbitration.</p>
            <p>The parties shall initially endeavour to resolve the dispute amicably through mutual negotiations. If the dispute is not resolved within a reasonable period, the parties may refer the matter to Mediation or Conciliation in accordance with applicable laws.</p>
            <p>In the event the dispute remains unresolved through the aforesaid ADR mechanisms, the same shall be referred to Arbitration in accordance with the provisions of the Arbitration and Conciliation Act, 1996, including any statutory modifications or re-enactments thereof. The Arbitration shall be conducted by a Sole Arbitrator appointed in accordance with the provisions of the said Act. The seat and venue of Arbitration shall be Mumbai, Maharashtra, India. The arbitration proceedings shall be conducted in the English language.</p>
            <p>Subject to the above, the Courts at Mumbai shall have exclusive jurisdiction in relation to matters arising out of or connected with the arbitration proceedings and enforcement of the arbitral award.</p>
          </div>

          <h2>12. Contact information</h2>
          <div className="clause">
            <p><strong>Email:</strong> <a href={`mailto:${STORE.sales.email}`}>{STORE.sales.email}</a><br />
            <strong>Phone:</strong> <a href={`tel:${STORE.sales.phoneHref}`}>{STORE.sales.phone}</a><br />
            <strong>Address:</strong> {STORE.address}</p>
          </div>

          <h2>13. Grievance cell</h2>
          <div className="clause">
            <p>The Grievance Officer shall acknowledge your complaint within forty-eight (48) hours of receipt and shall endeavor to resolve it expeditiously, typically within a period of thirty (30) days from the date of its receipt. We are committed to providing a fair and transparent mechanism for grievance redressal. Where additional time is required due to circumstances beyond the Company&apos;s reasonable control, the customer shall be informed of the status and reasons for the delay.</p>
            <p>
              <strong>Grievance Officer:</strong> {STORE.grievance.officer}<br />
              <strong>Email:</strong> <a href={`mailto:${STORE.grievance.email}`}>{STORE.grievance.email}</a><br />
              <strong>Contact:</strong> <a href={`tel:${STORE.grievance.phone.replace(/\s/g, "")}`}>{STORE.grievance.phone}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
