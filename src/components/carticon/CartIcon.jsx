import { useContext } from "react";
import cartIcon from "/icons8-bag-80.png";
import { CartContext } from "../../context/CartContext";

function CartIcon({styles, handleClick}) {
    const { cart } = useContext(CartContext);
  return (
    <div className={styles}>
      <button onClick={handleClick} className="cursor-pointer relative">
        <img
          className="w-15 h-15 sm:w-20 sm:h-20 md:w-14 md:h-14 lg:w-16 lg:h-16"
          src={cartIcon}
          alt=""
        />
        <span className="absolute right-4 text-[1.6rem] text-purple top-5 font-bold sm:right-6 sm:top-8 sm:text-3xl md:text-2xl md:top-5 md:left-4 lg:left-4.5 lg:top-6">
          {cart.length > 0 ? String(cart.length).padStart(2, "0") : ""}
        </span>
      </button>
    </div>
  );
}

export default CartIcon;
