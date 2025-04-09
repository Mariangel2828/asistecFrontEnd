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
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#e8f4ff',
  },
  title: { fontSize: 16, fontWeight: '600' },
  date: { fontSize: 13, color: '#555' },
});
