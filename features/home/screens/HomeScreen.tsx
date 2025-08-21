import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import { useEvents } from "@/features/home/hooks/useEvents";
import { useNews } from "@/features/home/hooks/useNews";
import EventPreview from "@/features/home/components/EventPreview";
import NewsPreview from "@/features/home/components/NewsPreview";
import { useAuth } from "@/features/auth/context/AuthContext";

export default function HomeScreen() {
  const router = useRouter();
  const {
    events,
    loading: loadingEvents,
    refetch: refetchEvents,
  } = useEvents();
  const { news, loading: loadingNews, refetch: refetchNews } = useNews();
  const { auth } = useAuth();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await Promise.all([refetchEvents(), refetchNews()]);
    setIsRefreshing(false);
  }, [refetchEvents, refetchNews]);

  return (
    <ScrollView
      style={styles.container} // Use style instead of contentContainerStyle here
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          colors={["#466887"]}
          tintColor={"#466887"}
        />
      }
    >
      <ImageBackground
        source={{
          uri: "https://www.tec.ac.cr/system/files/media/img/main/sedes-tec-san-carlos.png",
        }}
        style={styles.banner}
        imageStyle={styles.bannerImage}
      >
        <View style={styles.bannerOverlay}>
          <Text style={styles.header}>Hola {auth?.fullname}!</Text>
          <Text style={styles.bannerText}>
            Tu portal de eventos y noticias estudiantiles.
          </Text>
        </View>
      </ImageBackground>

      <View style={styles.contentContainer}>
        {/* Events Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Próximos eventos</Text>
          {loadingEvents ? (
            <ActivityIndicator
              style={styles.loader}
              size="large"
              color="#466887"
            />
          ) : events.length > 0 ? (
            events
              .slice(0, 3)
              .map((event) => <EventPreview key={event.id} event={event} />)
          ) : (
            <Text style={styles.emptyMessage}>No tienes eventos próximos.</Text>
          )}
          <TouchableOpacity
            style={styles.flatButton}
            onPress={() => router.push("/(tabs)/events")}
          >
            <Text style={styles.flatButtonText}>Ver todos los eventos</Text>
          </TouchableOpacity>
        </View>

        {/* News Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Últimas noticias</Text>
          {loadingNews ? (
            <ActivityIndicator
              style={styles.loader}
              size="large"
              color="#466887"
            />
          ) : news.length > 0 ? (
            news.map((n) => <NewsPreview key={n.id} news={n} />)
          ) : (
            <Text style={styles.emptyMessage}>
              No hay noticias en tus canales favoritos.
            </Text>
          )}
          <TouchableOpacity
            style={styles.flatButton}
            onPress={() => router.push("/(tabs)/channels")}
          >
            <Text style={styles.flatButtonText}>Ver todas las noticias</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9", // Set the background color here
  },
  banner: {
    width: "100%",
    height: 200,
    justifyContent: "flex-end",
    marginBottom: 48
  },
  bannerImage: {
    resizeMode: "cover",
  },
  bannerOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.46)",
    padding: 20,
    paddingBottom: 40,
    paddingTop: "100%",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  bannerText: {
    fontSize: 16,
    color: "#fff",
  },
  contentContainer: {
    padding: 20,
    marginTop: -40, // Adjusted to better overlap with the banner
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 16,
  },
  loader: {
    marginVertical: 20,
  },
  emptyMessage: {
    textAlign: "center",
    color: "#666",
    fontStyle: "italic",
    marginVertical: 20,
  },
  flatButton: {
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#466887",
    borderRadius: 10,
    alignItems: "center",
  },
  flatButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
