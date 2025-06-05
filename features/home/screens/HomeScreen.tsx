import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { useEvents } from '@/features/home/hooks/useEvents';
import { useNews } from '@/features/home/hooks/useNews';
import EventPreview from '@/features/home/components/EventPreview';
import NewsPreview from '@/features/home/components/NewsPreview';
import { useAuth } from '@/features/auth/context/AuthContext';

export default function HomeScreen() {
  const router = useRouter();
  const { events, loading: loadingEvents, refetch: refetchEvents } = useEvents();
  const { news, loading: loadingNews, refetch: refetchNews } = useNews();
  const { auth } = useAuth();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    // Refrescamos ambos al mismo tiempo
    await Promise.all([refetchEvents(), refetchNews()]);
    setIsRefreshing(false);
  }, [refetchEvents, refetchNews]);



  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={['#466887']}
            tintColor={'#466887'}
        />
      }
    >
      <Text style={styles.header}>Hola {auth?.fullname} 👋</Text>

      <Text style={styles.sectionTitle}>Próximos eventos</Text>
      <View style={styles.fixedSection}>
        {loadingEvents ? (
          <ActivityIndicator style={styles.loader} size="large" color="#466887" />
        ) : events.length > 0 ? (
          events.slice(0, 3).map((event) => (
            <EventPreview key={event.id} event={event} />
          ))
        ) : (
          <Text style={styles.emptyMessage}>No tienes eventos próximos.</Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.flatButton}
        onPress={() => router.push('/(tabs)/events')}
      >
        <Text style={styles.flatButtonText}>Ver todos los eventos</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Últimas noticias</Text>
      <View style={styles.fixedSection}>
        {loadingNews ? (
          <ActivityIndicator style={styles.loader} size="large" color="#466887" />
        ) : news.length > 0 ? (
          news.map((n) => (
            <NewsPreview key={n.id} news={n} />
          ))
        ) : (
          <Text style={styles.emptyMessage}>No hay noticias en tus canales favoritos.</Text>
        )}
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

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 60,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginTop: 30,
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
  loader: {
    marginVertical: 20,
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    marginVertical: 20,
  }
});