import React, { useState } from 'react';
import { Product } from '../../types';
import { useInventoryStore } from '../../store/inventoryStore';

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

const initialFormData: ProductFormData = {
  name: '',
  description: '',
  price: 0,
  image: '',
  category: '',
  stock: 0,
};

export const ProductEditor: React.FC = () => {
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const products = useInventoryStore((state) => state.products);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to save the product
    console.log('Product data:', formData);
    setFormData(initialFormData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Product Management</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            rows={3}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              step="0.01"
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingProduct ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Current Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4">
              <h4 className="font-semibold">{product.name}</h4>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="mt-2">Price: ${product.price}</p>
              <p>Stock: {product.stock}</p>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => setEditingProduct(product)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    // Handle delete
                  }}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};