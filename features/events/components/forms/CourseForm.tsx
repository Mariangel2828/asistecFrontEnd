import React, { useState } from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet,
    Switch,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

type DaySchedule = {
    day: string;
    active: boolean;
    start_time: string;
    end_time: string;
};

type Props = {
    title: string;
    startDate: Date;
    endDate: Date;
    location: string;
    professorId: string;
    schedule: Record<string, DaySchedule>;
    onChangeTitle: (text: string) => void;
    onChangeStartDate: (date: Date) => void;
    onChangeEndDate: (date: Date) => void;
    onChangeLocation: (text: string) => void;
    onChangeProfessorId: (text: string) => void;
    onChangeScheduleDay: (
        day: string,
        field: 'active' | 'start_time' | 'end_time',
        value: any
    ) => void;
    onSubmit: () => void;
};

const days = [
    { key: 'monday', label: 'Lunes' },
    { key: 'tuesday', label: 'Martes' },
    { key: 'wednesday', label: 'Miércoles' },
    { key: 'thursday', label: 'Jueves' },
    { key: 'friday', label: 'Viernes' },
    { key: 'saturday', label: 'Sábado' },
    { key: 'sunday', label: 'Domingo' },
];

export default function CourseForm({
    title,
    startDate,
    endDate,
    location,
    professorId,
    schedule,
    onChangeTitle,
    onChangeStartDate,
    onChangeEndDate,
    onChangeLocation,
    onChangeProfessorId,
    onChangeScheduleDay,
    onSubmit,
}: Props) {
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);
    const [visibleTimePicker, setVisibleTimePicker] = useState<{
        day: string;
        field: 'start_time' | 'end_time';
    } | null>(null);

    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder="Título del curso"
                value={title}
                onChangeText={onChangeTitle}
            />

            <Text style={styles.label}>Fecha de inicio</Text>
            <TouchableOpacity style={styles.dateButton} onPress={() => setShowStartPicker(true)}>
                <Text>{moment(startDate).format('YYYY-MM-DD')}</Text>
            </TouchableOpacity>
            {showStartPicker && (
                <DateTimePicker
                    mode="date"
                    value={startDate}
                    display="default"
                    onChange={(_, date) => {
                        setShowStartPicker(false);
                        if (date) onChangeStartDate(date);
                    }}
                />
            )}

            <Text style={styles.label}>Fecha final</Text>
            <TouchableOpacity style={styles.dateButton} onPress={() => setShowEndPicker(true)}>
                <Text>{moment(endDate).format('YYYY-MM-DD')}</Text>
            </TouchableOpacity>
            {showEndPicker && (
                <DateTimePicker
                    mode="date"
                    value={endDate}
                    display="default"
                    onChange={(_, date) => {
                        setShowEndPicker(false);
                        if (date) onChangeEndDate(date);
                    }}
                />
            )}

            <TextInput
                style={styles.input}
                placeholder="Ubicación"
                value={location}
                onChangeText={onChangeLocation}
            />
            
            <TextInput
                style={styles.input}
                placeholder="ID del Profesor"
                value={professorId}
                onChangeText={onChangeProfessorId}
                keyboardType="numeric"
            />

            <Text style={styles.sectionTitle}>Días y horarios:</Text>
            {days.map(({ key, label }) => (
                <View key={key} style={styles.dayRow}>
                    <View style={styles.dayHeader}>
                        <Text style={styles.dayLabel}>{label}</Text>
                        <Switch
                            value={schedule[key]?.active || false}
                            onValueChange={(val) => onChangeScheduleDay(key, 'active', val)}
                        />
                    </View>

                    {schedule[key]?.active && (
                        <>
                            <View style={styles.timeInputs}>
                                <TouchableOpacity
                                    style={styles.timeInput}
                                    onPress={() => setVisibleTimePicker({ day: key, field: 'start_time' })}
                                >
                                    <Text>{schedule[key].start_time || 'Inicio'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.timeInput}
                                    onPress={() => setVisibleTimePicker({ day: key, field: 'end_time' })}
                                >
                                    <Text>{schedule[key].end_time || 'Fin'}</Text>
                                </TouchableOpacity>
                            </View>

                            {visibleTimePicker?.day === key && (
                                <DateTimePicker
                                    mode="time"
                                    display="default"
                                    value={new Date()}
                                    onChange={(_, selectedTime) => {
                                        if (selectedTime) {
                                            const formatted = moment(selectedTime).format('HH:mm');
                                            onChangeScheduleDay(
                                                visibleTimePicker.day,
                                                visibleTimePicker.field,
                                                formatted
                                            );
                                        }
                                        setVisibleTimePicker(null);
                                    }}
                                />
                            )}
                        </>
                    )}
                </View>
            ))}

            <TouchableOpacity style={styles.button} onPress={onSubmit}>
                <Text style={styles.buttonText}>Crear curso</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
        paddingHorizontal: 10, paddingVertical: 8, marginBottom: 12,
    },
    label: { fontWeight: 'bold', marginBottom: 4 },
    dateButton: {
        borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
        padding: 10, marginBottom: 12,
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: 8,
        fontSize: 16,
    },
    dayRow: {
        marginBottom: 12,
    },
    dayHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    dayLabel: {
        fontSize: 14,
        fontWeight: '600',
    },
    timeInputs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 8,
    },
    timeInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#007bff', padding: 12,
        borderRadius: 8, alignItems: 'center', marginTop: 10,
    },
    buttonText: { color: '#fff', fontWeight: 'bold' },
});