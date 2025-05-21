import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type News = {
  id: string;
  title: string;
  date: string;
};

export default function NewsPreview({ news }: { news: News }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{news.title}</Text>
      <Text style={styles.date}>🗓 {news.date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 24, // más alto
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    minHeight: 120, // asegura altura mínima

    // Sombra suave para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,

    // Elevación para Android
    elevation: 2,
    justifyContent: 'center', // centra contenido verticalmente
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  date: {
    fontSize: 14,
    color: '#777',
  },
});
