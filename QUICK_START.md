# 🚀 Quick Start Guide

## Running the App

### Option 1: Using npm (Recommended)
```bash
npm start
```

### Option 2: Using npx expo directly
```bash
npx expo start
```

## What Happens Next?

After running `npm start`, you'll see:

1. **A QR Code** in your terminal
2. **Options to press keys:**
   - Press `i` for iOS Simulator (requires Xcode on Mac)
   - Press `a` for Android Emulator (requires Android Studio)
   - Press `w` for Web browser
   - Scan QR code with Expo Go app on your phone

## Using Expo Go App (Easiest for Testing)

1. **Download Expo Go:**
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Scan the QR code:**
   - **iOS**: Open Camera app and scan the QR code
   - **Android**: Open Expo Go app and tap "Scan QR code"

## Running on Web Browser

```bash
npm start
# Then press 'w' in the terminal
```

Or directly:
```bash
npm run web
```

## Troubleshooting

### Clear Cache
If you see errors, try:
```bash
npm start -- --clear
```

### Reinstall Dependencies
```bash
rm -rf node_modules
npm install
npm start
```

### Port Already in Use
If port 8081 is busy:
```bash
npx expo start --port 8082
```

