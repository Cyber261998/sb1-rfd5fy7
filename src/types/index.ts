export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  address: string;
  country: string;
}

export interface Currency {
  code: string;
  symbol: string;
  rate: number;
}

export interface ShippingRate {
  country: string;
  rate: number;
  estimatedDays: number;
}