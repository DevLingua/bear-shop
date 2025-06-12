import { useLoaderData } from "react-router-dom";
import AllProductsComp from "../components/AllProductsComp";
import { fetchData } from "../services/Https";

function AllProducts() {
  const data = useLoaderData();
  return <AllProductsComp data={data} />;
}

export default AllProducts;

export async function loader() {
  const response = await fetchData(
    `https://storefront-api.fourthwall.com/v1/collections?storefront_token=${
      import.meta.env.VITE_STORE_TOKEN
    }`
  );

  if (response.msg) return response;

  // Filter out the unwanted collection
  const collections = response.results.filter(
    (collection) => collection.name !== "Frequently Bought Together"
  );

  // Extract collection IDs
  const collectionIds = collections.map((collection) => collection.slug);

  // Create array of product fetch promises
  const fetchPromises = collectionIds.map((slug) =>
    fetchData(
      `https://storefront-api.fourthwall.com/v1/collections/${slug}/products?storefront_token=${
        import.meta.env.VITE_STORE_TOKEN
      }`
    )
  );

  // Wait for all fetches to resolve
  const results = await Promise.all(fetchPromises);

  // Flatten and combine all product arrays
  const allProducts = results.flat();

  return allProducts.map((prod) => prod.results);
}
