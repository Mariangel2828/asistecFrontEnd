import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

type News = {
  id: string;
  title: string;
  date: string;
};

export default function NewsPreview({ news }: { news: News }) {
  return (
    <View style={styles.card}>
      <View style={styles.banner}>
        <Text style={styles.bannerText}>📰 DEVESA</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{news.title}</Text>
        <Text style={styles.date}>{news.date}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  banner: {
    backgroundColor: '#dce6f2', // azul claro editorial
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  bannerText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#466887',
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#777',
  },
});
