import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

type Event = {
  id: string;
  title: string;
  date: string;
  type: 'curso' | 'evento' | 'actividad';
};

export default function EventPreview({ event }: { event: Event }) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/(tabs)/events`);
  };

  return (
    <Pressable onPress={handlePress} style={styles.pressable}>
      <View style={styles.container}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.info}>📅 {event.date}</Text>
        <Text style={styles.type}>Tipo: {event.type}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    marginBottom: 20,
  },
  container: {
    backgroundColor: '#fff',
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderRadius: 12,
    minHeight: 120,

    // Sombra sutil (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,

    // Elevación (Android)
    elevation: 2,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  info: {
    fontSize: 14,
    color: '#777',
    marginBottom: 4,
  },
  type: {
    fontSize: 14,
    color: '#777',
  },
});
