import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useUserEvents } from '../hooks/useUserEvents';
import { useUserCourses } from '../hooks/useUserCourses';
import { useUserActivities } from '../hooks/useUserActivities';
import moment from 'moment';
import { filterActivitiesByDate } from '../services/filterActivitiesByDate';
import { Calendar } from 'react-native-calendars';
import EventList from '../components/EventList';

/**
 * EventFilterToggle: selector visual plano y redondeado
 */
function EventFilterToggle({ selected, onChange }: {
  selected: 'evento' | 'curso' | 'actividad';
  onChange: (value: 'evento' | 'curso' | 'actividad') => void;
}) {
  const options: ('evento' | 'curso' | 'actividad')[] = ['evento', 'curso', 'actividad'];

  return (
    <View style={styles.toggleContainer}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.toggleButton,
            selected === option && styles.toggleButtonSelected,
          ]}
          onPress={() => onChange(option)}
        >
          <Text
            style={[
              styles.toggleText,
              selected === option && styles.toggleTextSelected,
            ]}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

/**
 * CalendarView: estilo flat con color de acento
 */
function CalendarView({ selectedDate, onSelectDate }: {
  selectedDate: string;
  onSelectDate: (date: string) => void;
}) {
  return (
    <Calendar
      current={selectedDate}
      onDayPress={(day) => onSelectDate(day.dateString)}
      markedDates={{
        [selectedDate]: {
          selected: true,
          marked: true,
          selectedColor: '#466887',
        },
      }}
      theme={{
        backgroundColor: '#fff',
        calendarBackground: '#fff',
        textSectionTitleColor: '#466887',
        selectedDayBackgroundColor: '#466887',
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#466887',
        dayTextColor: '#333',
        textDisabledColor: '#ccc',
        arrowColor: '#466887',
        monthTextColor: '#2c3e50',
        textMonthFontWeight: 'bold',
        textDayFontSize: 16,
        textMonthFontSize: 18,
      }}
      style={styles.calendar}
    />
  );
}

export default function EventsScreen() {
  const [filter, setFilter] = useState<'evento' | 'curso' | 'actividad'>('evento');
  const [selectedDate, setSelectedDate] = useState<string>(moment().format('YYYY-MM-DD'));
  const router = useRouter();

  const { events, loading: loadingEvents } = useUserEvents();
  const { courses, loading: loadingCourses } = useUserCourses();
  const { activities, loading: loadingActivities } = useUserActivities();

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

  const isLoading = () => {
    if (filter === 'evento') return loadingEvents;
    if (filter === 'curso') return loadingCourses;
    if (filter === 'actividad') return loadingActivities;
    return false;
  };

  const filtered = getFiltered();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Eventos</Text>

      <EventFilterToggle
        selected={filter}
        onChange={(value) => setFilter(value)}
      />

      <CalendarView
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />

      {isLoading() ? (
        <ActivityIndicator size="large" color="#466887" style={styles.loader} />
      ) : (
        <EventList events={filtered} />
      )}

      <TouchableOpacity style={styles.fab} onPress={() => router.push('/events/create')}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#F9FAFB',
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 20,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#466887',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  loader: {
    marginTop: 40,
  },
  toggleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#E3EAF2',
    alignItems: 'center',
  },
  toggleButtonSelected: {
    backgroundColor: '#466887',
  },
  toggleText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 14,
  },
  toggleTextSelected: {
    color: '#fff',
  },
  calendar: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
});
