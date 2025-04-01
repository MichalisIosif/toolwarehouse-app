# ToolWarehouse Mobile App

A React Native mobile application for mechanics to browse and purchase tools and equipment. Built with Expo, Firebase, and TypeScript.

## Project Overview

This project demonstrates a full-stack mobile application implementation with modern web technologies and best practices. It showcases real-world software development skills including:

- Mobile app development with React Native
- TypeScript implementation for type safety
- Firebase integration for backend services
- State management with React Context API
- Clean architecture and code organization
- Authentication and security implementation
- Real-time database operations
- Modern UI/UX design principles

## Features

- **User Authentication**
  - Email/Password authentication via Firebase
  - Role-based access control (Mechanics & Admin)
  - Secure session management
  - Protected routes and screens

- **Product Catalog**
  - Dynamic product listing with categories
  - Real-time stock updates
  - Search and filter functionality
  - Detailed product views
  - Image handling and optimization

- **Shopping Cart**
  - Persistent cart state management
  - Real-time stock validation
  - Quantity management
  - Price calculations
  - Offline support

- **Order Management**
  - Order creation and tracking
  - Real-time status updates
  - Order history
  - Admin order management

- **Push Notifications**
  - Order status updates
  - Stock alerts
  - Admin notifications

## Technical Architecture

### Frontend Architecture
```
tw-app/
├── app/                    # Main application screens
│   ├── (auth)/            # Authentication screens
│   ├── (tabs)/            # Main tab screens
│   └── product/           # Product-related screens
├── components/            # Reusable UI components
├── config/               # Configuration files
├── contexts/             # React Context providers
├── services/             # API and service functions
├── types/                # TypeScript type definitions
└── assets/              # Static assets
```

### State Management
- **Authentication State**: Managed via AuthContext
- **Shopping Cart**: Managed via CartContext
- **Real-time Updates**: Firebase listeners for live data

### Database Schema
```typescript
// Users Collection
interface User {
  id: string;
  name: string;
  email: string;
  role: 'mechanic' | 'admin';
  createdAt: string;
}

// Products Collection
interface Product {
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

// Orders Collection
interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalPrice: number;
  status: 'Pending' | 'Processing' | 'Completed';
  createdAt: string;
  updatedAt: string;
}
```

## Tech Stack

- **Frontend Framework**: React Native (Expo)
- **Language**: TypeScript
- **State Management**: React Context API
- **Backend Services**: Firebase
  - Authentication
  - Firestore Database
  - Cloud Functions
  - Cloud Messaging
- **Development Tools**:
  - ESLint for code linting
  - TypeScript for type safety
  - Expo for development and building

## Security Implementation

- Firebase Authentication for user management
- Environment variables for sensitive data
- Secure API endpoints
- Input validation and sanitization
- Role-based access control
- Secure data transmission

## Development Setup

1. **Prerequisites**
   - Node.js (v14 or later)
   - npm or yarn
   - Expo CLI
   - Firebase account and project

2. **Installation**
   ```bash
   # Clone the repository
   git clone https://github.com/MichalisIosif/toolwarehouse-app.git
   cd toolwarehouse-app

   # Install dependencies
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Running the App**
   ```bash
   # Start the development server
   npm start
   # or
   yarn start
   ```

## Testing

The project includes:
- Unit tests for components
- Integration tests for services
- Type checking with TypeScript
- Linting with ESLint

## Performance Considerations

- Lazy loading of images
- Efficient state management
- Optimized database queries
- Caching strategies
- Offline support

## Future Enhancements

- Advanced search functionality
- Product recommendations
- Payment integration
- Analytics dashboard
- Enhanced admin features
- Multi-language support

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
