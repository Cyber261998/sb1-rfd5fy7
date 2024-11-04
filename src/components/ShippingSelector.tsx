import React from 'react';
import { useShippingStore } from '../store/shippingStore';

export const ShippingSelector: React.FC = () => {
  const { rates, selectedCountry, setSelectedCountry } = useShippingStore();

  return (
    <div className="mt-4">
      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
        Shipping Country
      </label>
      <select
        id="country"
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
      >
        {rates.map((rate) => (
          <option key={rate.country} value={rate.country}>
            {rate.country} (${rate.rate} - {rate.estimatedDays} days)
          </option>
        ))}
      </select>
    </div>
  );
};