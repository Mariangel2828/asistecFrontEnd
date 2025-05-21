import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '@/features/auth/context/AuthContext';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

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
      <Ionicons name="person-circle-outline" size={96} color="#466887" style={styles.icon} />
      <Text style={styles.title}>Mi perfil</Text>

      <View style={styles.info}>
        <Text style={styles.label}>Nombre completo:</Text>
        <Text style={styles.value}>{auth.fullname}</Text>

        <Text style={styles.label}>Correo:</Text>
        <Text style={styles.value}>{auth.email}</Text>

        <Text style={styles.label}>Área:</Text>
        <Text style={styles.value}>{auth.area}</Text>

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
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center', // centra verticalmente
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
    color: '#2c3e50',
  },
  info: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  logoutButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#cc4444',
    backgroundColor: '#fff',
  },
  logoutText: {
    color: '#cc4444',
    fontWeight: '600',
    fontSize: 14,
  },
});
