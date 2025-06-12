import Section from "../Section";

// compressed images

import HomeLivingImgTransformed from "/home-living-transformed.png";
import apparelImgTransformed from "/apparel-transformed.png";
import officeTechImgTransformed from "/office-tech-transformed.png";
import stickerSmallImgTransformed from "/stickers-small-gifts-transformed.png";
import musicalTheatreImgTransformed from "/musical-theater-transformed.png";
import moviesTvImgTransformed from "/movies-tv-parodies-transformed.png";

// normal images

import musicalTheatre from "/musical.png";
import homeLiving from "/home-living.png";
import movies from "/movies.png";
import office from "/office.png";
import stickers from "/stickers.png";
import apparel from "/apparel.png";
import { Link } from "react-router";
import SectionLazyImage from "../SectionLazyImage";
import { useRef } from "react";

const collectionData = [
  {
    collectionName: "Apparel",
    path: "apparel",
    imgurl: apparel,
    placeholder: apparelImgTransformed,
  },
  {
    collectionName: "sticker & small gifts",
    path: "stickers-small-gifts",
    imgurl: stickers,
    placeholder: stickerSmallImgTransformed,
  },
  {
    collectionName: "home & living",
    path: "home-living",
    imgurl: homeLiving,
    placeholder: HomeLivingImgTransformed,
  },
  {
    collectionName: "movies & tv parodies",
    path: "movies-tv-parodies",
    imgurl: movies,
    placeholder: moviesTvImgTransformed,
  },
  {
    collectionName: "musical theater",
    path: "musical-theater",
    imgurl: musicalTheatre,
    placeholder: musicalTheatreImgTransformed,
  },
  {
    collectionName: "office & tech",
    path: "office-tech",
    imgurl: office,
    placeholder: officeTechImgTransformed,
  },
];

function CollectionSection() {
  const sectionRef = useRef();
  return (
    <Section
      ref={sectionRef}
      sectionStyles={`px-10 mb-[2em] sm:px-15 md:mb-[4em]`}
      headingStyles={`text-4xl font-bold mb-6 xs:text-5xl md:flex md:item-center md:justify-center md:mb-10`}
      showHeading={true}
      headingTitle={"Collection"}
    >
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {collectionData.map((data) => (
          <li key={data.path} className="relative group">
            <div className="transition-hover duration-300 group-hover:scale-105">
              <Link to={`/collections/${data.path}`}>
                <div>
                  {/* <img loading="lazy" src={item.imageUrl} alt="" /> */}

                  <SectionLazyImage
                    src={data.imgurl}
                    placeholder={data.placeholder}
                    alt="Product image"
                  />
                </div>
              </Link>
            </div>
            <div className="capitalize absolute bottom-0 right-0 text-white px-4 py-4 bg-purple">
              <span>{data.collectionName}</span>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export default CollectionSection;
