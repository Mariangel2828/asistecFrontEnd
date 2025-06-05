import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Switch,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

type Props = {
  type: 'evento' | 'curso' | 'actividad';
  title: string;
  onChangeTitle: (t: string) => void;
  description: string;
  onChangeDescription: (d: string) => void;
  date: Date | null;
  onChangeDate: (d: Date) => void;
  startHour: Date | null;
  endHour: Date | null;
  onChangeStartHour: (d: Date) => void;
  onChangeEndHour: (d: Date) => void;
  allDay: boolean;
  onChangeAllDay: (value: boolean) => void;
  onSubmit: () => void;
};

export default function EventForm({
  type,
  title,
  onChangeTitle,
  description,
  onChangeDescription,
  date,
  onChangeDate,
  startHour,
  endHour,
  onChangeStartHour,
  onChangeEndHour,
  allDay,
  onChangeAllDay,
  onSubmit,
}: Props) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      onChangeDate(selectedDate);
    }
  };

  const handleStartHourChange = (event: any, selectedDate?: Date) => {
    setShowStartPicker(Platform.OS === 'ios');
    if (selectedDate) {
      onChangeStartHour(selectedDate);
    }
  };

  const handleEndHourChange = (event: any, selectedDate?: Date) => {
    setShowEndPicker(Platform.OS === 'ios');
    if (selectedDate) {
      onChangeEndHour(selectedDate);
    }
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={onChangeTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Descripción (opcional)"
        value={description}
        onChangeText={onChangeDescription}
      />

      <Text style={styles.label}>Fecha del evento</Text>
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
        <Text>{date ? date.toLocaleDateString() : 'Seleccionar fecha'}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          mode="date"
          value={date || new Date()}
          onChange={handleDateChange}
          display="default"
        />
      )}

      <View style={styles.switchRow}>
        <Text style={styles.label}>¿Todo el día?</Text>
        <Switch value={allDay} onValueChange={onChangeAllDay} />
      </View>

      {!allDay && (
        <>
          <Text style={styles.label}>Hora de inicio</Text>
          <TouchableOpacity style={styles.dateButton} onPress={() => setShowStartPicker(true)}>
            <Text>{startHour ? startHour.toLocaleTimeString() : 'Seleccionar hora'}</Text>
          </TouchableOpacity>
          {showStartPicker && (
            <DateTimePicker
              mode="time"
              value={startHour || new Date()}
              onChange={handleStartHourChange}
              display="default"
            />
          )}

          <Text style={styles.label}>Hora de finalización</Text>
          <TouchableOpacity style={styles.dateButton} onPress={() => setShowEndPicker(true)}>
            <Text>{endHour ? endHour.toLocaleTimeString() : 'Seleccionar hora'}</Text>
          </TouchableOpacity>
          {showEndPicker && (
            <DateTimePicker
              mode="time"
              value={endHour || new Date()}
              onChange={handleEndHourChange}
              display="default"
            />
          )}
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Crear {type}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 12,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 4,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});