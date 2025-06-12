export const convertCurrency = (conversionRate, selectedPrice) => {
  const convertertedValue = Math.ceil(conversionRate * selectedPrice);

  return convertertedValue >= 1000
    ? new Intl.NumberFormat().format(convertertedValue)
    : convertertedValue.toFixed(2);
};
