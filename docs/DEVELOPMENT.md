# Development Guide

## Prerequisites

Before you begin development, ensure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- Git
- Firebase CLI (optional, for Firebase development)
- iOS Simulator (for Mac users) or Android Studio (for Android development)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/MichalisIosif/toolwarehouse-app.git
cd toolwarehouse-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id
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
├── app/                    # Screen components
│   ├── (auth)/            # Authentication screens
│   ├── (tabs)/            # Main app tabs
│   └── _layout.tsx        # Root layout
├── components/            # Reusable UI components
├── config/               # Configuration files
├── contexts/             # React Context providers
├── services/             # Business logic and API calls
├── types/                # TypeScript type definitions
└── assets/              # Static resources
```

## Development Workflow

### 1. Branch Management

- `main`: Production-ready code
- `develop`: Development branch
- Feature branches: `feature/feature-name`
- Bug fix branches: `fix/bug-name`
- Release branches: `release/version`

### 2. Code Style

We follow these coding standards:

- Use TypeScript for type safety
- Follow ESLint rules
- Use Prettier for code formatting
- Write meaningful commit messages
- Document complex functions

### 3. Testing

Run tests:
```bash
npm test
# or
yarn test
```

### 4. Building for Production

iOS:
```bash
npm run ios
# or
yarn ios
```

Android:
```bash
npm run android
# or
yarn android
```

## Common Tasks

### Adding a New Screen

1. Create a new file in the appropriate directory under `app/`
2. Add the screen to the navigation stack
3. Create necessary components
4. Add types to `types/`
5. Update tests

### Adding a New Component

1. Create a new file in `components/`
2. Add TypeScript interfaces
3. Add tests
4. Document props and usage
5. Add to storybook (if applicable)

### Working with Firebase

1. Set up Firebase project
2. Configure security rules
3. Add necessary indexes
4. Test offline functionality
5. Implement error handling

## Debugging

### Common Issues

1. Metro Bundler Issues
```bash
npm start -- --reset-cache
```

2. iOS Build Issues
```bash
cd ios
pod install
cd ..
```

3. Android Build Issues
```bash
cd android
./gradlew clean
cd ..
```

### Debug Tools

- React Native Debugger
- Firebase Console
- Chrome DevTools
- React Native Inspector

## Performance Optimization

### Best Practices

1. Use `React.memo()` for expensive components
2. Implement proper list virtualization
3. Optimize images
4. Use proper caching strategies
5. Implement lazy loading

### Monitoring

1. Use Firebase Performance Monitoring
2. Implement error tracking
3. Monitor network requests
4. Track user interactions
5. Monitor app size

## Security Considerations

1. Never commit sensitive data
2. Use environment variables
3. Implement proper authentication
4. Validate user input
5. Follow security best practices

## Deployment

### Staging

1. Create a staging build
2. Test on multiple devices
3. Verify all features
4. Check performance
5. Validate security

### Production

1. Create a production build
2. Test thoroughly
3. Monitor performance
4. Track errors
5. Gather analytics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## Resources

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Project Wiki](https://github.com/MichalisIosif/toolwarehouse-app/wiki) 