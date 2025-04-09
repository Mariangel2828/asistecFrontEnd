import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Event = {
  id: string;
  title: string;
  date: string;
  type: 'curso' | 'evento' | 'actividad';
};

export default function EventPreview({ event }: { event: Event }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.info}>📅 {event.date}</Text>
      <Text style={styles.type}>Tipo: {event.type}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  title: { fontSize: 16, fontWeight: 'bold' },
  info: { fontSize: 14, color: '#555' },
  type: { fontSize: 14, color: '#888' },
});
