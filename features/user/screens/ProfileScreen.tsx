import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '@/features/auth/context/AuthContext';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { auth, setAuth } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    setAuth(null);
    router.replace('/login');
  };

  if (!auth) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Mi perfil</Text>

      <View style={styles.info}>
        <Text style={styles.label}>Nombre completo:</Text>
        <Text style={styles.value}>{auth.fullname}</Text>

        <Text style={styles.label}>Correo:</Text>
        <Text style={styles.value}>{auth.email}</Text>

        <Text style={styles.label}>ID de usuario:</Text>
        <Text style={styles.value}>{auth.userId}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  info: { marginBottom: 30 },
  label: { fontSize: 14, color: '#666' },
  value: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  logoutButton: {
    backgroundColor: '#dc3545',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: { color: '#fff', fontWeight: 'bold' },
});
