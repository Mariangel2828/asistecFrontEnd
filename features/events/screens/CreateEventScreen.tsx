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
      user_id: auth.userId,
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
      if (!courseForm.date) {
        Alert.alert('Error', 'La fecha del curso es obligatoria.');
        return;
      }

      payload = {
        course_title: courseForm.title,
        course_type: 'virtual',
        course_start_date: moment(courseForm.date).format('YYYY-MM-DD'),
        course_final_date: moment(courseForm.date).format('YYYY-MM-DD'),
        location: courseForm.location,
        schedule: courseForm.schedule,
        professor_id: 1,
        ...commonData,
      };
    } else if (type === 'actividad') {
      if (!activityForm.title) {
        Alert.alert('Error', 'El título es obligatorio.');
        return;
      }
      const scheduleItems = Object.values(activityForm.schedule).filter(s => s.active);

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
      Alert.alert('Éxito', `${type} creado correctamente.`);
      router.replace('/(tabs)/events');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo crear el evento.');
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
          date={courseForm.date ? courseForm.date.toISOString().split('T')[0] : ''}
          location={courseForm.location}
          schedule={courseForm.schedule}
          onChangeTitle={courseForm.setTitle}
          onChangeDate={(text) => {
            const parsed = new Date(text);
            if (!isNaN(parsed.getTime())) courseForm.setDate(parsed);
          }}
          onChangeLocation={courseForm.setLocation}
          onChangeSchedule={courseForm.setSchedule}
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
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
});
