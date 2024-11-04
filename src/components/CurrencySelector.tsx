import React from 'react';
import { useCurrencyStore } from '../store/currencyStore';

export const CurrencySelector: React.FC = () => {
  const { currencies, selectedCurrency, setSelectedCurrency } = useCurrencyStore();

  return (
    <select
      value={selectedCurrency.code}
      onChange={(e) => {
        const currency = currencies.find(c => c.code === e.target.value);
        if (currency) setSelectedCurrency(currency);
      }}
      className="ml-4 rounded-md border-gray-300 shadow-sm"
    >
      {currencies.map((currency) => (
        <option key={currency.code} value={currency.code}>
          {currency.code} ({currency.symbol})
        </option>
      ))}
    </select>
  );
};