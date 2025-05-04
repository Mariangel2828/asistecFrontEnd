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
    marginBottom: 10,
  },
  container: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  title: { fontSize: 16, fontWeight: 'bold' },
  info: { fontSize: 14, color: '#555' },
  type: { fontSize: 14, color: '#888' },
});
