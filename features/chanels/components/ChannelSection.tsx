import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import ChannelCard from './ChannelCard';

type Channel = {
    channel_id: number;
    channel_name: string;
    area_id?: number;
    is_admin?: boolean;
    description: string;
};

type Props = {
    title: string;
    channels: Channel[];
    userAreaId?: number;
    isSubscribed: boolean;
    onPress: (channel: Channel) => void;
    emptyMessage: string;
    onUnsubscribe?: (channel: Channel) => void; 
};


/**
 * ChannelSection
 *
 * Componente que muestra una sección de canales, como por ejemplo:
 * - "Canales suscritos"
 * - "Canales disponibles"
 *
 * Se apoya en el componente `ChannelCard` para renderizar cada canal individualmente.
 * También muestra un mensaje cuando la lista está vacía.
 *
 * Props:
 * - title (string): Título de la sección (ej: "🔔 Canales suscritos").
 * - channels (Channel[]): Arreglo de canales a mostrar. Cada canal debe tener:
 *     - channel_id: número único
 *     - channel_name: nombre del canal
 *     - description: descripción breve
 * - isSubscribed (boolean): Indica si los canales de esta sección son suscritos.
 * - onPress (function): Callback que se ejecuta al presionar el botón principal del canal.
 * - emptyMessage (string): Mensaje que se muestra si `channels` está vacío.
 * - onUnsubscribe (function, opcional): Callback que se ejecuta al presionar "Desuscribirse".
 *     Solo se utiliza si `isSubscribed` es `true`.
 */

export default function ChannelSection({
    title,
    channels,
    userAreaId,
    isSubscribed,
    onPress,
    emptyMessage,
    onUnsubscribe,
}: Props) {
return (
    <>
        <Text style={styles.sectionTitle}>{title}</Text>
        <FlatList
            data={channels}
            keyExtractor={(item) => item.channel_id.toString()}
            renderItem={({ item }) => (
            <ChannelCard
                name={item.channel_name}
                description={item.description}
                areaId={item.area_id}
                userAreaId={userAreaId}
                isAdmin={item.is_admin}
                isSubscribed={isSubscribed}
                onPress={() => onPress(item)}
                onUnsubscribe={
                isSubscribed && onUnsubscribe
                    ? () => onUnsubscribe(item)
                    : undefined
                }
            />
            )}
            ListEmptyComponent={<Text style={styles.empty}>{emptyMessage}</Text>}
        />
        </>
    );
}

const styles = StyleSheet.create({
    sectionTitle: { fontSize: 20, fontWeight: 'bold', marginVertical: 12 },
    empty: { fontStyle: 'italic', color: '#777', marginVertical: 8 },
});
