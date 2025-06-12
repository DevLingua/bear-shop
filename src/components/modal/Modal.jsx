import { useContext, useState } from "react";
import { Link } from "react-router";
import { colorsArray, sizesArray } from "../../utils/color-size";
import { CartContext } from "../../context/CartContext";
import { ToastContainer, Zoom, toast } from "react-toastify";

function Modal({ modalData, showModal, setShowModal }) {
  const { dispatch } = useContext(CartContext);

  const [currentColor, setCurrentColor] = useState(
    modalData?.variants[0]?.attributes?.color?.swatch
  );
  const [currentSize, setCurrentSize] = useState(
    modalData?.variants[0]?.attributes?.size?.name
  );
  const [selectedVariant, setSelectedVariant] = useState(() => {
    return modalData?.variants?.find(
      (v) =>
        v.attributes.color.swatch ===
          modalData?.variants[0]?.attributes?.color?.swatch &&
        v.attributes.size.name ===
          modalData?.variants[0]?.attributes?.size?.name
    );
  });

  function handleSelectedColorVariants(swatch) {
    setCurrentColor(swatch);
    const variant = modalData?.variants?.find(
      (v) =>
        v.attributes.color.swatch === swatch &&
        v.attributes.size.name === currentSize
    );
    setSelectedVariant(variant);
  }

  function handleSelectedSizeVariants(size) {
    setCurrentSize(size);
    const variant = modalData?.variants?.find(
      (v) =>
        v.attributes.color.swatch === currentColor &&
        v.attributes.size.name === size
    );
    setSelectedVariant(variant);
  }

  function handleAddToCart() {
    const variant = selectedVariant;

    if (!variant) return;

    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: variant.id,
        name: modalData.slug.split("-").join(" "),
        imgUrl: variant.images[0]?.url,
        price: variant.unitPrice?.value,
        color: variant.attributes?.color?.swatch,
        size: variant.attributes?.size?.name,
        quantity: 1,
        slug: modalData.slug,
      },
    });

      toast.success("Product added to cart", {
      autoClose: 1000,
      pauseOnFocusLoss: false,
      draggable: false,
      pauseOnHover: false,
      transition: Zoom,
    });
  }


  const allColors = colorsArray(modalData);
  const allSizes = sizesArray(modalData);

  return (
    <dialog
      open={showModal}
      style={{ backgroundColor: currentColor }}
      className="fixed z-[100] top-0 h-screen flex items-center justify-center bg-primary p-4 w-full"
    >
       <ToastContainer />
      <article className="bg-primary py-8 px-4 w-full max-w-4xl mx-auto my-auto rounded-2xl sm:px-8">

        {/* tittle */}
        <div className="flex flex-col mb-5 gap-4">
         <div className="flex justify-between">
           <h4 className="capitalize text-2xl/snug font-semibold sm:text-3xl/normal">
            {modalData.slug.split("-").join(" ")}
          </h4>
          <button className="w-6 h-6 text-red-600 font-medium" onClick={() => setShowModal((s) => !s)}>x</button>
         </div>

          <div className="flex flex-col gap-2 sm:text-3xl">
              <p className="font-light">
                <span>${selectedVariant?.unitPrice?.value.toFixed(2)}</span>
              </p>
            </div>
        </div>

        {/* grid */}
        <div className="rounded-lg overflow-hidden grid gap-6 grid-cols-2 sm:gap-10">
          {/* Left Column - Image */}
          <div className="mx-auto my-auto">
            <img className="object-cover" src={selectedVariant?.images[0]?.url} alt={modalData?.slug} />
          </div>

          {/* Right Column - Content */}
          <div className="flex flex-col gap-4 mt-2 sm:my-auto sm:gap-7">
            

            {/* Color selection */}
            <div className="flex flex-col gap-2 sm:text-4xl sm:gap-8">
              <span className="underline">Colors: </span>
              {allColors.length > 10 ? (
                <select
                  value={currentColor}
                  onChange={(e) => handleSelectedColorVariants(e.target.value)}
                >
                  {allColors.map((color) => (
                    <option key={color.name} value={color.swatch}>
                      {color.name}
                    </option>
                  ))}
                </select>
              ) : (
                <ul className="flex flex-wrap items-center gap-4">
                  {allColors.map((color) => (
                    <li
                      style={
                        currentColor === color.swatch
                          ? { backgroundColor: color.swatch, opacity: "50%" }
                          : { backgroundColor: color.swatch }
                      }
                      className="w-8 h-8 rounded-full sm:w-12 sm:h-12"
                      key={color.name}
                    >
                      <button
                        className="w-full h-full rounded-full cursor-pointer"
                        title={color.name}
                        onClick={() =>
                          handleSelectedColorVariants(color.swatch)
                        }
                        style={{ backgroundColor: color.swatch }}
                      ></button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Size selection */}
            <div className="flex flex-col gap-2 sm:text-4xl sm:gap-8">
              <div className="flex justify-between items-center">
                <span className="underline">Size: </span>
                {/* <Link className="underline ">Size guide</Link> */}
              </div>

              {allSizes.length > 6 ? (
                <select
                  value={currentSize}
                  onChange={(e) => handleSelectedSizeVariants(e.target.value)}
                >
                  {allSizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              ) : (
                <ul className="flex items-center flex-wrap gap-4">
                  {allSizes.map((size) => (
                    <li
                      style={currentSize === size ? { opacity: "50%" } : {}}
                      className="border-1 border-purple px-3 py-1 text-2xl sm:px-4 sm:py-2"
                      key={size}
                    >
                      <button
                        className="cursor-pointer"
                        onClick={() => handleSelectedSizeVariants(size)}
                      >
                        {size}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Add to cart & view details */}
            <div className="mt-4">
              <div className="mb-4 sm:mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedVariant}
                  className="cursor-pointer bg-purple py-2 w-full disabled:opacity-50 rounded-[0.5rem] sm:py-4"
                >
                  Add to cart
                </button>
              </div>
              <div className="flex items-center justify-center">
                <Link
                  to={`/product/${modalData.slug}`}
                  className="border-b-1  text-xl transition-all duration-300 hover:text-purple sm:text-2xl"
                >
                  View full details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </dialog>
  );
}

export default Modal;
