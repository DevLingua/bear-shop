import Section from "./Section";

function ContactComp() {
  return (
    <Section
      sectionStyles={`px-10 mb-[2em] mt-35`}
      headingStyles={`text-5xl font-bold mb-6 text-center`}
      showHeading={true}
      headingTitle={"Contact"}
    >
      <div className="text-2xl/normal mt-8">
        <p className="text-center">
          For all store inquiries, contact{" "}
          <a className="text-purple" href="mailto:contact@support.pricklybearart.com">
            contact@support.pricklybearart.com
          </a>{" "}
        </p>
      </div>
    </Section>
  );
}

export default ContactComp;
