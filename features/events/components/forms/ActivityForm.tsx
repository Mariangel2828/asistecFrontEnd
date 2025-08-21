import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  // Removed standard Switch import
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import CustomSwitch from './CustomSwitch'; // Using your custom component

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
  schedule: Record<string, DaySchedule>;
  onChangeTitle: (text: string) => void;
  onChangeStartDate: (date: Date) => void;
  onChangeEndDate: (date: Date) => void;
  onChangeLocation: (text: string) => void;
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

export default function ActivityForm({
  title,
  startDate,
  endDate,
  location,
  schedule,
  onChangeTitle,
  onChangeStartDate,
  onChangeEndDate,
  onChangeLocation,
  onChangeScheduleDay,
  onSubmit,
}: Props) {
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [visibleTimePicker, setVisibleTimePicker] = useState<{
    day: string;
    field: 'start_time' | 'end_time';
  } | null>(null);

  const handleTimeChange = (selectedTime?: Date) => {
    if (selectedTime && visibleTimePicker) {
      const formatted = moment(selectedTime).format('HH:mm');
      onChangeScheduleDay(
        visibleTimePicker.day,
        visibleTimePicker.field,
        formatted
      );
    }
    setVisibleTimePicker(null);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Título de la actividad"
        placeholderTextColor="#9e9e9eff"
        value={title}
        onChangeText={onChangeTitle}
      />

      <Text style={styles.label}>Fecha de inicio</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowStartPicker(true)}
      >
        <Text style={{ color: title ? '#333' : '#9e9e9eff' }}>
          {startDate ? moment(startDate).format('YYYY-MM-DD') : 'Seleccionar fecha'}
        </Text>
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
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowEndPicker(true)}
      >
        <Text style={{ color: title ? '#333' : '#9e9e9eff' }}>
          {endDate ? moment(endDate).format('YYYY-MM-DD') : 'Seleccionar fecha'}
        </Text>
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
        placeholderTextColor="#9e9e9eff"
        value={location}
        onChangeText={onChangeLocation}
      />

      <Text style={styles.sectionTitle}>Días y horarios:</Text>
      {days.map(({ key, label }) => (
        <View key={key} style={styles.dayRow}>
          <View style={styles.dayHeader}>
            <Text style={styles.dayLabel}>{label}</Text>
            <CustomSwitch
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
                  <Text style={schedule[key].start_time ? {} : { color: '#9e9e9eff' }}>
                    {schedule[key].start_time || 'Inicio'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.timeInput}
                  onPress={() => setVisibleTimePicker({ day: key, field: 'end_time' })}
                >
                  <Text style={schedule[key].end_time ? {} : { color: '#9e9e9eff' }}>
                    {schedule[key].end_time || 'Fin'}
                  </Text>
                </TouchableOpacity>
              </View>

              {visibleTimePicker?.day === key && (
                <DateTimePicker
                  mode="time"
                  display="default"
                  value={new Date()}
                  onChange={(_, selectedTime) => handleTimeChange(selectedTime)}
                />
              )}
            </>
          )}
        </View>
      ))}

      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Crear actividad</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
    color: "#333",
  },
  dateButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 32,
    color: "#2c3e50",
  },
  dayRow: {
    marginBottom: 15,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  dayLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  timeInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  timeInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#466887",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});