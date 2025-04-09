import React from 'react';
import { Calendar } from 'react-native-calendars';

type Props = {
    selectedDate: string;
    onSelectDate: (date: string) => void;
};

    /**
     * CalendarView
     * 
     * Este componente muestra un calendario interactivo utilizando `react-native-calendars`.
     * Permite al usuario seleccionar una fecha, y resalta visualmente la fecha seleccionada.
     * 
     * Props:
     * - selectedDate (string): La fecha actualmente seleccionada en formato 'YYYY-MM-DD'.
     * - onSelectDate (function): Callback que se ejecuta cuando el usuario selecciona una nueva fecha.
     *                            Recibe la fecha seleccionada como string en formato 'YYYY-MM-DD'.
     * 
     * Uso:
     * <CalendarView
     *   selectedDate={'2025-04-10'}
     *   onSelectDate={(date) => setSelectedDate(date)}
     * />
     */
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
