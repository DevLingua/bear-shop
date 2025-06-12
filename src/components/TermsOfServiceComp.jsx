import Section from "./Section";

function TermsOfServiceComp() {
  return (
    <Section
      sectionStyles={`px-10 mb-[2em] mt-35`}
      headingStyles={`text-5xl font-bold mb-6 text-center`}
      showHeading={true}
      headingTitle={"Terms of service"}
    >
      <div>
        <p>
          Welcome to Prickly Bear Art | Fandom Mashups & Pop Culture Humor
          Designs (“Creator,” “we,” or “us”). These Terms of Service are a
          legally binding agreement between you and us regarding your use of our
          website (https://pricklybearart.com), provided via Fourthwall (the
          “Service”).
        </p>
      </div>

      <section>
        <h3>PLEASE READ THE FOLLOWING TERMS CAREFULLY.</h3>
      </section>
    </Section>
  );
}

export default TermsOfServiceComp;
