import GlobeIconOne from "/globe-icon.png";
import SecureCheckOutIcon from "/Secure_Checkout.png";
import OnlineSupport from "/online-support.png";
import QualityGuarantee from "/Quality_Guarantee.png";
import EasyReturns from "/Easy_Returns.png";
import Section from "../Section";

const whyShopWithUsData = [
  {
    heading: "Worldwide Shipping",
    paragraph: "Fast global delivery — wherever you are.",
    icon: GlobeIconOne,
  },
  {
    heading: "Secure Checkout",
    paragraph: "Safe payments, trusted methods — shop with confidence.",
    icon: SecureCheckOutIcon,
  },
  {
    heading: "24/7 Support",
    paragraph: "Questions? Our Help Center is always open.",
    icon: OnlineSupport,
  },
  {
    heading: "Quality Guarantee",
    paragraph: "Crafted with care using premium materials.",
    icon: QualityGuarantee,
  },
  {
    heading: "Easy Returns",
    paragraph: "Simple, hassle-free returns within 30 days.",
    icon: EasyReturns,
  },
];

function TrustedSection() {
  return (
    <Section
      sectionStyles={`px-10 mb-[2em] sm:px-15 md:mb-[4em]`}
      headingStyles={`text-4xl/snug capitalize font-bold mb-6 xs:text-5xl/tight md:flex md:item-center md:justify-center mb-10`}
      showHeading={true}
      headingTitle={"Why Shop With Prickly bear"}
    >

      <menu className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {whyShopWithUsData.map((data) => (
          <li className="bg-[#f0f0fe1f] px-8 py-5 rounded-[0.5rem] xs:py-6" key={data.heading}>
            <div className="flex justify-center items-center text-center">
              <img src={data.icon} alt="" className="w-12 h-full object-cover" />
            </div>
            <div className="mt-3 flex flex-col gap-2 xs:gap-3">
              <h5 className="text-2xl text-center font-bold xs:text-[1.7rem] ">{data.heading}</h5>
              <p className="text-xl/snug text-center xs:text-2xl">{data.paragraph}</p>
            </div>
          </li>
        ))}
      </menu>
    </Section>
  );
}

export default TrustedSection;
