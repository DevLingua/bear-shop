import Section from "../Section";

function NewsLetter() {
  return (
    <Section
      sectionStyles={`px-10 mb-[2em] sm:px-15`}
      headingStyles={`text-4xl/snug font-bold mb-6 capitalize xs:text-5xl/tight md:flex md:item-center md:justify-center mb-10`}
      showHeading={true}
      headingTitle={"Join the Fandom Fun – Get Exclusive Perks!"}
    >
      <div className="w-full max-w-4xl mx-auto">
        <p className="font-light text-2xl/snug opacity-45 text-center sm:text-3xl/tight">
          Love witty mashups, deep-cut references, and sarcastic humor? Be the
          first to snag new designs and score exclusive discounts on
          fandom-inspired merch. No spam—just the good stuff, once a month or on
          special occasions!
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-8 mt-6 w-full max-w-4xl mx-auto xs:flex-row sm:mt-8">
        <input type="email" className="border-1 border-purple rounded-[.5rem] px-5 py-3 sm:py-5 md:flex-2" placeholder="Email Address" />
        <button className="text-2xl flex-2 bg-purple rounded-[.5rem] text-white px-6 py-4 cursor-pointer sm:text-2xl sm:py-6 md:flex-1">Sign me up</button>
      </div>
    </Section>
  );
}

export default NewsLetter;
