import create from 'zustand';
import { Currency } from '../types';

interface CurrencyStore {
  currencies: Currency[];
  selectedCurrency: Currency;
  setSelectedCurrency: (currency: Currency) => void;
}

const defaultCurrencies: Currency[] = [
  { code: 'USD', symbol: '$', rate: 1 },
  { code: 'EUR', symbol: '€', rate: 0.85 },
  { code: 'GBP', symbol: '£', rate: 0.73 },
  { code: 'JPY', symbol: '¥', rate: 110.25 }
];

export const useCurrencyStore = create<CurrencyStore>((set) => ({
  currencies: defaultCurrencies,
  selectedCurrency: defaultCurrencies[0],
  setSelectedCurrency: (currency) => set({ selectedCurrency: currency })
}));