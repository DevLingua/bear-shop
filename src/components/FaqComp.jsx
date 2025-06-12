import Section from "./Section";

function FaqComp() {
  return (
    <Section
      sectionStyles={`px-10 mb-[2em] mt-30 text-2xl/normal`}
      headingStyles={`text-5xl font-bold mb-6 text-center`}
      showHeading={true}
      headingTitle={"Returns & FAQ"}
    >
      <div>
        <p>
          We want to make sure you love our products, and quality is guaranteed.
          If there is a print error or visible quality issue, we'll replace or
          refund it. For any quality issues, be sure to provide clear photos of
          the products on a flat, well-lit surface and include this in your
          email to us at <a href=""></a>{" "}
          <a
            className="text-purple"
            href="mailto:contact@support.pricklybearart.com"
          >
            contact@support.pricklybearart.com
          </a>
          . This quick and simple step will help us provide a speedy resolution.
          Because products are made to order, we do not accept general returns
          or sizing-related returns. Please read below for more details:
        </p>
      </div>
      <section className="my-6 flex flex-col gap-4">
        <h3 className="font-bold text-3xl">Cancellations:</h3>
        <div>
          <h5 className="font-bold mb-4">Product Orders Cancellation Policy</h5>
          <p>
            All of our products are made to order, especially for you. If you
            wish to cancel or amend your order, please use the link provided in
            your confirmation email. You can edit your order at any time before
            it goes to production. Once your order has gone to production, you
            may be eligible for a replacement/resolution, depending on the
            situation. After you’ve received your order, you have 30 days to
            address any quality issues.
          </p>
        </div>

        <div>
          <h5 className="font-bold mb-4">
            Donations and Tips Cancellation Policy
          </h5>
          <p>
            Please note that donations and tips are non-cancellable and
            non-refundable. Once you have completed your checkout for donations
            or tips, we cannot cancel or refund it.
          </p>
        </div>

        <div>
          <h5 className="font-bold mb-4">Damaged/Quality Issues</h5>
          <p>
            For the fastest resolution, please include a photograph
            demonstrating the quality issue of the print or the damaged area of
            the item, along with your order number. The most optimal pictures
            are on a flat surface, with the tag and error clearly displayed.
            Please email us with these details at{" "}
            <a
              className="text-purple"
              href="mailto:contact@support.pricklybearart.com"
            >
              contact@support.pricklybearart.com
            </a>
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h3 className="font-bold text-3xl">Refunds Policies</h3>

        <div>
          <h5 className="font-bold mb-4">Product Orders Cancellation Policy</h5>
          <p>
            Because products are made to order, we cannot issue refunds,
            returns, or exchanges for orders except for those with quality
            issues. Orders are non-refundable unless they meet these
            requirements and you provide support with a photograph demonstrating
            the quality issue. PayPal: Any refunds processed will show back up
            in your PayPal account balance within 24 business hours. Credit
            Card: Any refunds processed via your credit/debit card will show
            back up in your bank account within 7 to 10 business days, depending
            on your bank.
          </p>
        </div>

        <div>
          <h5 className="font-bold mb-4">
            Donations and Tips Cancellation Policy
          </h5>
          <p>
            Donations and tips are non-refundable. Once you have completed your
            checkout payment, we cannot cancel or refund your donation or tips.
          </p>
        </div>

        <div>
          <h5 className="font-bold mb-4">Locked Messages Refund Policy</h5>
          <p>
            Locked messages are non-refundable. Once you have completed your
            checkout payment, we cannot cancel or refund your locked message. If
            you have issues accessing the locked message after payment, please
            contact us at{" "}
            <a
              className="text-purple"
              href="mailto:contact@support.pricklybearart.com"
            >
              contact@support.pricklybearart.com
            </a>
            . We’ll be happy to troubleshoot the problem and find a resolution
            for you.
          </p>
        </div>
      </section>

      <section className="my-6 flex flex-col gap-4">
        <div>
          <h3 className="font-bold text-3xl mb-4">Accepted Payment Methods</h3>
          <p>
            We accept payments via credit/debit cards, PayPal, Google Pay, Apple
            Pay, and depending on your location, we also accept Klarna/AfterPay
            and local payment methods.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-3xl mb-4">International Orders</h3>
          <p>
            Will I have to pay any additional taxes on my order if I’m located
            outside of the US? International orders may be subject to import
            taxes, duties, and other customs charges. The charges vary by
            country, and at this time, we are unable to calculate them in
            advance. For more information regarding your country’s customs
            policies, please contact your local customs office. If such a fee
            indeed gets imposed on your package, you are responsible for its
            payment.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-3xl mb-4">Merchant of record</h3>
          <p>
            Orders are handled by our Merchant of Record and merchandising
            partner, Fourthwall.com, who handle order-related inquiries and
            returns. Privacy Policy Terms of Service.
          </p>
        </div>
      </section>
    </Section>
  );
}

export default FaqComp;
