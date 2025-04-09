import React from 'react';
import { View, Text } from 'react-native';
import { useAuth } from '../context/AuthContext';

export const AuthStatus = () => {
  // this component is just for testing purposes 
  // and will be removed in the final version
  const { auth } = useAuth();

  if (!auth) {
    return <Text style={{ marginTop: 20 }}>🔒 No hay usuario autenticado</Text>;
  }

  return (
    <View style={{ marginTop: 20, alignItems: 'center' }}>
      <Text>✅ Usuario autenticado</Text>
      <Text>ID: {auth.userId}</Text>
      <Text>Nombre: {auth.fullname}</Text>
      <Text>Email: {auth.email}</Text>
    </View>
  );
};