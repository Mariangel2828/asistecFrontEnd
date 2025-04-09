import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useChannels } from '../hooks/useChannels';
import ChannelSection from '../components/ChannelSection';
import { subscribeToChannel } from '../services/channelService';
import { useAuth } from '@/features/auth/context/AuthContext';

export default function ChannelsScreen() {
    const { auth } = useAuth();
    const { subscribed, available, loading, refetch } = useChannels();

    const handlePress = async (channel: any, isSubscribed: boolean) => {
        if (isSubscribed) {
        console.log(`Ir a publicaciones del canal ${channel.channel_name}`);
        } else {
        try {
            await subscribeToChannel(auth.userId, channel.channel_id, false, false); // usuario normal
            await refetch(); // refresca los datos para ver el canal ya suscrito
        } catch (err) {
            console.error('Error al suscribirse:', err);
        }
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
            title="🔔 Canales suscritos"
            channels={subscribed}
            isSubscribed={true}
            onPress={(c) => handlePress(c, true)}
            emptyMessage="No estás suscrito a ningún canal."
        />

        <ChannelSection
            title="➕ Canales disponibles"
            channels={available}
            isSubscribed={false}
            onPress={(c) => handlePress(c, false)}
            emptyMessage="No hay nuevos canales disponibles."
        />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 40 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
