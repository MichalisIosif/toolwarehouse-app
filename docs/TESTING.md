# Testing Documentation

## Overview

This document outlines the testing strategy, setup, and guidelines for the ToolWarehouse mobile application. We use a comprehensive testing approach that includes unit tests, integration tests, and end-to-end tests.

## Testing Stack

### Unit Testing
- Jest
- React Native Testing Library
- @testing-library/jest-native

### Integration Testing
- Detox
- Firebase Emulator Suite

### End-to-End Testing
- Cypress (for web components)
- Detox (for mobile components)

## Setup

### 1. Install Dependencies

```bash
npm install --save-dev @testing-library/react-native @testing-library/jest-native jest detox cypress @testing-library/cypress
```

### 2. Jest Configuration

Create `jest.config.js`:

```javascript
module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@react-native-community)/)',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

### 3. Detox Configuration

Create `.detoxrc.js`:

```javascript
module.exports = {
  testRunner: {
    args: {
      $0: 'jest',
      config: 'e2e/jest.config.js',
    },
    jest: {
      setupTimeout: 120000,
    },
  },
  apps: {
    'ios.debug': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/ToolWarehouse.app',
      build: 'xcodebuild -workspace ios/ToolWarehouse.xcworkspace -scheme ToolWarehouse -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build',
    },
    'ios.release': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Release-iphonesimulator/ToolWarehouse.app',
      build: 'xcodebuild -workspace ios/ToolWarehouse.xcworkspace -scheme ToolWarehouse -configuration Release -sdk iphonesimulator -derivedDataPath ios/build',
    },
    'android.debug': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      build: 'cd android && ./gradlew assembleDebug',
      reversePorts: [
        { host: 9090, device: 9090 },
      ],
    },
    'android.release': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/release/app-release.apk',
      build: 'cd android && ./gradlew assembleRelease',
    },
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 12',
      },
    },
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: 'Pixel_3a_API_30_x86',
      },
    },
    attached: {
      type: 'android.attached',
      device: {
        adbName: '.*',
      },
    },
  },
  configurations: {
    'ios.sim.debug': {
      app: 'ios.debug',
      device: 'simulator',
    },
    'ios.sim.release': {
      app: 'ios.release',
      device: 'simulator',
    },
    'android.emu.debug': {
      app: 'android.debug',
      device: 'emulator',
    },
    'android.emu.release': {
      app: 'android.release',
      device: 'emulator',
    },
    'android.att.debug': {
      app: 'android.debug',
      device: 'attached',
    },
    'android.att.release': {
      app: 'android.release',
      device: 'attached',
    },
  },
};
```

### 4. Cypress Configuration

Create `cypress.config.js`:

```javascript
module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
    },
  },
};
```

## Testing Guidelines

### 1. Unit Tests

#### Component Testing

```typescript
// ProductCard.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProductCard from '../components/ProductCard';

describe('ProductCard', () => {
  const mockProduct = {
    id: '1',
    name: 'Test Product',
    price: 99.99,
    image: 'test.jpg',
  };

  it('renders product information correctly', () => {
    const { getByText, getByTestId } = render(
      <ProductCard product={mockProduct} onPress={() => {}} />
    );

    expect(getByText('Test Product')).toBeTruthy();
    expect(getByText('$99.99')).toBeTruthy();
    expect(getByTestId('product-image')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <ProductCard product={mockProduct} onPress={onPress} />
    );

    fireEvent.press(getByTestId('product-card'));
    expect(onPress).toHaveBeenCalledWith(mockProduct);
  });
});
```

#### Hook Testing

```typescript
// useCart.test.ts
import { renderHook, act } from '@testing-library/react-hooks';
import useCart from '../hooks/useCart';

describe('useCart', () => {
  it('adds item to cart', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addItem({
        id: '1',
        name: 'Test Product',
        price: 99.99,
      });
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.total).toBe(99.99);
  });
});
```

### 2. Integration Tests

#### Firebase Integration

```typescript
// auth.test.ts
import { initializeTestEnvironment } from '@firebase/rules-unit-testing';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

describe('Authentication', () => {
  let testEnv;

  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: 'demo-toolwarehouse',
    });
  });

  afterAll(async () => {
    await testEnv.cleanup();
  });

  it('signs in user with valid credentials', async () => {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      'test@example.com',
      'password123'
    );

    expect(userCredential.user).toBeTruthy();
    expect(userCredential.user.email).toBe('test@example.com');
  });
});
```

### 3. End-to-End Tests

#### Detox Tests

```typescript
// login.e2e.ts
import { by, device, element, expect } from 'detox';

describe('Login Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should login successfully', async () => {
    await element(by.id('email-input')).typeText('test@example.com');
    await element(by.id('password-input')).typeText('password123');
    await element(by.id('login-button')).tap();

    await expect(element(by.id('home-screen'))).toBeVisible();
  });
});
```

#### Cypress Tests

```typescript
// login.cy.ts
describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should login successfully', () => {
    cy.get('[data-testid=email-input]').type('test@example.com');
    cy.get('[data-testid=password-input]').type('password123');
    cy.get('[data-testid=login-button]').click();

    cy.url().should('include', '/home');
  });
});
```

## Test Coverage

### Coverage Goals

- Statements: 80%
- Branches: 80%
- Functions: 80%
- Lines: 80%

### Coverage Report

Run coverage report:
```bash
npm run test:coverage
```

## Testing Best Practices

### 1. Component Testing

- Test component rendering
- Test user interactions
- Test prop changes
- Test error states
- Test loading states

### 2. Hook Testing

- Test state updates
- Test side effects
- Test cleanup
- Test error handling

### 3. Integration Testing

- Test API interactions
- Test database operations
- Test authentication flow
- Test state management

### 4. End-to-End Testing

- Test critical user flows
- Test error scenarios
- Test offline behavior
- Test performance

## Continuous Integration

### GitHub Actions Workflow

```yaml
name: Test

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run unit tests
      run: npm test
      
    - name: Run integration tests
      run: npm run test:integration
      
    - name: Run E2E tests
      run: npm run test:e2e
      
    - name: Upload coverage
      uses: codecov/codecov-action@v3
```

## Testing Tools

### 1. Jest

- Unit testing
- Component testing
- Snapshot testing
- Coverage reporting

### 2. React Native Testing Library

- Component testing
- User interaction testing
- Accessibility testing
- Custom queries

### 3. Detox

- End-to-end testing
- Device testing
- Performance testing
- Cross-platform testing

### 4. Cypress

- Web component testing
- API testing
- Visual testing
- Network request testing

## Debugging Tests

### 1. Jest Debugging

```bash
# Run tests in debug mode
npm test -- --debug

# Run specific test file
npm test -- path/to/test.tsx

# Run tests with coverage
npm test -- --coverage
```

### 2. Detox Debugging

```bash
# Run tests in debug mode
detox test -c ios.sim.debug

# Run specific test file
detox test -c ios.sim.debug e2e/login.e2e.ts

# Run tests with logging
detox test -c ios.sim.debug --loglevel trace
```

### 3. Cypress Debugging

```bash
# Open Cypress Test Runner
npm run cypress:open

# Run tests in headless mode
npm run cypress:run

# Run specific test file
npm run cypress:run -- --spec "cypress/e2e/login.cy.ts"
```

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- [Detox Documentation](https://github.com/wix/Detox)
- [Cypress Documentation](https://docs.cypress.io/)
- [Firebase Testing](https://firebase.google.com/docs/emulator-suite) 