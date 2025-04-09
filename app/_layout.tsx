// app/_layout.tsx (si usás Expo Router moderno)
import { Stack } from 'expo-router';
import { AuthProvider } from '../features/auth/context/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack />
    </AuthProvider>
  );
}
