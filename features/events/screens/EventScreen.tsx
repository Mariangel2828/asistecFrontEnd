import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import EventFilterToggle from '../components/EventFilterToggle';
import CalendarView from '../components/CalendarView';
import EventList from '../components/EventList';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useUserEvents } from '../hooks/useUserEvents';
import { useUserCourses } from '../hooks/useUserCourses';
import { useUserActivities } from '../hooks/useUserActivities';
import moment from 'moment';
import { filterActivitiesByDate } from '../services/filterActivitiesByDate';

export default function EventsScreen() {
    const [filter, setFilter] = useState<'evento' | 'curso' | 'actividad'>('evento');
    const [selectedDate, setSelectedDate] = useState<string>(moment().format('YYYY-MM-DD'));
    const router = useRouter();

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
                data = filterActivitiesByDate(activities, selectedDate);
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

            <EventFilterToggle
                selected={filter}
                onChange={(value) => {
                    if (value === 'evento' || value === 'curso' || value === 'actividad') {
                        setFilter(value);
                    }
                }}
            />

            <CalendarView
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
            />

            <EventList events={filtered} />

            <TouchableOpacity style={styles.fab} onPress={() => router.push('/events/create')}>
                <Ionicons name="add" size={28} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 40 },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        backgroundColor: '#007bff',
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
});
