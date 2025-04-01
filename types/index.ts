export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageURL: string;
  stock: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalPrice: number;
  status: 'Pending' | 'Processing' | 'Completed';
  createdAt: string;
  updatedAt: string;
} 