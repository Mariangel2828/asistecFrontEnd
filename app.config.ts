import 'dotenv/config';
import { ExpoConfig } from '@expo/config';

const config: ExpoConfig = {
  name: 'Asistec',
  slug: 'asistec',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'myapp',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  ios: {
    bundleIdentifier: 'com.rooseveltalej.asistec', 
    supportsTablet: true,
  },
  android: {
    package: 'com.rooseveltalej.asistec',
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash-icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: '2cb9475e-a091-480a-963e-99cf3302aaff',
    },
    API_URL_DEV: process.env.API_URL_DEV, // variable de entorno que se usa en el código
  },
  owner: 'rooseveltalej',
};

export default {
  expo: config,
};
