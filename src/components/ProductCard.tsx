import React from 'react';
import { Product } from '../types';
import { useCartStore } from '../store/cartStore';
import { useInventoryStore } from '../store/inventoryStore';
import { useCurrencyStore } from '../store/currencyStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);
  const checkStock = useInventoryStore((state) => state.checkStock);
  const { selectedCurrency } = useCurrencyStore();

  const handleAddToCart = () => {
    if (checkStock(product.id, 1)) {
      addItem(product);
    } else {
      alert('This item is out of stock');
    }
  };

  const convertedPrice = product.price * selectedCurrency.rate;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600 text-sm mt-1">{product.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xl font-bold">
            {selectedCurrency.symbol}{convertedPrice.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={!checkStock(product.id, 1)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {checkStock(product.id, 1) ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          In stock: {product.stock} units
        </p>
      </div>
    </div>
  );
};