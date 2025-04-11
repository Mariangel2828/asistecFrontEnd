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

/**
 * @module EventForm
 * 
 * @description
 * Componente de formulario reutilizable para la creación de eventos.
 * Permite al usuario ingresar título, descripción, fecha, horario y si el evento es de todo el día.
 * Es controlado completamente mediante props y callbacks para mantener el estado externo.
 * 
 * @param props - Propiedades necesarias para controlar el formulario
 * @param props.type - Tipo de entidad a crear: 'evento' en este caso,
 * @param props.title - Título del evento
 * @param props.onChangeTitle - Callback para actualizar el título
 * @param props.description - Descripción del evento
 * @param props.onChangeDescription - Callback para actualizar la descripción
 * @param props.date - Fecha seleccionada del evento
 * @param props.onChangeDate - Callback para actualizar la fecha
 * @param props.startHour - Hora de inicio del evento (si no es todo el día)
 * @param props.onChangeStartHour - Callback para actualizar la hora de inicio
 * @param props.endHour - Hora de finalización del evento (si no es todo el día)
 * @param props.onChangeEndHour - Callback para actualizar la hora de finalización
 * @param props.allDay - Si el evento es de todo el día
 * @param props.onChangeAllDay - Callback para alternar el estado de todo el día
 * @param props.onSubmit - Callback que se ejecuta al enviar el formulario
 * 
 * @returns JSX.Element
 * 
 * @example
 * <EventForm
 *   type="evento"
 *   title={title}
 *   onChangeTitle={setTitle}
 *   description={description}
 *   onChangeDescription={setDescription}
 *   date={date}
 *   onChangeDate={setDate}
 *   startHour={startHour}
 *   onChangeStartHour={setStartHour}
 *   endHour={endHour}
 *   onChangeEndHour={setEndHour}
 *   allDay={allDay}
 *   onChangeAllDay={setAllDay}
 *   onSubmit={handleSubmit}
 * />
 */




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
