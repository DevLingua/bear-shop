import { createContext, useEffect, useState } from "react";

export const CurrencyConverterContext = createContext({
  setSelectedCurrency: () => {},
  conversionRate: null,
  selectedCurrency: null,
});

const APIKEY = import.meta.env.VITE_CURRENCY_API_KEY;

function CurrencyConverterContextProvider({ children }) {
  const [selectedCurrency, setSelectedCurrency] = useState(() => {
    return localStorage.getItem("userCurrency")
      ? localStorage.getItem("userCurrency")
      : "USD";
  });
  const [conversionRate, setConversionRate] = useState(1);

  useEffect(() => {
    function setLocalStorage() {
      localStorage.setItem("userCurrency", selectedCurrency);
    }
    setLocalStorage();

    fetch(
      `https://v6.exchangerate-api.com/v6/${APIKEY}/pair/USD/${selectedCurrency}`
    )
      .then((response) => response.json())
      .then((data) => setConversionRate(data.conversion_rate));
  }, [selectedCurrency]);

  return (
    <CurrencyConverterContext.Provider
      value={{ selectedCurrency, setSelectedCurrency, conversionRate }}
    >
      {children}
    </CurrencyConverterContext.Provider>
  );
}

export default CurrencyConverterContextProvider;
