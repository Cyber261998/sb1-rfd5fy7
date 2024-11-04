import create from 'zustand';
import { ShippingRate } from '../types';

interface ShippingStore {
  rates: ShippingRate[];
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  getShippingRate: (country: string) => ShippingRate | undefined;
}

const defaultRates: ShippingRate[] = [
  { country: 'US', rate: 10, estimatedDays: 3 },
  { country: 'CA', rate: 15, estimatedDays: 5 },
  { country: 'GB', rate: 25, estimatedDays: 7 },
  { country: 'EU', rate: 30, estimatedDays: 8 },
];

export const useShippingStore = create<ShippingStore>((set, get) => ({
  rates: defaultRates,
  selectedCountry: 'US',
  setSelectedCountry: (country) => set({ selectedCountry: country }),
  getShippingRate: (country) => get().rates.find((rate) => rate.country === country),
}));