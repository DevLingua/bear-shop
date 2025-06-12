import Section from "./Section";

function AboutComp() {
  return (
    <Section
      sectionStyles={`px-10 mb-[2em] mt-50`}
      headingStyles={`text-3xl font-bold mb-6`}
      showHeading={true}
      headingTitle={"🐻🌵 Welcome to Prickly Bear!"}
    >
      <div className="flex flex-col text-2xl/normal gap-4">
        <p>
          At <strong className="text-purple">Prickly Bear</strong>, we believe
          fandoms are a way of life—and they should be celebrated with{" "}
          <strong className="text-purple">
            style, humor, and a little bit of chaos
          </strong>
          . If you've ever thought, "Why doesn't this musical villain have a
          crossover with my favorite TV show?" or "I need a t-shirt that only
          true fans will get," then you’re in the right place. We started this
          journey because we were{" "}
          <strong className="text-purple">
            tired of boring, predictable merch
          </strong>
          . We wanted designs we would actually want to buy—ones that are{" "}
          <strong className="text-purple">
            witty, sarcastic, and full of deep-cut references
          </strong>{" "}
          that only the most dedicated fans will recognize.
          <strong className="text-purple">
            Whether it’s a hilarious mashup, a dark-humored take on pop culture,
            or an inside joke only theater nerds will appreciate, we’ve got
            something for you
          </strong>
          . At Prickly Bear Art, we don’t just create designs—we create
          conversation starters for fandom lovers like you.
        </p>

        <p>
          👕 What We Make: Stickers, t-shirts, and more—perfect for expressing
          your fandom in the quirkiest way possible.
        </p>
        <p>
          🎭 Join the Fun: Follow us on Instagram for sneak peeks, fandom
          debates, and the occasional random existential crisis over which
          fictional character we’d die for.
        </p>
        <p>🛍️ Shop now & wear your fandom proudly!</p>
      </div>
    </Section>
  );
}

export default AboutComp;
