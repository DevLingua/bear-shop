import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import Homepage from "./pages/Homepage";
import RootLayout from "./RootLayout";
import Collections from "./pages/Collections";
import CollectionComp from "./components/CollectionComp";
import ProductDetails, { loader } from "./pages/ProductDetails";
import AllProducts, { loader as allProductsLoader } from "./pages/AllProducts";
import Cart from "./pages/Cart";
import PageNotFound from "./pages/PageNotFound";
import Spinner from "./components/spinner/Spinner";
import About from "./pages/About";
import Faq from "./pages/Faq";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Contact from "./pages/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "all-products",
        element: <AllProducts />,
        loader: allProductsLoader,
        hydrateFallbackElement: <Spinner />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "about-us",
        element: <About />,
      },
      {
        path: "returns-faq",
        element: <Faq />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "terms-of-service",
        element: <TermsOfService />,
      },
      {
        path: "collections",
        element: <Collections />,
        children: [
          {
            index: true,
            element: <Navigate to="/collections/apparel" replace />, // ✅ Redirect /collections to /collections/apparel
          },
          {
            path: ":slugName",
            element: <CollectionComp />,
          },
        ],
      },
      {
        path: "product/:slug",
        element: <ProductDetails />,
        loader: loader,
        hydrateFallbackElement: <Spinner />,
      },
    ],
  },
]);

function Routes() {
  return <RouterProvider router={router} />;
}

export default Routes;
