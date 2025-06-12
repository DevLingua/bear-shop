import { useCallback, useEffect, useState, Suspense, useContext } from "react";
import Section from "../Section";
import { fetchData } from "../../services/Https";
import useEmblaCarousel from "embla-carousel-react";
import Spinner from "../spinner/Spinner";
import { Link } from "react-router";
import SuspenseImage from "../SuspenseImage";
import Modal from "../modal/Modal";
import { CurrencyConverterContext } from "../../context/CurrencyConverterContext";
import { currencies } from "../../data";
import { convertCurrency } from "../../utils/currencyConverter";

function FeaturedSection() {
  const [_, setError] = useState("");
  const [products, setProducts] = useState(null);
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const { conversionRate, selectedCurrency } = useContext(
    CurrencyConverterContext
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      const data = await fetchData(
        `https://storefront-api.fourthwall.com/v1/collections/best-sellers/products?storefront_token=${
          import.meta.env.VITE_STORE_TOKEN
        }`
      );

      if (data.msg) {
        return setError(data.msg);
      }
      setProducts(data.results);
    };

    fetchFeaturedProducts();
  }, []);

  function handleModal(product) {
    setModalData(product);
    setShowModal((s) => !s);
  }

  return (
    <Section
      sectionStyles={`px-10 mb-[2em] sm:px-15 md:mb-[4em]`}
      headingStyles={`text-4xl font-bold mb-6 xs:text-5xl md:flex md:item-center md:justify-center mb-10`}
      showHeading={true}
      headingTitle={"Featured Section"}
    >
      {!products ? (
        <Spinner />
      ) : (
        <article>
          <div className="overflow-hidden">
            <div className="embla__viewport" ref={emblaRef}>
              <ul className="flex gap-8">
                {products.map((prod) => (
                  <li
                    key={prod.id}
                    className="relative flex-[0_0_90%] min-w-0 shadow-md transition-all hover:opacity-80 xs:flex-[0_0_75%] sm:flex-[0_0_50%] sm:pb-4 md:flex-[0_0_40%] xl:flex-[0_0_30%]"
                  >
                    <figure className="group">
                      <Suspense
                        fallback={
                          <div className="aspect-square bg-purple/50 animate-pulse" />
                        }
                      >
                        <SuspenseImage
                          className="mb-0"
                          src={prod.images[0].url}
                          alt={prod.slug.split("-").join(" ")}
                          loading="lazy"
                        />
                      </Suspense>

                      <figcaption className="relative mt-5 p-10 py-5 flex flex-col gap-4">
                        <div>
                          <Link
                            to={`/product/${prod.slug}`}
                            className="text-xl font-medium capitalize transition-all duration-300 hover:text-purple xs:text-2xl sm:text-2xl"
                          >
                            {prod.slug.split("-").join(" ")}
                          </Link>
                        </div>
                        <div className="mt-4 text-lg flex items-center justify-between sm:text-2xl">
                          <span className="font-bold text-xl xs:text-2xl">
                            {
                              currencies.filter(
                                (currency) => currency.code === selectedCurrency
                              )?.[0].symbol
                            }
                            {convertCurrency(
                              conversionRate,
                              prod?.variants[0]?.unitPrice?.value.toFixed(2)
                            )}
                          </span>
                          <span className="text-purple xs:text-xl">
                            {prod.variants?.length !== 0 &&
                              prod.variants?.length +
                                " " +
                                "variants available"}{" "}
                          </span>
                        </div>
                        <div className="opacity-40 group-hover:opacity-70 transition-opacity duration-300 absolute -top-[70%] left-[50%] translate-x-[-50%] translate-y-[60%] sm:-top-[65%]">
                          <button
                            onClick={() => handleModal(prod)}
                            className="text-xl cursor-pointer capitalize bg-purple text-white rounded-[.5rem] py-3 px-8"
                          >
                            preview
                          </button>
                        </div>
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10 flex items-center justify-between">
              <button
                className="embla__prev text-purple text-5xl"
                onClick={scrollPrev}
              >
                &#8592;
              </button>
              <button
                className="embla__next text-purple text-5xl"
                onClick={scrollNext}
              >
                &#8594;
              </button>
            </div>
          </div>
        </article>
      )}

      {showModal && (
        <Modal
          modalData={modalData}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </Section>
  );
}

export default FeaturedSection;
