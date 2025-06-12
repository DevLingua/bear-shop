import Section from "../Section";
import heroImgOne from "/hero-one.webp";
import heroImgTwo from "/hero-two.webp";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useNavigate } from "react-router-dom";
import heroPlant from "/hero-plant.png";
import { useRef } from "react";
import { useSticky } from "../../context/StickyContext";
const emblaImg = [heroImgOne, heroImgTwo];

function Hero() {
  const [emblaRef] = useEmblaCarousel({ loop: false }, [
    Autoplay({ delay: 3000 }),
  ]);
  const navigate = useNavigate();
  const triggerSectionRef = useRef(null);
  const { setIsSticky } = useSticky();
  return (
    <Section
      sectionStyles={`px-10 mb-[2em] mt-12 sm:px-15 md:mb-[4em]`}
      showHeading={false}
      ref={triggerSectionRef}
      setIsSticky={setIsSticky}
    >
      <div className="flex flex-col gap-6 md:flex-row md:gap-8 xl:gap-12">
        <div className="md:flex-[2.5] md:flex md:flex-col md:items-center md:justify-center">
          <h1 className="font-extrabold text-[2.8rem]/snug mb-4 xs:text-6xl/tight sm:text-8xl/snug md:text-7xl/tight lg:text-8xl/tight lg:mb-8 xl:text-9xl">
            For <span className="text-purple">Fans</span> Who Love a Little{" "}
            <span className="text-purple">Chaos</span>
          </h1>

          <div className="w-full  xl:mt-4">
            <button
              onClick={() => navigate("all-products")}
              className="bg-purple px-8 py-4 rounded-lg w-full text-white capitalize cursor-pointer transition-transform duration-300 hover:scale-95 sm:py-6 xl:max-w-xl"
            >
              Shop now
            </button>
          </div>
        </div>

        <div className="md:flex-[2]">
          <div className="absolute w-20 z-10">
            <img src={heroPlant} alt="" />
          </div>
          <div className="overflow-hidden" ref={emblaRef}>
            <ul className="flex">
              {emblaImg.map((img, index) => (
                <li className="flex-[0_0_100%] min-w-0" key={index}>
                  <div>
                    <img src={img} alt="Hero Image" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Hero;
