import { NavLink, useParams } from "react-router";
import Section from "./Section";
import funnelIcon from "/funnel-icon.png";
import { useEffect, useState,useMemo } from "react";
import CollectionData from "./collection/CollectionData";
import { fetchData } from "../services/Https";
import Spinner from "./spinner/Spinner";

const collectionData = [
  {
    collectionName: "Apparel",
    path: "/collections/apparel",
  },
  {
    collectionName: "sticker & small gifts",
    path: "/collections/stickers-small-gifts",
  },
  {
    collectionName: "home & living",
    path: "/collections/home-living",
  },
  {
    collectionName: "movies & tv parodies",
    path: "/collections/movies-tv-parodies",
  },
  {
    collectionName: "musical theater",
    path: "/collections/musical-theater",
  },
  {
    collectionName: "office & tech",
    path: "/collections/office-tech",
  },
];

function CollectionComp({ children }) {
  const { slugName } = useParams();
  const [sortOption, setSortOption] = useState("sort");
  const [showFilter, setShowFilter] = useState(false);
  const [collectionProducts, setCollectionProducts] = useState(null);

  useEffect(() => {
    const fetchCollection = async () => {
      const data = await fetchData(
        `https://storefront-api.fourthwall.com/v1/collections/${slugName}/products?storefront_token=${
          import.meta.env.VITE_STORE_TOKEN
        }`
      );

      setCollectionProducts(data.results);
    };
    fetchCollection();
  }, [slugName]);


// Inside the component
const sortedProducts = useMemo(() => {
  if (!collectionProducts) return null;

  const products = [...collectionProducts]; // clone to avoid mutating state

  switch (sortOption) {
    case "newest":
      return products.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    case "LtH":
      return products.sort((a, b) => a.variants[0]?.unitPrice?.value - b.variants[0]?.unitPrice?.value);
    case "HtL":
      return products.sort((a, b) => b.variants[0]?.unitPrice?.value - a.variants[0]?.unitPrice?.value);
    default:
      return products;
  }
}, [collectionProducts, sortOption]);


  function handleSetShowFilter() {
    setShowFilter((s) => !s);
  }

  return (
    <Section sectionStyles={`px-10 mb-[2em] mt-50 sm:mt-55 xl:mt-65`} showHeading={false}>
      <header className="flex items-center justify-between mb-10 mt-20 lg:px-5 xl:px-20">
        {/* heading */}
        <div>
          <h1 className="font-bold text-2xl capitalize xs:text-4xl md:text-[2.5rem] ">{slugName.split("-").join(" ")}</h1>
        </div>

        {/* navigation */}
        <div className="relative flex items-center gap-4">
          <div>
            <select
              className="border-1 border-text cursor-pointer w-40 md:w-full"
              name="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="sort">Sort</option>
              <option value="newest">Newest</option>
              <option value="LtH">Price: Low to High</option>
              <option value="HtL">Price: High to Low</option>
            </select>
          </div>

          <div className="xl:hidden">
            <div onClick={handleSetShowFilter} className="w-10 cursor-pointer md:w-15">
              <img src={funnelIcon} alt="" />
            </div>

            <nav
              style={showFilter ? { display: "block" } : {}}
              className="hidden z-[100] w-max absolute top-0 right-[-2.5rem] bg-primary shadow-2xl px-5 py-8"
            >
              <div className="flex items-center justify-between border-b-1 border-text/30 pb-4 md:text-4xl">
                <span>Collections</span>
                <button
                  onClick={handleSetShowFilter}
                  className="cursor-pointer"
                >
                  &#10007;
                </button>
              </div>
              <ul className="flex items-center gap-8 flex-col mt-10 md:text-4xl md:gap-12">
                {collectionData.map((collection) => (
                  <li key={collection.collectionName} onClick={(e) => handleSetShowFilter(e.target.value)}>
                    <NavLink
                      to={collection.path}
                      end
                      className={({ isActive }) =>
                        `capitalize font-medium hover:opacity-50 transition-all duration-300 ${
                          isActive ? "text-purple" : ""
                        }`
                      }
                    >
                      {collection.collectionName}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {!collectionProducts ? (
        <Spinner />
      ) : (
        <CollectionData collectionData={collectionData} collectionProducts={sortedProducts}>
          {children}
        </CollectionData>
      )}
    </Section>
  );
}

export default CollectionComp;
