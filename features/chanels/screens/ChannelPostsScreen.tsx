import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useChannelPosts } from '../hooks/useChannelPosts';
import moment from 'moment';

/**
 * ChannelPostsScreen
 *
 * Pantalla que muestra las publicaciones (posts) de un canal específico.
 * Utiliza `useLocalSearchParams` para obtener el ID y nombre del canal desde la URL.
 * Los posts se obtienen a través del hook `useChannelPosts`, que consulta al backend.
 * 
 * Características:
 * - Muestra un encabezado con el nombre del canal
 * - Muestra una lista de publicaciones con título, contenido y fecha
 * - Formatea la fecha desde el formato "DD/MM/YYYY HH:mm"
 * - Muestra un loader mientras carga, o un mensaje si no hay publicaciones
 * 
 * Params esperados en la URL (vía Expo Router):
 * - id: ID numérico del canal
 * - name: nombre del canal (string)
 *
 * Ejemplo de uso de ruta:
 * router.push({ pathname: '/chanels/posts', params: { id: canal.channel_id, name: canal.channel_name } })
 * 
 */

const getBadgeStyle = (category: string) => {
    switch (category.toLowerCase()) {
        case 'extracurricular':
            return { backgroundColor: '#4caf50', label: 'Extracurricular' }; // verde
        case 'urgente':
            return { backgroundColor: '#f44336', label: 'Urgente' }; // rojo
        case 'académico':
            return { backgroundColor: '#2196f3', label: 'Académico' }; // azul
        default:
            return { backgroundColor: '#9e9e9e', label: 'General' }; // gris
    }
};

export default function ChannelPostsScreen() {
    const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
    const { posts, loading } = useChannelPosts(Number(id));



    const renderItem = ({ item }: { item: any }) => {

        const badge = getBadgeStyle(item.tags || '');

        return (
            <View style={styles.card}>
                <View style={[styles.badge, { backgroundColor: badge.backgroundColor }]}>
                    <Text style={styles.badgeText}>{badge.label}</Text>
                </View>
                <Text style={styles.title}>{item.title?.trim() ? item.title : 'Sin título'}</Text>
                <Text style={styles.body}>{item.content}</Text>
                <Text style={styles.date}>
                    {moment(item.date, 'DD/MM/YYYY HH:mm').format('DD [de] MMMM [de] YYYY, HH:mm')}
                </Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>📰 {name}</Text>

            {loading ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color="#007bff" />
                    <Text style={styles.loadingText}>Cargando publicaciones...</Text>
                </View>
            ) : (
                <FlatList
                    data={posts}
                    keyExtractor={(item) => item.post_id.toString()}
                    renderItem={renderItem}
                    ListEmptyComponent={
                        <Text style={styles.empty}>Este canal no tiene publicaciones.</Text>
                    }
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 40, backgroundColor: '#fff' },
    header: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    loadingText: { marginTop: 10, fontSize: 14, color: '#555' },
    card: {
        backgroundColor: '#f8f9fa',
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
        elevation: 2, // sombra en Android
        shadowColor: '#000', // sombra en iOS
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    title: { fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
    body: { fontSize: 14, color: '#444', marginBottom: 6 },
    date: { fontSize: 12, color: '#888', fontStyle: 'italic' },
    empty: { marginTop: 20, textAlign: 'center', color: '#777', fontStyle: 'italic' },
    badge: {
        alignSelf: 'flex-end',
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginBottom: 8,
    },
    badgeText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
});
