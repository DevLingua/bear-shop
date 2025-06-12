import { useState, Suspense, useContext } from "react";
import { Link, NavLink } from "react-router";
import ReactPaginate from "react-paginate";
import SuspenseImage from "../SuspenseImage";
import Modal from "../modal/Modal";
import { currencies } from "../../data";
import { convertCurrency } from "../../utils/currencyConverter";
import { CurrencyConverterContext } from "../../context/CurrencyConverterContext";

function CollectionData({ collectionProducts, collectionData }) {
  const [itemOffset, setItemOffset] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const { conversionRate, selectedCurrency } = useContext(
    CurrencyConverterContext
  );

  const itemsPerPage = 5;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = collectionProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(collectionProducts.length / itemsPerPage);

  function handleModal(product) {
    setModalData(product);
    setShowModal((s) => !s);
  }

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % collectionProducts.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <article>
        <div className="grid xl:grid-cols-[1fr_4fr]">
          <nav className="hidden xl:flex flex-col items-center">
            <ul className="flex items-center gap-15 w-full mt-30 flex-col">
              {collectionData.map((collection) => (
                <li key={collection.collectionName}>
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
          <ul className="grid gap-6 [grid-template-columns:1fr] md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            {currentItems?.map((prod) => (
              <li
                key={prod?.id}
                className="relative flex-[0_0_70%] min-w-0 shadow-md transition-all hover:opacity-80"
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
                        className="text-2xl font-medium capitalize transition-all duration-300 hover:text-purple md:text-[1.7rem]"
                      >
                        {prod.slug.split("-").join(" ")}
                      </Link>
                    </div>
                    <div className="mt-4 text-xl flex items-center justify-between">

                      <span className="text-2xl">
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
                      <span className="xs:text-2xl text-purple md:text-[1.7rem]">
                        {prod.variants?.length !== 0 &&
                          prod.variants?.length +
                            " " +
                            "variants available"}{" "}
                      </span>
                    </div>
                    <div className="opacity-15 group-hover:opacity-70 transition-opacity duration-300 absolute -top-[55%] left-[50%] translate-x-[-50%] translate-y-[60%]">
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
        <ReactPaginate
          className={`paginationContainer mt-[2em] text-purple flex items-center justify-center gap-14 cursor-pointer md:text-3xl`}
          nextLabel="→"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={pageCount}
          previousLabel="←"
          renderOnZeroPageCount={null}
          activeClassName={`activeBtn`}
          disabledClassName={`disabledBtn`}
        />
      </article>
      {showModal && (
        <Modal
          modalData={modalData}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
}

export default CollectionData;
