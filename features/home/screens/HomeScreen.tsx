import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useEvents } from '@/features/home/hooks/useEvents';
import { useNews } from '@/features/home/hooks/useNews';
import EventPreview from '@/features/home/components/EventPreview';
import NewsPreview from '@/features/home/components/NewsPreview';
import { useAuth } from '@/features/auth/context/AuthContext';

export default function HomeScreen() {
  const router = useRouter();
  const { events } = useEvents();
  const { news } = useNews();
  const { auth } = useAuth();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Hola {auth?.fullname} 👋</Text>

      <Text style={styles.sectionTitle}>Próximos eventos</Text>
      <View style={styles.fixedSection}>
        {events.slice(0, 3).map((event) => (
          <EventPreview key={event.id} event={event} />
        ))}
      </View>
      <TouchableOpacity
        style={styles.flatButton}
        onPress={() => router.push('/(tabs)/events')}
      >
        <Text style={styles.flatButtonText}>Ver todos los eventos</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Últimas noticias</Text>
      <View style={styles.fixedSection}>
        {news.slice(0, 3).map((n) => (
          <NewsPreview key={n.id} news={n} />
        ))}
      </View>
      <TouchableOpacity
        style={styles.flatButton}
        onPress={() => router.push('/(tabs)/channels')}
      >
        <Text style={styles.flatButtonText}>Ver todas las noticias</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const CARD_HEIGHT = 140; // Altura aproximada por card (ajusta según diseño final)
const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 40,
    marginBottom: 16,
  },
  fixedSection: {
    gap: 0, 
  },
  flatButton: {
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#466887',
    borderRadius: 10,
    alignItems: 'center',
  },
  flatButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
