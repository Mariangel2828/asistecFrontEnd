import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
    name: string;
    description: string;
    isSubscribed: boolean;
    onPress: () => void;
    onUnsubscribe?: () => void;
};

/**
 * ChannelCard
 *
 * Componente visual que representa una tarjeta con información de un canal.
 * Puede ser utilizado tanto para canales suscritos como no suscritos.
 *
 * Props:
 * - name (string): Nombre del canal a mostrar.
 * - description (string): Descripción del canal.
 * - isSubscribed (boolean): Indica si el usuario está suscrito al canal.
 * - onPress (function): Callback que se ejecuta al presionar el botón principal
 *   (ya sea "Ver publicaciones" o "Suscribirse").
 * - onUnsubscribe (function, opcional): Callback que se ejecuta al presionar "Desuscribirse".
 *   Solo se muestra si `isSubscribed` es `true`.
 *
 * Estilos:
 * - Muestra una tarjeta con botones estilizados para cada acción.
 */

export default function ChannelCard({ name, description, isSubscribed, onPress, onUnsubscribe }: Props) {
return (
    <View style={styles.card}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{description}</Text>

        <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>
            {isSubscribed ? 'Ver publicaciones' : 'Suscribirse'}
        </Text>
        </TouchableOpacity>

        {isSubscribed && (
        <TouchableOpacity style={styles.unsubscribeButton} onPress={onUnsubscribe}>
            <Text style={styles.unsubscribeText}>Desuscribirse</Text>
        </TouchableOpacity>
        )}
    </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 12,
        marginBottom: 12,
    },
    title: { fontSize: 16, fontWeight: '600' },
    description: { fontSize: 14, color: '#555', marginBottom: 8 },
    button: {
        alignSelf: 'flex-start',
        backgroundColor: '#007bff',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
        marginBottom: 8,
    },
    buttonText: { color: '#fff', fontWeight: 'bold' },
    unsubscribeButton: {
        alignSelf: 'flex-start',
        backgroundColor: '#dc3545',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    unsubscribeText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    });
