# ToolWarehouse Mobile App

A React Native mobile application for mechanics to browse and purchase tools and equipment. Built with Expo, Firebase, and TypeScript.

## Features

- User Authentication (Mechanics & Admin)
- Product Catalog with Categories
- Shopping Cart
- Order Management
- Real-time Order Tracking
- Push Notifications

## Tech Stack

- **Frontend:** React Native (Expo)
- **Database:** Firebase Firestore
- **Authentication:** Firebase Authentication
- **State Management:** React Context API
- **Admin Panel:** React Web App

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- Firebase account and project

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/toolwarehouse-app.git
cd toolwarehouse-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory with your Firebase configuration:
```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

## Project Structure

```
tw-app/
├── app/                    # Main application screens
│   ├── (auth)/            # Authentication screens
│   ├── (tabs)/            # Main tab screens
│   └── product/           # Product-related screens
├── components/            # Reusable components
├── config/               # Configuration files
├── contexts/             # React Context providers
├── services/             # API and service functions
├── types/                # TypeScript type definitions
└── assets/              # Static assets
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
