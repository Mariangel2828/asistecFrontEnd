import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import moment from 'moment';

type EventItem = {
    id: string;
    title: string;
    date: string;
};

type Props = {
    events: EventItem[];
};

    /**
     * EventList
     * 
     * Componente que muestra una lista de eventos en forma de tarjetas.
     * Utiliza `FlatList` para renderizar los eventos proporcionados.
     * Si no hay eventos, muestra un mensaje indicando que no hay eventos para la fecha actual.
     * 
     * Props:
     * - events (EventItem[]): Arreglo de eventos a mostrar. Cada evento debe tener:
     *    - id: Identificador único (string)
     *    - title: Título del evento (string)
     *    - date: Fecha del evento en formato ISO (string)
     * 
     * Uso:
     * <EventList events={[{ id: '1', title: 'Conferencia', date: '2025-04-10' }]} />
     */

export default function EventList({ events }: Props) {
    if (!events.length) {
        return <Text style={styles.empty}>No hay eventos para esta fecha.</Text>;
    }

    return (
        <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.date}>
                {moment(item.date).format('DD [de] MMMM [de] YYYY')}
            </Text>
            </View>
        )}
        />
    );
}

const styles = StyleSheet.create({
    item: {
        padding: 12,
        backgroundColor: '#eee',
        borderRadius: 10,
        marginBottom: 10,
    },
    title: { fontSize: 16, fontWeight: '600' },
    date: { fontSize: 14, color: '#555' },
    empty: { marginTop: 20, textAlign: 'center', color: '#888' },
});
