# Deployment Documentation

## Overview

This document outlines the deployment strategy and process for the ToolWarehouse mobile application. We use a multi-environment approach with automated deployment pipelines for both iOS and Android platforms.

## Environments

### 1. Development
- Purpose: Local development and testing
- Branch: `develop`
- Firebase Project: `toolwarehouse-dev`
- App Store: Not deployed
- Play Store: Not deployed

### 2. Staging
- Purpose: Testing and QA
- Branch: `staging`
- Firebase Project: `toolwarehouse-staging`
- App Store: Internal Testing
- Play Store: Internal Testing

### 3. Production
- Purpose: Live user environment
- Branch: `main`
- Firebase Project: `toolwarehouse-prod`
- App Store: Production
- Play Store: Production

## Deployment Process

### 1. Development Deployment

#### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android
```

#### Development Build
```bash
# iOS development build
npm run build:ios:dev

# Android development build
npm run build:android:dev
```

### 2. Staging Deployment

#### Build Process
```bash
# Create staging build
npm run build:staging

# Deploy to Firebase
npm run deploy:staging
```

#### App Store Connect
1. Archive the app
2. Upload to App Store Connect
3. Submit for internal testing

#### Play Store
1. Generate signed APK/Bundle
2. Upload to Play Console
3. Submit for internal testing

### 3. Production Deployment

#### Build Process
```bash
# Create production build
npm run build:prod

# Deploy to Firebase
npm run deploy:prod
```

#### App Store
1. Archive the app
2. Upload to App Store Connect
3. Submit for review

#### Play Store
1. Generate signed APK/Bundle
2. Upload to Play Console
3. Submit for review

## Build Configuration

### 1. iOS Configuration

#### Development
```json
{
  "bundleId": "com.toolwarehouse.dev",
  "buildNumber": "1.0.0",
  "version": "1.0.0",
  "environment": "development"
}
```

#### Staging
```json
{
  "bundleId": "com.toolwarehouse.staging",
  "buildNumber": "1.0.0",
  "version": "1.0.0",
  "environment": "staging"
}
```

#### Production
```json
{
  "bundleId": "com.toolwarehouse",
  "buildNumber": "1.0.0",
  "version": "1.0.0",
  "environment": "production"
}
```

### 2. Android Configuration

#### Development
```json
{
  "applicationId": "com.toolwarehouse.dev",
  "versionCode": 1,
  "versionName": "1.0.0",
  "environment": "development"
}
```

#### Staging
```json
{
  "applicationId": "com.toolwarehouse.staging",
  "versionCode": 1,
  "versionName": "1.0.0",
  "environment": "staging"
}
```

#### Production
```json
{
  "applicationId": "com.toolwarehouse",
  "versionCode": 1,
  "versionName": "1.0.0",
  "environment": "production"
}
```

## Continuous Integration/Deployment

### 1. GitHub Actions Workflow

```yaml
name: Deploy

on:
  push:
    branches: [ main, staging, develop ]
  pull_request:
    branches: [ main, staging, develop ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test
      
    - name: Build app
      run: |
        if [ ${{ github.ref }} = 'refs/heads/main' ]; then
          npm run build:prod
        elif [ ${{ github.ref }} = 'refs/heads/staging' ]; then
          npm run build:staging
        else
          npm run build:dev
        fi
      
    - name: Deploy to Firebase
      run: |
        if [ ${{ github.ref }} = 'refs/heads/main' ]; then
          npm run deploy:prod
        elif [ ${{ github.ref }} = 'refs/heads/staging' ]; then
          npm run deploy:staging
        else
          npm run deploy:dev
        fi
      
    - name: Deploy to App Store
      if: github.ref == 'refs/heads/main'
      run: npm run deploy:ios:prod
      
    - name: Deploy to Play Store
      if: github.ref == 'refs/heads/main'
      run: npm run deploy:android:prod
```

### 2. Environment Variables

```bash
# Development
FIREBASE_PROJECT_ID=toolwarehouse-dev
FIREBASE_API_KEY=dev_api_key
FIREBASE_AUTH_DOMAIN=toolwarehouse-dev.firebaseapp.com

# Staging
FIREBASE_PROJECT_ID=toolwarehouse-staging
FIREBASE_API_KEY=staging_api_key
FIREBASE_AUTH_DOMAIN=toolwarehouse-staging.firebaseapp.com

# Production
FIREBASE_PROJECT_ID=toolwarehouse-prod
FIREBASE_API_KEY=prod_api_key
FIREBASE_AUTH_DOMAIN=toolwarehouse-prod.firebaseapp.com
```

## Monitoring and Analytics

### 1. Firebase Analytics

- User engagement
- Crash reporting
- Performance monitoring
- Custom events

### 2. App Store Connect

- App analytics
- User feedback
- Crash reports
- Performance metrics

### 3. Play Console

- App analytics
- User feedback
- Crash reports
- Performance metrics

## Rollback Process

### 1. App Store Rollback

1. Identify the last stable version
2. Archive the app
3. Upload to App Store Connect
4. Submit for review

### 2. Play Store Rollback

1. Identify the last stable version
2. Generate signed APK/Bundle
3. Upload to Play Console
4. Submit for review

### 3. Firebase Rollback

1. Identify the last stable version
2. Deploy previous version
3. Verify functionality
4. Monitor for issues

## Security Considerations

### 1. Code Signing

- iOS certificates
- Android keystore
- Secure storage
- Access control

### 2. Environment Variables

- Secure storage
- Access control
- Rotation policy
- Audit logging

### 3. API Keys

- Secure storage
- Access control
- Rotation policy
- Usage monitoring

## Performance Optimization

### 1. Build Optimization

- Code splitting
- Asset optimization
- Bundle size reduction
- Cache optimization

### 2. Runtime Optimization

- Memory management
- Network optimization
- Image optimization
- State management

## Deployment Checklist

### 1. Pre-deployment

- [ ] Run all tests
- [ ] Update version numbers
- [ ] Update changelog
- [ ] Review code changes
- [ ] Check dependencies
- [ ] Verify environment variables
- [ ] Test on multiple devices
- [ ] Check performance metrics

### 2. Deployment

- [ ] Create build
- [ ] Deploy to Firebase
- [ ] Upload to stores
- [ ] Submit for review
- [ ] Monitor deployment
- [ ] Verify functionality
- [ ] Check analytics
- [ ] Monitor errors

### 3. Post-deployment

- [ ] Monitor performance
- [ ] Check user feedback
- [ ] Review analytics
- [ ] Update documentation
- [ ] Schedule maintenance
- [ ] Plan next release

## Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [App Store Connect](https://appstoreconnect.apple.com)
- [Play Console](https://play.google.com/console)
- [GitHub Actions](https://docs.github.com/en/actions)
- [React Native Deployment](https://reactnative.dev/docs/deployment) 