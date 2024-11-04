import create from 'zustand';
import { Product } from '../types';

interface InventoryStore {
  products: Product[];
  updateStock: (productId: string, quantity: number) => void;
  checkStock: (productId: string, quantity: number) => boolean;
}

export const useInventoryStore = create<InventoryStore>((set, get) => ({
  products: [],
  updateStock: (productId, quantity) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === productId
          ? { ...product, stock: product.stock - quantity }
          : product
      ),
    })),
  checkStock: (productId, quantity) => {
    const product = get().products.find((p) => p.id === productId);
    return product ? product.stock >= quantity : false;
  },
}));