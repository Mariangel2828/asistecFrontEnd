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
 * (ya sea "Ver publicaciones" o "Suscribirse").
 * - onUnsubscribe (function, opcional): Callback que se ejecuta al presionar "Desuscribirse".
 * Solo se muestra si `isSubscribed` es `true`.
 *
 * Estilos:
 * - Muestra una tarjeta con botones estilizados para cada acción.
 */

// List of channel names where the unsubscribe button should not be shown.
const area_names = [
    "DEVESA",
    "Escuela Ciencias Naturales y Exactas San Carlos",
    "Escuela de Ciencias del Lenguaje San Carlos",
];

export default function ChannelCard({ name, description, isSubscribed, onPress, onUnsubscribe }: Props) {
    // Check if the current channel's name is in the restricted list.
    const isRestricted = area_names.includes(name);

    return (
        <View style={styles.card}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.description}>{description}</Text>

            <TouchableOpacity style={styles.primaryButton} onPress={onPress}>
                <Text style={styles.primaryText}>
                    {isSubscribed ? 'Ver publicaciones' : 'Suscribirse'}
                </Text>
            </TouchableOpacity>

            {/* Conditionally render the unsubscribe button */}
            {isSubscribed && onUnsubscribe && !isRestricted && (
                <TouchableOpacity style={styles.secondaryButton} onPress={onUnsubscribe}>
                    <Text style={styles.secondaryText}>Desuscribirse</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        alignItems: 'center', // centra contenido horizontalmente
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
        color: '#2c3e50',
        textAlign: 'center',
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
        textAlign: 'center',
    },
    primaryButton: {
        width: '100%',
        backgroundColor: '#466887',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    primaryText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
    secondaryButton: {
        width: '100%',
        backgroundColor: '#EDEDED',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    secondaryText: {
        color: '#466887',
        fontWeight: '600',
        fontSize: 14,
    },
});