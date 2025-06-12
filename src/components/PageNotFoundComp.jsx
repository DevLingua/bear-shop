import mascotImg from "/Mascot_Poses_404_Page_Not_Found.png";
import Section from "./Section";
import { useNavigate } from "react-router-dom";

function PageNotFoundComp() {
  const navigate = useNavigate()
  return (
    <Section
      sectionStyles={`px-10`}
      headingStyles={``}
      showHeading={false}
      headingTitle={"Oops!"}
    >
      <article className="min-h-screen gap-4 flex items-center flex-col justify-center">
        <div>
          <h1 className="text-5xl font-bold">Oops!</h1>
        </div>
        <div className="flex flex-col gap-4 items-center text-center">
          <p className="text-2xl font-medium max-w-xl text-center">
            The page you’re looking for isn’t here — and our mascot is
            just as puzzled.
          </p>
          <img
            src={mascotImg}
            className="w-85 h-85 mb-4"
            alt="Page Not Found Image"
          />
          <button onClick={()=> navigate("/all-products")} className="bg-purple px-4 py-4 cursor-pointer text-white rounded-[0.5rem]">
            Shop Now
          </button>
        </div>
      </article>
    </Section>
  );
}

export default PageNotFoundComp;
