import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Switch,
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
      <DateTimePicker
        mode="date"
        value={date || new Date()}
        onChange={(_, selectedDate) => {
          if (selectedDate) onChangeDate(selectedDate);
        }}
        display="default"
      />

      <View style={styles.switchRow}>
        <Text style={styles.label}>¿Todo el día?</Text>
        <Switch value={allDay} onValueChange={onChangeAllDay} />
      </View>

      {!allDay && (
        <>
          <Text style={styles.label}>Hora de inicio</Text>
          <DateTimePicker
            mode="time"
            value={startHour || new Date()}
            onChange={(_, selectedDate) => {
              if (selectedDate) onChangeStartHour(selectedDate);
            }}
            display="default"
          />

          <Text style={styles.label}>Hora de finalización</Text>
          <DateTimePicker
            mode="time"
            value={endHour || new Date()}
            onChange={(_, selectedDate) => {
              if (selectedDate) onChangeEndHour(selectedDate);
            }}
            display="default"
          />
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
