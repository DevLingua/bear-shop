import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import CurrencyConverterContextProvider from "./context/CurrencyConverterContext.jsx";
import CartContextProvider from "./context/CartContext.jsx";
import { StickyProvider } from "./context/StickyContext.jsx";
import CartContextIDProvider from "./context/CartContextID.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartContextIDProvider>
      <CartContextProvider>
        <CurrencyConverterContextProvider>
          <StickyProvider>
            <App />
          </StickyProvider>
        </CurrencyConverterContextProvider>
      </CartContextProvider>
    </CartContextIDProvider>
  </StrictMode>
);
