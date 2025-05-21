import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import moment from 'moment';

type Event = {
  id: string;
  title: string;
  date: string;
  type: 'curso' | 'evento' | 'actividad';
};

export default function EventPreview({ event }: { event: Event }) {
  const router = useRouter();
  const handlePress = () => {
    router.push(`/(tabs)/events`);
  };

  const dateObj = moment(event.date);
  const day = dateObj.format('DD');
  const month = dateObj.format('MMM').toUpperCase();

  return (
    <Pressable onPress={handlePress} style={styles.pressable}>
      <View style={styles.card}>
        <View style={styles.dateBox}>
          <Text style={styles.month}>{month}</Text>
          <Text style={styles.day}>{day}</Text>
        </View>

        <View style={styles.contentBox}>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.type}>Tipo: {event.type}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  dateBox: {
    backgroundColor: '#dce6f2',
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  month: {
    fontSize: 14,
    fontWeight: '600',
    color: '#466887',
  },
  day: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2c3e50',
    marginTop: 4,
  },
  contentBox: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  type: {
    fontSize: 14,
    color: '#466887',
    marginBottom: 4,
  },
  fullDate: {
    fontSize: 13,
    color: '#777',
  },
});
