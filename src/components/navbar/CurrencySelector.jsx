import { useContext } from "react";
import { currencies } from "../../data";
import { CurrencyConverterContext } from "../../context/CurrencyConverterContext";

function CurrencySelector() {
  const { selectedCurrency, setSelectedCurrency } = useContext(
    CurrencyConverterContext
  );

  function handleChange(e) {
    setSelectedCurrency(e.target.value);
  }

  return (
    <div>
      <select className="border-1 px-3 py-1 md:py-0" value={selectedCurrency} onChange={handleChange}>
        {currencies.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.code}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CurrencySelector;
