import { createContext, useState } from "react";

export const CartContextID = createContext({
  cartId: null,
  generateCartId: async () => {},
});

const CartContextIDProvider = ({ children }) => {
  const [cartId, setCartId] = useState(null);

  const generateCartId = async (items = []) => {
    try {
      const response = await fetch("https://api.fourthwall.com/storefront/v1/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_STORE_TOKEN}`,
        },
        body: JSON.stringify({ items }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to create cart:", errorText);
        throw new Error("Cart creation failed");
      }

      const data = await response.json();
      setCartId(data.id); // this is the cartId you need for checkout
      return data.id;
    } catch (err) {
      console.error("Cart ID generation failed:", err);
      return null;
    }
  };

  return (
    <CartContextID.Provider value={{ cartId, generateCartId }}>
      {children}
    </CartContextID.Provider>
  );
};

export default CartContextIDProvider;
