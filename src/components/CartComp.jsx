import { Link, useNavigate } from "react-router";
import Section from "./Section";
import { Line } from "rc-progress";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import mascotImage from "/Mascot_Poses_Empty_Cart.png";
import trashImages from "/icons8-trash-100.png";
import { CurrencyConverterContext } from "../context/CurrencyConverterContext";
import { currencies } from "../data";
import { convertCurrency } from "../utils/currencyConverter";

function CartComp() {
  const { cart, dispatch } = useContext(CartContext);
  const [inputValues, setInputValues] = useState({});
  const { conversionRate, selectedCurrency } = useContext(
    CurrencyConverterContext
  );
  const navigate = useNavigate();

  const handleRemove = (item) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: { id: item.id, color: item.color, size: item.size },
    });
  };

const handleCheckout = async () => {
  try {
    const items = cart.map(({ id, quantity }) => ({
      variantId: id, // ✅ Use variantId key
      quantity,
    }));

    console.log(selectedCurrency)

    const response = await fetch("https://prickly-bear-server.onrender.com/api/create-cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });

    if (!response.ok) throw new Error("Failed to create cart");

    const cartIdData = await response.json();
    console.log(cartIdData)
    console.log("Parsed response JSON:", cartIdData);

    const cartId = cartIdData.cartId || cartIdData.id;
    if (!cartId) throw new Error("No cartId in response");

    window.location.href = `https://prickly-bear-shop.fourthwall.com/checkout/?cartCurrency=${selectedCurrency}&cartId=${cartId}`;
  } catch (err) {
    console.error("Checkout error:", err);
  }
};




  const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
  const freeShippingThreshold = 45;

  // Calculate how much left to reach free shipping (or 0 if qualified)
  const amountLeft = Math.max(0, freeShippingThreshold - total);

  // Calculate progress percent capped at 100%
  const progressPercent = Math.min((total / freeShippingThreshold) * 100, 100);

  return (
    <Section
      sectionStyles={`px-10 mb-[2em] mt-55`}
      headingStyles={`text-5xl font-bold mb-6`}
      showHeading={false}
      headingTitle={"Your Cart"}
    >
      {cart.length !== 0 && (
        <div className="mb-12 flex items-center justify-between lg:justify-center lg:gap-15">
          <div>
            <h1 className="text-4xl font-bold md:text-5xl md:mt-5">
              Total Item In Your Cart:
            </h1>
          </div>
          <div>
            <span className="font-medium text-3xl bg-text text-purple rounded-full px-4 py-1">
              {cart.length}
            </span>
          </div>
        </div>
      )}

      {cart.length === 0 ? (
        <div className="flex flex-col items-center text-center">
          <img
            src={mascotImage}
            alt="Empty Cart"
            className="w-64 h-64 mb-4 md:w-70 md:h-70"
          />

          <h2 className="text-2xl font-semibold md:text-3xl">
            Your cart is empty!
          </h2>
          <p className="my-4">
            Add something to make me happy <span>:)</span>
          </p>
          <button
            onClick={() => navigate("/all-products")}
            className="bg-purple px-4 py-3 transition-all duration-300 cursor-pointer text-white rounded-[0.5rem] hover:scale-95"
          >
            Explore Products
          </button>
        </div>
      ) : (
        <>
          <ul
            className={`grid w-full mx-auto gap-12 ${
              cart.length === 1
                ? "place-items-center grid-cols-1"
                : "lg:grid-cols-2 lg:gap-18 grid-cols-1"
            } cartContainer`}
          >
            {cart.map((item) => (
              <li
                className={`flex border-b pb-6 gap-10 border-purple/30 ${
                  cart.length === 1 ? "lg:max-w-3xl lg:mx-auto w-full" : ""
                }`}
                key={`${item.id}-${item.color}-${item.size}`}
              >
                <div className="flex flex-1 items-center lg:flex-1">
                  <img
                    className="w-full h-full object-cover object-center"
                    src={item.imgUrl}
                    alt="Product image"
                  />
                </div>

                <div className="flex flex-1/4 flex-col gap-6 sm:mt-10 sm:gap-10 md:mt-16 md:gap-12 lg:flex-1 xlg:justify-center">
                  <div>
                    <h5
                      className={`capitalize text-xl/snug font-medium xs:text-2xl/tight sm:text-3xl md:text-4xl lg:text-3xl ${
                        cart.length === 1 && "lg:text-2xl"
                      }`}
                    >
                      <Link
                        className="transition-all duration-300 hover:text-purple"
                        to={`/product/${item.slug}`}
                      >
                        {item.slug.split("-").join(" ")}
                      </Link>
                    </h5>
                  </div>

                  <div className="flex items-center gap-4 sm:gap-8">
                    <button
                      style={{ backgroundColor: item.color }}
                      className="w-7 h-7 rounded-full sm:w-10 sm:h-10 md:w-15 md:h-15 lg:w-12 lg:h-12"
                    ></button>

                    <button className="border-1 border-purple text-2xl px-3 py-0 sm:py-1 sm:px-4 sm:text-3xl md:text-4xl md:py-2 lg:text-3xl">
                      {item.size}
                    </button>
                  </div>

                  <div className="flex items-center gap-4 text-2xl sm:text-3xl md:text-4xl lg:text-3xl">
                    {/* <span>${item.price}</span> */}
                    <span>
                      {
                        currencies.filter(
                          (currency) => currency.code === selectedCurrency
                        )?.[0].symbol
                      }
                      {convertCurrency(
                        conversionRate,
                        // selectedVariant.unitPrice?.value.toFixed(2)
                        item.price
                      )}
                    </span>
                    <div className="flex gap-2 items-center">
                      <span>Qty:</span>
                      <input
                        type="number"
                        value={
                          inputValues[
                            `${item.id}-${item.color}-${item.size}`
                          ] ?? item.quantity
                        }
                        min={1}
                        onChange={(e) => {
                          const key = `${item.id}-${item.color}-${item.size}`;
                          setInputValues((prev) => ({
                            ...prev,
                            [key]: e.target.value,
                          }));
                        }}
                        onBlur={(e) => {
                          const rawValue = e.target.value;
                          const newQty = parseInt(rawValue, 10);

                          const key = `${item.id}-${item.color}-${item.size}`;

                          if (!rawValue || isNaN(newQty) || newQty < 1) {
                            setInputValues((prev) => ({
                              ...prev,
                              [key]: item.quantity,
                            }));
                            return;
                          }

                          dispatch({
                            type: "UPDATE_QUANTITY",
                            payload: {
                              id: item.id,
                              color: item.color,
                              size: item.size,
                              quantity: newQty,
                            },
                          });
                        }}
                        className="w-20 px-2 border-1 border-text rounded sm:w-25 text-center sm:py-1"
                      />
                    </div>
                  </div>

                  <div className="transition-all duration-500 hover:opacity-60 w-12 h-12 sm:w-15 sm:h-15">
                    <button
                      onClick={() => handleRemove(item)}
                      className="text-4xl cursor-pointer font-medium w-full h-full"
                    >
                      <img
                        src={trashImages}
                        alt="delete icon"
                        className="w-full h-full"
                      />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center mt-10 mb-10 text-2xl w-full max-w-5xl sm:text-3xl md:mx-auto md:mt-20">
            <span>Total:</span>
            {/* <span className="font-medium">${total.toFixed(2)}</span> */}

            <span>
              {
                currencies.filter(
                  (currency) => currency.code === selectedCurrency
                )?.[0].symbol
              }
              {convertCurrency(conversionRate, total.toFixed(2))}
            </span>
          </div>

          <div className="flex flex-col gap-4 text-2xl w-full max-w-5xl sm:text-3xl md:mx-auto md:gap-8">
            {total >= freeShippingThreshold ? (
              <span className="text-green-700 font-semibold">
                You qualify for free shipping!
              </span>
            ) : (
              <span>
                Spend ${amountLeft.toFixed(2)} more for free shipping.
              </span>
            )}

            <Line
              className=""
              percent={progressPercent}
              strokeWidth={2}
              strokeColor={
                total >= freeShippingThreshold ? "#22c55e" : "#7c5bff"
              }
            />
          </div>

          <div className="fixed bottom-0 flex items-center justify-center w-full left-0 bg-purple text-white z-50 sm:relative sm:mt-10 sm:bg-transparent sm:z-1 ">
            <button
              onClick={handleCheckout}
              className="w-full py-4 text-xl font-medium sm:w-max sm:bg-purple sm:py-6 sm:px-3 sm:rounded-[0.5rem] sm:text-2xl"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </Section>
  );
}

export default CartComp;
