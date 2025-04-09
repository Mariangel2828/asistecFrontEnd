import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import EventFilterToggle from '../components/EventFilterToggle';
import CalendarView from '../components/CalendarView';
import EventList from '../components/EventList';
import { useUserEvents } from '../hooks/useUserEvents';
import { useUserCourses } from '../hooks/useUserCourses';
import { useUserActivities } from '../hooks/useUserActivities';
import moment from 'moment';


    /**
     * EventsScreen
     *
     * Pantalla principal para visualizar los eventos del usuario.
     * Permite alternar entre tres tipos de eventos: "evento", "curso" y "actividad",
     * utilizando un toggle, y seleccionar una fecha en un calendario interactivo.
     * Solo se muestran los eventos del tipo y fecha seleccionados.
     *
     * Componentes utilizados:
     * - EventFilterToggle: permite seleccionar el tipo de evento.
     * - CalendarView: calendario que permite seleccionar la fecha.
     * - EventList: muestra los eventos del tipo y día seleccionados.
     *
     * Hooks personalizados:
     * - useUserEvents: obtiene los eventos generales del usuario.
     * - useUserCourses: obtiene los cursos del usuario.
     * - useUserActivities: obtiene las actividades del usuario.
     *
     * Estado local:
     * - filter: tipo de evento actualmente seleccionado ('evento' | 'curso' | 'actividad').
     * - selectedDate: fecha actualmente seleccionada en formato 'YYYY-MM-DD'.
     */

export default function EventsScreen() {
    const [filter, setFilter] = useState<'evento' | 'curso' | 'actividad'>('evento');
    const [selectedDate, setSelectedDate] = useState<string>(moment().format('YYYY-MM-DD'));

    const { events } = useUserEvents();
    const { courses } = useUserCourses();
    const { activities } = useUserActivities();

    const getFiltered = () => {
    let data = [];
    switch (filter) {
        case 'evento':
            data = events;
            break;
        case 'curso':
            data = courses;
            break;
        case 'actividad':
            data = activities;
            break;
    }

    return data.filter((item) =>
        moment(item.date).isSame(selectedDate, 'day')
    );
  };

    const filtered = getFiltered();

    return (
        <View style={styles.container}>
        <Text style={styles.header}>Eventos</Text>

        <EventFilterToggle selected={filter} onChange={setFilter} />

        <CalendarView
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
        />

        <EventList events={filtered} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 40 },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
});
