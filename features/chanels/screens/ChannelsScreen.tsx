import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useChannels } from '../hooks/useChannels';
import ChannelSection from '../components/ChannelSection';
import { subscribeToChannel, unsubscribeFromChannel } from '../services/channelService';
import { useAuth } from '@/features/auth/context/AuthContext';
import { useRouter } from 'expo-router';

/**
 * ChannelsScreen
 *
 * Pantalla principal del apartado de canales. Permite al usuario:
 * - Ver los canales a los que está suscrito
 * - Ver canales disponibles a los que aún no está suscrito
 * - Suscribirse a nuevos canales
 * - Desuscribirse de canales actuales
 * - Navegar a la vista de publicaciones de un canal
 *
 * Funcionalidades:
 * - Usa el hook `useChannels` para cargar los canales suscritos y no suscritos
 * - Usa `subscribeToChannel` y `unsubscribeFromChannel` para manejar suscripciones
 * - Navega a `/chanels/posts?id=...&name=...` al ver publicaciones de un canal
 * - Se apoya en el componente `ChannelSection` para mostrar cada grupo de canales
 *
 * Dependencias:
 * - `useAuth`: para obtener el userId actual
 * - `useRouter`: para navegar con expo-router
 *
 * Nota:
 * - Si hay cambios de suscripción, se actualiza la lista usando `refetch()`
 */

export default function ChannelsScreen() {
    const { auth } = useAuth();
    const router = useRouter();
    const { subscribed, available, loading, refetch } = useChannels();

    const handlePress = async (channel: any, isSubscribed: boolean) => {
        if (isSubscribed) {
            router.push({
                pathname: '/chanels/posts',
                params: {
                id: channel.channel_id,
                name: channel.channel_name,
                },
            });
            } else {
            try {
                await subscribeToChannel(auth.userId, channel.channel_id, false, true);
                await refetch();
            } catch (err) {
                console.error('Error al suscribirse:', err);
            }
            }
        };

    const handleUnsubscribe = async (channel: any) => {
        try {
            await unsubscribeFromChannel(auth.userId, channel.channel_id);
          await refetch(); // Actualiza listas tras desuscripción
        } catch (err) {
            console.error('Error al desuscribirse:', err);
        }
    };


    if (loading) {
        return (
        <View style={styles.center}>
            <ActivityIndicator size="large" color="#007bff" />
            <Text>Cargando canales...</Text>
        </View>
        );
    }

return (
        <View style={styles.container}>
        <ChannelSection
            title="Canales suscritos"
            channels={subscribed}
            isSubscribed={true}
            onPress={(c) => handlePress(c, true)}
            emptyMessage="No estás suscrito a ningún canal."
            onUnsubscribe={(c) => handleUnsubscribe(c)} // Pass the unsubscribe function
        />

        <ChannelSection
            title="Canales disponibles"
            channels={available}
            isSubscribed={false}
            onPress={(c) => handlePress(c, false)}
            emptyMessage="No hay nuevos canales disponibles."
        />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      paddingTop: 40,
      backgroundColor: '#F9FAFB', // fondo general suave
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F9FAFB',
    },
  });
  