import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/features/auth/context/AuthContext';
import { useCreateEvent } from '../hooks/useCreateEvent';
import EventTypeToggle from '../components/EventTypeToggle';
import EventForm from '../components/forms/EventForm';
import CourseForm from '../components/forms/CourseForm';
import ActivityForm from '../components/forms/ActivityForm';
import { useEventForm } from '../hooks/hooksForForms/useEventForm';
import { useCourseForm } from '../hooks/hooksForForms/useCourseForm';
import { useActivityForm } from '../hooks/hooksForForms/useActivityForm';
import moment from 'moment';

export default function CreateEventScreen() {
  const [type, setType] = useState<'evento' | 'curso' | 'actividad'>('evento');

  const eventForm = useEventForm();
  const courseForm = useCourseForm();
  const activityForm = useActivityForm();

  const { create } = useCreateEvent();
  const { auth } = useAuth();
  const router = useRouter();

  const combineDateAndTime = (date: Date, time: Date | null): string | null => {
    if (!date || !time) return null;
    const datePart = moment(date).format('YYYY-MM-DD');
    const timePart = moment(time).format('HH:mm:ss');
    return `${datePart}T${timePart}`;
  };

  const handleSubmit = async () => {
    const commonData = {
      user_id: Number(auth.userId),
      notification_datetime: null,
    };

    let payload: any = {};

    if (type === 'evento') {
      if (!eventForm.title) {
        Alert.alert('Error', 'El título es obligatorio.');
        return;
      }
      if (!eventForm.date) {
        Alert.alert('Error', 'La fecha del evento es obligatoria.');
        return;
      }
      if (!eventForm.allDay && (!eventForm.startHour || !eventForm.endHour)) {
        Alert.alert('Error', 'Debes seleccionar hora de inicio y finalización.');
        return;
      }
      payload = {
        event_title: eventForm.title,
        event_description: eventForm.description,
        event_date: moment(eventForm.date).format('YYYY-MM-DD'),
        event_start_hour: combineDateAndTime(eventForm.date, eventForm.startHour),
        event_final_hour: combineDateAndTime(eventForm.date, eventForm.endHour),
        all_day: eventForm.allDay,
        ...commonData,
      };
    } else if (type === 'curso') {
        const scheduleItems = Object.values(courseForm.schedule).filter(s => s.active);
        
        if (!courseForm.title || !courseForm.professorId) {
            Alert.alert('Error', 'El título y el ID del profesor son obligatorios.');
            return;
        }

        if (scheduleItems.length === 0) {
            Alert.alert('Error', 'Debes seleccionar al menos un día con horario para el curso.');
            return;
        }

        const formattedSchedule = scheduleItems.reduce((acc: any, curr: { day: string; start_time: string; end_time: string }, index: number) => {
        acc[index + 1] = {
        date: curr.day,
        start_time: curr.start_time,
        end_time: curr.end_time,
        };
        return acc;
    }, {} as any);

        payload = {
            course_title: courseForm.title,
            course_type: courseForm.courseType,
            course_start_date: moment(courseForm.startDate).format('YYYY-MM-DD'),
            course_final_date: moment(courseForm.endDate).format('YYYY-MM-DD'),
            location: courseForm.location,
            schedule: formattedSchedule,
            professor_id: Number(courseForm.professorId),
            ...commonData,
        };
    } else if (type === 'actividad') {
      const scheduleItems = Object.values(activityForm.schedule).filter(s => s.active);

      if (!activityForm.title) {
        Alert.alert('Error', 'El título es obligatorio.');
        return;
      }
      if (!activityForm.startDate || !activityForm.endDate || scheduleItems.length === 0) {
        Alert.alert('Error', 'Debes seleccionar fechas y al menos un día con horario.');
        return;
      }

      const formattedSchedule = scheduleItems.reduce((acc, curr, index) => {
        acc[index + 1] = {
          date: curr.day,
          start_time: curr.start_time,
          end_time: curr.end_time,
        };
        return acc;
      }, {} as any);

      payload = {
        activity_title: activityForm.title,
        activity_start_date: moment(activityForm.startDate).format('YYYY-MM-DD'),
        activity_final_date: moment(activityForm.endDate).format('YYYY-MM-DD'),
        location: activityForm.location,
        schedule: formattedSchedule,
        ...commonData,
      };
    }

    try {
      await create(type, payload);
      Alert.alert('Éxito', `${type.charAt(0).toUpperCase() + type.slice(1)} creado correctamente.`);
      router.replace('/(tabs)/events');
    } catch (error: any) {
        const errorMessage = error.response?.data?.detail || 'No se pudo crear el elemento.';
        console.error("Error creating event:", error.response?.data || error);
        Alert.alert('Error', errorMessage);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear {type}</Text>

      <EventTypeToggle selected={type} onChange={setType} />

      {type === 'evento' && (
        <EventForm
          type={type}
          title={eventForm.title}
          description={eventForm.description}
          date={eventForm.date}
          startHour={eventForm.startHour}
          endHour={eventForm.endHour}
          allDay={eventForm.allDay}
          onChangeTitle={eventForm.setTitle}
          onChangeDescription={eventForm.setDescription}
          onChangeDate={eventForm.setDate}
          onChangeStartHour={eventForm.setStartHour}
          onChangeEndHour={eventForm.setEndHour}
          onChangeAllDay={eventForm.setAllDay}
          onSubmit={handleSubmit}
        />
      )}

      {type === 'curso' && (
        <CourseForm
          title={courseForm.title}
          startDate={courseForm.startDate}
          endDate={courseForm.endDate}
          location={courseForm.location}
          schedule={courseForm.schedule}
          professorId={courseForm.professorId}
          onChangeTitle={courseForm.setTitle}
          onChangeStartDate={courseForm.setStartDate}
          onChangeEndDate={courseForm.setEndDate}
          onChangeLocation={courseForm.setLocation}
          onChangeProfessorId={courseForm.setProfessorId}
          onChangeScheduleDay={courseForm.updateScheduleDay}
          onSubmit={handleSubmit}
        />
      )}

      {type === 'actividad' && (
        <ActivityForm
          title={activityForm.title}
          startDate={activityForm.startDate}
          endDate={activityForm.endDate}
          location={activityForm.location}
          schedule={activityForm.schedule}
          onChangeTitle={activityForm.setTitle}
          onChangeStartDate={activityForm.setStartDate}
          onChangeEndDate={activityForm.setEndDate}
          onChangeLocation={activityForm.setLocation}
          onChangeScheduleDay={activityForm.updateScheduleDay}
          onSubmit={handleSubmit}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9", // fondo claro y neutro
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#466887", // acento definido en tu app
    marginBottom: 20,
    textAlign: "center",
  },
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 15,
    color: "#444",
  },
  dateTimeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  dateTimePicker: {
    flex: 1,
    marginHorizontal: 5,
  },
});
