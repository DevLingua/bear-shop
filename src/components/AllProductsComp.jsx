import React, { useMemo, useState, Suspense, useContext } from "react";
import { Link } from "react-router";
import Section from "./Section";
import Spinner from "./spinner/Spinner";
import ReactPaginate from "react-paginate";
import SuspenseImage from "./SuspenseImage"; // ✅ new import
import Modal from "./modal/Modal";
import { CurrencyConverterContext } from "../context/CurrencyConverterContext";
import { currencies } from "../data";
import { convertCurrency } from "../utils/currencyConverter";

function AllProductsComp({ data }) {
  const [itemOffset, setItemOffset] = useState(0);
  const [sortOption, setSortOption] = useState("sort");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const { conversionRate, selectedCurrency } = useContext(
    CurrencyConverterContext
  );

  const flattenedProducts = data.flat();

  const sortedProducts = useMemo(() => {
    if (!flattenedProducts) return [];
    const products = [...flattenedProducts];

    switch (sortOption) {
      case "newest":
        return products.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "LtH":
        return products.sort(
          (a, b) =>
            a.variants[0]?.unitPrice?.value - b.variants[0]?.unitPrice?.value
        );
      case "HtL":
        return products.sort(
          (a, b) =>
            b.variants[0]?.unitPrice?.value - a.variants[0]?.unitPrice?.value
        );
      default:
        return products;
    }
  }, [flattenedProducts, sortOption]);

  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = sortedProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(sortedProducts.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % sortedProducts.length;
    setItemOffset(newOffset);
  };

  function handleModal(product) {
    setModalData(product);
    setShowModal((s) => !s);
  }

  return (
    <Section sectionStyles={`px-10 mb-[2em] mt-50 md:mt-60`} showHeading={false}>
      {!data ? (
        <Spinner />
      ) : (
        <>
          <div className="flex items-center justify-between mb-8 xl:px-5 ">
            <h1 className="text-4xl font-bold md:text-5xl">All Products</h1>
            <select
              className="border-1 border-text cursor-pointer w-40 md:w-fit"
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

          <ul className="grid gap-6 [grid-template-columns:1fr] md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
            {currentItems.map((prod) => (
              <li
                key={prod?.id}
                className="relative flex-[0_0_70%] min-w-0 shadow-md transition-all"
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
                    <Link
                      to={`/product/${prod.slug}`}
                      className="text-2xl font-medium capitalize transition-all duration-300 hover:text-purple"
                    >
                      {prod.slug.split("-").join(" ")}
                    </Link>
                    <div className="mt-4 text-xl flex items-center justify-between">
                      {/* <span className="font-light text-2xl">
                        ${prod.variants[0]?.unitPrice.value}
                      </span> */}
                      <span className="text-3xl font-bold">
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
                      <span className="text-purple xs:text-2xl">
                        {prod.variants?.length > 0 &&
                          `${prod.variants.length} variants available`}
                      </span>
                    </div>
                    <div className="opacity-25 group-hover:opacity-70 transition-opacity duration-300 absolute -top-[75%] left-[50%] translate-x-[-50%] translate-y-[60%]">
                      <button
                        onClick={() => handleModal(prod)}
                        className="text-2xl cursor-pointer capitalize bg-purple text-white rounded-[.5rem] py-3 px-8"
                      >
                        preview
                      </button>
                    </div>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>

          <div>
            <ReactPaginate
              className="paginationContainer mt-[2em] flex justify-center items-center gap-8 cursor-pointer xl:gap-15"
              nextLabel="→"
              onPageChange={handlePageClick}
              pageRangeDisplayed={1}
              pageCount={pageCount}
              previousLabel="←"
              renderOnZeroPageCount={null}
              activeClassName="activeBtn"
              disabledClassName="disabledBtn"
            />
          </div>
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

export default AllProductsComp;
