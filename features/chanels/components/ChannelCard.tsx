import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
    name: string;
    description: string;
    isSubscribed: boolean;
    onPress: () => void;
};

export default function ChannelCard({ name, description, isSubscribed, onPress }: Props) {
    return (
        <View style={styles.card}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>
            {isSubscribed ? 'Ver publicaciones' : 'Suscribirse'}
            </Text>
        </TouchableOpacity>
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
    },
    buttonText: { color: '#fff', fontWeight: 'bold' },
});
