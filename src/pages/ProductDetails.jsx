import { Outlet, useLoaderData } from "react-router-dom";
import ProductDetailsComp from "../components/product-details/ProductDetailsComp";
import { fetchData } from "../services/Https";

function ProductDetails() {
  const data = useLoaderData();
  return <ProductDetailsComp data={data} />
}

export default ProductDetails;

export async function loader({ params }) {
  const { slug } = params;
  const response = await fetchData(
    `https://storefront-api.fourthwall.com/v1/products/${slug}?storefront_token=${
      import.meta.env.VITE_STORE_TOKEN
    }`
  );

  return response;
}
