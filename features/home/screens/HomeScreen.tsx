import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
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
    <View style={styles.container}>
      <Text style={styles.header}>Hola {auth?.fullname} 👋</Text>

      <Text style={styles.sectionTitle}>Próximos eventos</Text>
      <FlatList
        data={events.slice(0, 3)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventPreview event={item} />}
      />
      <TouchableOpacity
        style={styles.flatButton}
        onPress={() => router.push('/(tabs)/events')}
      >
        <Text style={styles.flatButtonText}>Ver todos los eventos</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Últimas noticias</Text>
      <FlatList
        data={news.slice(0, 3)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NewsPreview news={item} />}
      />
      <TouchableOpacity
        style={styles.flatButton}
        onPress={() => router.push('/(tabs)/channels')}
      >
        <Text style={styles.flatButtonText}>Ver todas las noticias</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: 50,
    marginBottom: 20,
  },
  flatButton: {
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#466887', // azul pastel
    borderRadius: 10,
    alignItems: 'center',
  },
  flatButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
