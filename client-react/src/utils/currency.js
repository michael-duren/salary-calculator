export const convertFromCurrency = (currency) => {
  return +currency.replace(/[$,]/g, '');
};

export const convertToCurrency = (currency) => {
  const formatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    trailingZeroDisplay: 'stripIfInteger',
  });

  return formatter.format(currency);
};
