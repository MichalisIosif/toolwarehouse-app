# API Documentation

## Overview

This document outlines the API endpoints, data models, and interactions used in the ToolWarehouse mobile application. The application uses Firebase as its backend service, with Firestore for data storage and Firebase Authentication for user management.

## Authentication

### User Model

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: 'mechanic' | 'admin';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Authentication Endpoints

#### Sign Up
```typescript
POST /auth/signup
Request:
{
  email: string;
  password: string;
  name: string;
}
Response:
{
  user: User;
  token: string;
}
```

#### Sign In
```typescript
POST /auth/signin
Request:
{
  email: string;
  password: string;
}
Response:
{
  user: User;
  token: string;
}
```

#### Sign Out
```typescript
POST /auth/signout
Response:
{
  success: boolean;
}
```

## Products

### Product Model

```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
  images: string[];
  specifications: {
    [key: string]: string;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Product Endpoints

#### Get Products
```typescript
GET /products
Query Parameters:
- category?: string
- brand?: string
- search?: string
- page?: number
- limit?: number
Response:
{
  products: Product[];
  total: number;
  page: number;
  limit: number;
}
```

#### Get Product by ID
```typescript
GET /products/:id
Response:
{
  product: Product;
}
```

#### Create Product (Admin only)
```typescript
POST /products
Request:
{
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
  images: string[];
  specifications: {
    [key: string]: string;
  };
}
Response:
{
  product: Product;
}
```

#### Update Product (Admin only)
```typescript
PUT /products/:id
Request:
{
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  brand?: string;
  stock?: number;
  images?: string[];
  specifications?: {
    [key: string]: string;
  };
}
Response:
{
  product: Product;
}
```

#### Delete Product (Admin only)
```typescript
DELETE /products/:id
Response:
{
  success: boolean;
}
```

## Orders

### Order Model

```typescript
interface Order {
  id: string;
  userId: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Order Endpoints

#### Create Order
```typescript
POST /orders
Request:
{
  items: {
    productId: string;
    quantity: number;
  }[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}
Response:
{
  order: Order;
}
```

#### Get User Orders
```typescript
GET /orders
Query Parameters:
- status?: string;
- page?: number;
- limit?: number;
Response:
{
  orders: Order[];
  total: number;
  page: number;
  limit: number;
}
```

#### Get Order by ID
```typescript
GET /orders/:id
Response:
{
  order: Order;
}
```

#### Update Order Status (Admin only)
```typescript
PUT /orders/:id/status
Request:
{
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}
Response:
{
  order: Order;
}
```

## Cart

### Cart Model

```typescript
interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

interface Cart {
  userId: string;
  items: CartItem[];
  total: number;
  updatedAt: Timestamp;
}
```

### Cart Endpoints

#### Get Cart
```typescript
GET /cart
Response:
{
  cart: Cart;
}
```

#### Add Item to Cart
```typescript
POST /cart/items
Request:
{
  productId: string;
  quantity: number;
}
Response:
{
  cart: Cart;
}
```

#### Update Cart Item
```typescript
PUT /cart/items/:productId
Request:
{
  quantity: number;
}
Response:
{
  cart: Cart;
}
```

#### Remove Item from Cart
```typescript
DELETE /cart/items/:productId
Response:
{
  cart: Cart;
}
```

#### Clear Cart
```typescript
DELETE /cart
Response:
{
  success: boolean;
}
```

## Categories

### Category Model

```typescript
interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  parentId?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Category Endpoints

#### Get Categories
```typescript
GET /categories
Response:
{
  categories: Category[];
}
```

#### Get Category by ID
```typescript
GET /categories/:id
Response:
{
  category: Category;
}
```

#### Create Category (Admin only)
```typescript
POST /categories
Request:
{
  name: string;
  description: string;
  image: string;
  parentId?: string;
}
Response:
{
  category: Category;
}
```

#### Update Category (Admin only)
```typescript
PUT /categories/:id
Request:
{
  name?: string;
  description?: string;
  image?: string;
  parentId?: string;
}
Response:
{
  category: Category;
}
```

#### Delete Category (Admin only)
```typescript
DELETE /categories/:id
Response:
{
  success: boolean;
}
```

## Error Handling

### Error Response Format

```typescript
interface ErrorResponse {
  code: string;
  message: string;
  details?: any;
}
```

### Common Error Codes

- `auth/invalid-email`: Invalid email address
- `auth/user-disabled`: User account is disabled
- `auth/user-not-found`: User not found
- `auth/wrong-password`: Incorrect password
- `products/not-found`: Product not found
- `products/out-of-stock`: Product is out of stock
- `orders/not-found`: Order not found
- `orders/invalid-status`: Invalid order status
- `cart/item-not-found`: Cart item not found
- `categories/not-found`: Category not found

## Rate Limiting

- Authentication endpoints: 5 requests per minute
- Product endpoints: 60 requests per minute
- Order endpoints: 30 requests per minute
- Cart endpoints: 60 requests per minute
- Category endpoints: 30 requests per minute

## Security

### Authentication

- All endpoints except signup and signin require authentication
- JWT tokens are used for authentication
- Tokens expire after 24 hours

### Authorization

- Admin endpoints require admin role
- Users can only access their own data
- Rate limiting is enforced per IP and user

### Data Validation

- All input is validated using Zod schemas
- SQL injection is prevented
- XSS attacks are prevented
- CSRF protection is implemented

## Webhooks

### Order Status Updates

```typescript
POST /webhooks/order-status
Request:
{
  orderId: string;
  status: string;
  timestamp: number;
}
```

### Payment Status Updates

```typescript
POST /webhooks/payment-status
Request:
{
  orderId: string;
  status: string;
  timestamp: number;
}
```

## Versioning

The API is versioned through the URL path:
- Current version: `/v1`
- Example: `/v1/products`

## Support

For API support, contact:
- Email: support@toolwarehouse.com
- Documentation: https://docs.toolwarehouse.com
- Status page: https://status.toolwarehouse.com 