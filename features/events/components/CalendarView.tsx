import React from 'react';
import { Calendar } from 'react-native-calendars';

type Props = {
    selectedDate: string;
    onSelectDate: (date: string) => void;
};

export default function CalendarView({ selectedDate, onSelectDate }: Props) {
    return (
        <Calendar
        current={selectedDate}
        onDayPress={(day) => onSelectDate(day.dateString)}
        markedDates={{
            [selectedDate]: { selected: true, selectedColor: '#007bff' },
        }}
        style={{ marginBottom: 20 }}
        />
    );
}
