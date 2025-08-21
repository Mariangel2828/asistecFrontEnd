import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomSwitch from "./CustomSwitch";

type Props = {
  type: "evento" | "curso" | "actividad";
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
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      onChangeDate(selectedDate);
    }
  };

  const handleStartHourChange = (event: any, selectedDate?: Date) => {
    setShowStartPicker(Platform.OS === "ios");
    if (selectedDate) {
      onChangeStartHour(selectedDate);
    }
  };

  const handleEndHourChange = (event: any, selectedDate?: Date) => {
    setShowEndPicker(Platform.OS === "ios");
    if (selectedDate) {
      onChangeEndHour(selectedDate);
    }
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Título"
        placeholderTextColor="#9e9e9eff"
        value={title}
        onChangeText={onChangeTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Descripción (opcional)"
        placeholderTextColor="#9e9e9eff"
        value={description}
        onChangeText={onChangeDescription}
      />

      <Text style={styles.label}>Fecha del evento</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={date ? {} : { color: "#9e9e9eff" }}>
          {date ? date.toLocaleDateString() : "Seleccionar fecha"}
        </Text>
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
        <CustomSwitch value={allDay} onValueChange={onChangeAllDay} />
      </View>

      {!allDay && (
        <>
          <Text style={styles.label}>Hora de inicio</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowStartPicker(true)}
          >
            <Text>
              {startHour ? startHour.toLocaleTimeString() : "Seleccionar hora"}
            </Text>
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
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowEndPicker(true)}
          >
            <Text>
              {endHour ? endHour.toLocaleTimeString() : "Seleccionar hora"}
            </Text>
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  dayLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  timeInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
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
