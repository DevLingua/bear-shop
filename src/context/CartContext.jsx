import { createContext, useEffect, useReducer } from "react";

export const CartContext = createContext({
  cart: [],
  dispatch: () => {},
});

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const payload = action.payload;

      // 1. Check for exact match (same id, color, and size)
      const exactMatch = state.find(
        (item) =>
          item.id === payload.id &&
          item.color === payload.color &&
          item.size === payload.size
      );

      if (exactMatch) {
        return state.map((item) =>
          item.id === payload.id &&
          item.color === payload.color &&
          item.size === payload.size
            ? {
                ...item,
                quantity: item.quantity + 1,
                price: (item.unitPrice * (item.quantity + 1)).toFixed(2),
              }
            : item
        );
      }

      // 2. Check for same-price variant: same color + different size
      const sameColorDiffSize = state.find(
        (item) =>
          item.id === payload.id &&
          item.color === payload.color &&
          item.size !== payload.size &&
          item.unitPrice === payload.price
      );

      if (sameColorDiffSize) {
        return state.map((item) =>
          item.id === payload.id &&
          item.color === payload.color &&
          item.size !== payload.size &&
          item.unitPrice === payload.price
            ? {
                ...item,
                size: payload.size,
                quantity: item.quantity + 1,
                price: (item.unitPrice * (item.quantity + 1)).toFixed(2),
              }
            : item
        );
      }

      // 3. Check for same-price variant: same size + different color
      const sameSizeDiffColor = state.find(
        (item) =>
          item.id === payload.id &&
          item.size === payload.size &&
          item.color !== payload.color &&
          item.unitPrice === payload.price
      );

      if (sameSizeDiffColor) {
        return state.map((item) =>
          item.id === payload.id &&
          item.size === payload.size &&
          item.color !== payload.color &&
          item.unitPrice === payload.price
            ? {
                ...item,
                color: payload.color,
                quantity: item.quantity + 1,
                price: (item.unitPrice * (item.quantity + 1)).toFixed(2),
              }
            : item
        );
      }

      // 4. Default: Add as new item
      return [
        ...state,
        {
          id: payload.id,
          imgUrl: payload.imgUrl,
          unitPrice: payload.price,
          price: (payload.price * 1).toFixed(2),
          color: payload.color,
          size: payload.size,
          quantity: 1,
          slug: payload.slug,
        },
      ];
    }

    case "REMOVE_FROM_CART":
      return state.filter(
        (item) =>
          !(
            item.id === action.payload.id &&
            item.color === action.payload.color &&
            item.size === action.payload.size
          )
      );

    case "UPDATE_QUANTITY":
      return state.map((item) => {
        if (
          item.id === action.payload.id &&
          item.color === action.payload.color &&
          item.size === action.payload.size
        ) {
          const newQuantity = action.payload.quantity;

          // Prevent NaN and 0 edge cases
          if (!newQuantity || newQuantity < 1) {
            return item;
          }

          return {
            ...item,
            quantity: newQuantity,
            price: (item.unitPrice * newQuantity).toFixed(2),
          };
        }
        return item;
      });

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};

const getInitialCart = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

function CartContextProvider({ children }) {
  const [cart, dispatch] = useReducer(reducer, [], getInitialCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
