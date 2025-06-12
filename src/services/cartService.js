export const createFourthwallCart = async (cartItems, storefrontToken) => {
  console.log(cartItems)
  console.log(storefrontToken)
  const response = await fetch("https://storefront-api.fourthwall.com/v1/carts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storefrontToken}`,
    },
    body: JSON.stringify({
      items: cartItems.map((item) => ({
        productId: item.id,
        variantId: item.id,
        quantity: item.quantity,
      })),
    }),
  });

  console.log("Sending to Fourthwall:", {
  items: cartItems.map((item) => ({
    variantId: item.variantId,
    quantity: item.quantity,
  })),
});

  if (!response.ok) throw new Error("Failed to create Fourthwall cart");
  const data = await response.json();
  return data.id;
};
