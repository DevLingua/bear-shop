import { useCallback, useEffect, useState, useContext, Suspense } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Link, useLocation, useParams } from "react-router-dom";
import Section from "../Section";
import Spinner from "../spinner/Spinner";
import { colorsArray, sizesArray } from "../../utils/color-size";
import { currencies, fabricCoreArray } from "../../data";
import GlobeIconOne from "/globe-icon.png";
import SecureCheckOutIcon from "/Secure_Checkout.png";
import { ToastContainer, Zoom, toast } from "react-toastify";

import { CartContext } from "../../context/CartContext";
import { fetchData } from "../../services/Https";
import SuspenseImage from "../SuspenseImage";
import Modal from "../modal/Modal";
import { convertCurrency } from "../../utils/currencyConverter";
import { CurrencyConverterContext } from "../../context/CurrencyConverterContext";

// Helper to shuffle array
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const whyShopWithUsData = [
  {
    heading: "Worldwide Shipping",
    paragraph: "Fast global delivery — wherever you are.",
    icon: GlobeIconOne,
  },
  {
    heading: "Secure Checkout",
    paragraph: "Safe payments, trusted methods — shop with confidence.",
    icon: SecureCheckOutIcon,
  },
];

function ProductDetailsComp({ data }) {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [currentColor, setCurrentColor] = useState(null);
  const [currentSize, setCurrentSize] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [loadingImages, setLoadingImages] = useState(true);
  const [frequentlyBought, setFrequentlyBought] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const { dispatch } = useContext(CartContext);
  const location = useLocation(); // <-- used for detecting URL changes
  const { slug } = useParams();

  const { conversionRate, selectedCurrency } = useContext(
    CurrencyConverterContext
  );

  console.log(selectedVariant);

  const preloadImages = (images) =>
    Promise.all(
      images.map(
        (img) =>
          new Promise((res) => {
            const preload = new Image();
            preload.src = img.url;
            preload.onload = res;
            preload.onerror = res;
          })
      )
    );

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    const item = {
      id: selectedVariant.id,
      imgUrl: selectedVariant.images[0]?.url,
      price: selectedVariant.unitPrice?.value,
      color: currentColor,
      size: currentSize,
      slug: data.slug,
    };

    dispatch({ type: "ADD_TO_CART", payload: item });
    toast.success("Product added to cart", {
      autoClose: 1000,
      pauseOnFocusLoss: false,
      draggable: false,
      pauseOnHover: false,
      transition: Zoom,
    });
  };

  const handleSelectedColorVariants = async (swatch) => {
    setCurrentColor(swatch);
    const variant = data?.variants?.find(
      (v) =>
        v.attributes.color.swatch === swatch &&
        v.attributes.size.name === currentSize
    );
    if (variant) {
      await preloadImages(variant.images);
      setSelectedVariant(variant);
      setCurrentImage(variant?.images?.[0]?.url);
    }
  };

  const handleModal = (product) => {
    setModalData(product);
    setShowModal((s) => !s);
  };

  const handleSelectedSizeVariants = async (size) => {
    setCurrentSize(size);
    const variant = data?.variants?.find(
      (v) =>
        v.attributes.color.swatch === currentColor &&
        v.attributes.size.name === size
    );
    if (variant) {
      await preloadImages(variant.images);
      setSelectedVariant(variant);
      setCurrentImage(variant?.images?.[0]?.url);
    }
  };

  useEffect(() => {
    if (!data) return;

    const init = async () => {
      try {
        const firstVariant = data?.variants?.[0];
        await preloadImages(firstVariant?.images || []);
        setSelectedVariant(firstVariant);
        setCurrentImage(firstVariant?.images?.[0]?.url);
        setCurrentColor(firstVariant?.attributes?.color?.swatch || null);
        setCurrentSize(firstVariant?.attributes?.size?.name || null);
        setLoadingImages(false);
      } catch (error) {
        console.error("Error preloading images:", error);
        setLoadingImages(false);
      }
    };

    init();
  }, [data]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    async function fetchAndShuffleFrequentlyBought() {
      try {
        const data = await fetchData(
          `https://storefront-api.fourthwall.com/v1/collections/frequently-bought-together/products?storefront_token=${
            import.meta.env.VITE_STORE_TOKEN
          }`
        );
        const shuffled = shuffleArray(data.results).slice(0, 4);
        setFrequentlyBought(shuffled);
      } catch (error) {
        console.log(error);
      }
    }

    fetchAndShuffleFrequentlyBought();
  }, [slug]); // <-- Re-run this effect when the URL slug changes

  useEffect(() => {
    if (!emblaApi || !selectedVariant?.images?.length) return;
    emblaApi.reInit();
    const updateButtons = () => {
      setCanScrollNext(emblaApi.canScrollNext());
      setCanScrollPrev(emblaApi.canScrollPrev());
    };
    updateButtons();
    emblaApi.on("select", updateButtons);
    return () => {
      emblaApi.off("select", updateButtons);
    };
  }, [emblaApi, selectedVariant]);

  // Scroll to top & reshuffle frequently bought when URL path changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (frequentlyBought) {
      setFrequentlyBought(shuffleArray(frequentlyBought));
    }
  }, [location.pathname]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  if (!data || !selectedVariant) return <Spinner />;

  const title = data.slug.split("-").join(" ");
  const sizeOptions = sizesArray(data);
  const colorsOption = colorsArray(data);

  return (
    <Section
      sectionStyles={`px-10 mb-[2em] mt-50 md:mt-60 `}
      headingStyles={`text-5xl font-bold mb-6`}
      showHeading={false}
      headingTitle={"All Products"}
    >
      {!data || loadingImages ? (
        <Spinner />
      ) : (
        <>
          <ToastContainer />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Image */}
            <article>
              <div className="mb-4 sm:hidden">
                <h1 className="text-3xl/snug font-bold mb-4 capitalize">
                  {data.slug.split("-").join(" ")}
                </h1>
                <span>
                  {
                    currencies.filter(
                      (currency) => currency.code === selectedCurrency
                    )?.[0].symbol
                  }
                  {convertCurrency(
                    conversionRate,
                    selectedVariant.unitPrice?.value.toFixed(2)
                  )}
                </span>
              </div>
              <div className="flex flex-col gap-4">
                <div className="w-full overflow-hidden rounded-lg shadow-md">
                  <img
                    src={currentImage}
                    alt={selectedVariant?.name || "Product Image"}
                    className="w-full object-cover"
                  />
                </div>

                <div className="overflow-hidden">
                  <div
                    ref={emblaRef}
                    className="embla__viewport mb-10"
                    aria-label="Product image carousel"
                  >
                    <ul className="flex gap-4 items-center min-w-0">
                      {selectedVariant.images.map((image) => (
                        <li
                          key={image.id}
                          className="flex-[0_0_20%] shadow-xl/10"
                          onClick={() => setCurrentImage(image.url)}
                          role="button"
                          tabIndex={0}
                          aria-label="Select image"
                          onKeyDown={(e) =>
                            e.key === "Enter" && setCurrentImage(image.url)
                          }
                        >
                          <div>
                            <img
                              src={image.url}
                              alt={`${title} thumbnail`}
                              loading="lazy"
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between text-4xl px-6 text-purple">
                    <button
                      disabled={!canScrollPrev}
                      className="embla__prev}"
                      onClick={scrollPrev}
                      aria-label="Previous image"
                    >
                      &#8592;
                    </button>
                    <button
                      disabled={!canScrollNext}
                      className="embla__next"
                      onClick={scrollNext}
                      aria-label="Next image"
                    >
                      &#8594;
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* Details */}
            <article>
              <div className="mb-4 hidden sm:flex flex-col gap-4 ">
                <h1 className="font-bold mb-4 capitalize text-4xl">
                  {data.slug.split("-").join(" ")}
                </h1>
                {/* <span>${selectedVariant.unitPrice?.value.toFixed(2)}</span> */}
                <span>
                  {
                    currencies.filter(
                      (currency) => currency.code === selectedCurrency
                    )?.[0].symbol
                  }
                  {convertCurrency(
                    conversionRate,
                    selectedVariant.unitPrice?.value.toFixed(2)
                  )}
                </span>
              </div>

              {/* colors */}

              <div className="mb-6">
                <h2 className="mb-4 font-medium text-3xl">Colors:</h2>
                <ul className="flex flex-wrap gap-4">
                  {colorsOption?.map((color) => (
                    <li key={color.name}>
                      <button
                        title={color.name}
                        onClick={() =>
                          handleSelectedColorVariants(color.swatch)
                        }
                        style={
                          currentColor === color.swatch
                            ? { backgroundColor: color.swatch, opacity: "50%" }
                            : { backgroundColor: color.swatch }
                        }
                        className="cursor-pointer w-12 h-12 rounded-full"
                        aria-pressed={currentColor === color.swatch}
                      ></button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* size */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-medium text-3xl">Size:</h2>
                  <Link
                    target="_blank"
                    className="transition-all duration-300 underline decoration-purple hover:text-purple"
                    to="https://firebasestorage.googleapis.com/v0/b/popshopprod.appspot.com/o/library%2Flib_7acfd8f1471e4f98b7%2FHoodie%20Sizing%20Charts.pdf?alt=media&token=a449fb2b-8ca1-4912-8697-e53c06963c9c"
                  >
                    Size guide
                  </Link>
                </div>

                {sizeOptions.length > 9 ? (
                  <select
                    value={currentSize}
                    onChange={(e) => handleSelectedSizeVariants(e.target.value)}
                    aria-label="Select size"
                  >
                    {sizeOptions.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                ) : (
                  <ul className="flex items-center flex-wrap gap-5">
                    {sizeOptions.map((size) => (
                      <li
                        key={size}
                        style={currentSize === size ? { opacity: "50%" } : {}}
                        className="border-1 border-purple py-2 px-3"
                      >
                        <button
                          className="w-full h-full"
                          onClick={() => handleSelectedSizeVariants(size)}
                          aria-pressed={currentSize === size}
                        >
                          {size}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="fixed bottom-0 w-full left-0 flex text-white bg-purple z-100 md:relative md:z-1 md:mt-10 md:rounded-[0.5rem] md:max-w-[80%] md:justify-center md:items-center">
                <button
                  onClick={handleAddToCart}
                  className="w-full px-4 py-4 cursor-pointer"
                >
                  Add to cart
                </button>
              </div>

              <div className="mt-8 text-2xl/normal">
                <h2 className="mb-4 font-medium text-3xl">Description:</h2>
                <div
                  className="flex flex-col gap-4"
                  dangerouslySetInnerHTML={{ __html: data?.description }}
                />
              </div>

              <div className="mt-8 text-2xl/normal">
                <h2 className="mb-4 font-medium text-3xl">Fabric & Care:</h2>
                <ul>
                  {fabricCoreArray.map((fabric) => (
                    <li className="list-disc list-inside" key={fabric}>
                      {fabric}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>

          <article className="mt-8">
            <ul
              className="mt-10 flex flex-col gap-4 mb-10 md:flex-row md:mb-15 md:justify-center"
              aria-label="Why shop with us"
            >
              {whyShopWithUsData.map((data) => (
                <li
                  className="bg-[#f0f0fe1f] flex flex-col items-center px-6 py-4 gap-2"
                  key={data.heading}
                >
                  <img className="w-8" src={data.icon} alt={data.heading} />

                  <h3 className="font-medium">{data.heading}</h3>

                  <p className="text-[1.4rem]">{data.paragraph}</p>
                </li>
              ))}
            </ul>
            {!frequentlyBought ? (
              <Spinner />
            ) : (
              <div>
                <div>
                  <h3 className="font-bold text-3xl mb-4 md:mb-6 md:text-4xl">
                    Frequently Bought Together
                  </h3>
                </div>
                <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {frequentlyBought.map((prod) => (
                    <li
                      key={prod?.id}
                      className="relative shadow-md transition-all hover:opacity-80"
                    >
                      <figure className="group">
                        <Suspense
                          fallback={
                            <div className="w-full aspect-square bg-purple/50 animate-pulse" />
                          }
                        >
                          <SuspenseImage
                            className="mb-0"
                            src={prod.images[0].url}
                            alt={prod.slug.split("-").join(" ")}
                          />
                        </Suspense>

                        <figcaption className="relative mt-5 p-10 py-5 flex flex-col gap-4">
                          <div>
                            <Link
                              to={`/product/${prod.slug}`}
                              className="text-2xl font-medium capitalize transition-all duration-300 hover:text-purple"
                            >
                              {prod.slug.split("-").join(" ")}
                            </Link>
                          </div>
                          <div className="mt-4 text-xl flex items-center justify-between">
                            <span>
                              {
                                currencies.filter(
                                  (currency) =>
                                    currency.code === selectedCurrency
                                )?.[0].symbol
                              }
                              {convertCurrency(
                                conversionRate,
                                prod.variants[0]?.unitPrice.value.toFixed(2)
                              )}
                            </span>
                            <span className="xs:text-2xl">
                              {prod.variants?.length !== 0 &&
                                prod.variants?.length +
                                  " " +
                                  "variants available"}{" "}
                            </span>
                          </div>
                          <div className="opacity-0 group-hover:opacity-70 transition-opacity duration-300 absolute -top-[55%] left-[50%] translate-x-[-50%] translate-y-[60%]">
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
            )}
          </article>
        </>
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

export default ProductDetailsComp;
