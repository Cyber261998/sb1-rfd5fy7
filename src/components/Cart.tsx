import React from 'react';
import { useCartStore } from '../store/cartStore';
import { useShippingStore } from '../store/shippingStore';
import { useInventoryStore } from '../store/inventoryStore';
import { ShippingSelector } from './ShippingSelector';
import { createCheckoutSession } from '../services/stripe';

export const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity } = useCartStore();
  const { selectedCountry, getShippingRate } = useShippingStore();
  const checkStock = useInventoryStore((state) => state.checkStock);

  const shippingRate = getShippingRate(selectedCountry);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = shippingRate?.rate || 0;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    // Check stock availability
    const stockAvailable = items.every((item) =>
      checkStock(item.id, item.quantity)
    );

    if (!stockAvailable) {
      alert('Some items are out of stock');
      return;
    }

    try {
      await createCheckoutSession(items, shipping);
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to initiate checkout');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 py-4 border-b">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-4 text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          <ShippingSelector />
          <div className="mt-6 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};