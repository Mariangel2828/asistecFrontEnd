import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useEvents } from '@/features/home/hooks/useEvents';
import { useNews } from '@/features/home/hooks/useNews';
import EventPreview from '@/features/home/components/EventPreview';
import NewsPreview from '@/features/home/components/NewsPreview';
import { useAuth } from '@/features/auth/context/AuthContext';


export default function HomeScreen() {
    const router = useRouter();
    const { events } = useEvents(); // 🔄 Filtra 3 más próximos
    const { news } = useNews();     // 🔄 Filtra 3 más recientes
    const { auth } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hola {auth?.fullname} 👋</Text>

      <Text style={styles.sectionTitle}>📅 Próximos eventos</Text>
      <FlatList
        data={events.slice(0, 3)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventPreview event={item} />}
      />
      <Button title="Ver todos los eventos" onPress={() => router.push('/') /**/} />

      <Text style={styles.sectionTitle}>📰 Últimas noticias</Text>
      <FlatList
        data={news.slice(0, 3)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NewsPreview news={item} />}
      />
      <Button title="Ver todas las noticias" onPress={() => router.push('/') /**/} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 40 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginTop: 20, marginBottom: 10 },
});
