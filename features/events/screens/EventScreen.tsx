import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import EventFilterToggle from '../components/EventFilterToggle';
import CalendarView from '../components/CalendarView';
import EventList from '../components/EventList';
import { useUserEvents } from '../hooks/useUserEvents';
import { useUserCourses } from '../hooks/useUserCourses';
import { useUserActivities } from '../hooks/useUserActivities';
import moment from 'moment';

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
