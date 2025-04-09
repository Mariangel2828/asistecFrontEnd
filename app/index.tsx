import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/features/auth/context/AuthContext';

export default function Index() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bienvenido a Asistec 👋</Text>
      <Button title="Ir a crear cuenta" onPress={() => router.push('/register')} />
      <Button title="Ir a iniciar sesión" onPress={() => router.push('/login')} />
    </View>
  );
}
