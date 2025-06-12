import { forwardRef, useEffect } from "react";

const Section = forwardRef(function Section(
  { showHeading, sectionStyles, headingStyles, headingTitle, children, setIsSticky }, // optional
  ref
) {
  useEffect(() => {
    if (!setIsSticky) return; // 🚫 Do nothing if not passed

    const el = ref?.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { root: null, threshold: 0.3 }
    );

    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [ref, setIsSticky]);

  return (
    <section ref={ref} className={sectionStyles}>
      {showHeading && (
        <div className={headingStyles}>
          <h2>{headingTitle}</h2>
        </div>
      )}
      {children}
    </section>
  );
});

export default Section;
