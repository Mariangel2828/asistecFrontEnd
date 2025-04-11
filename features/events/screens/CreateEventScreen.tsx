import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/features/auth/context/AuthContext';
import { useCreateEvent } from '../hooks/useCreateEvent';
import EventTypeToggle from '../components/EventTypeToggle';
import EventForm from '../components/forms/EventForm';
import CourseForm from '../components/forms/CourseForm';
import ActivityForm from '../components/forms/ActivityForm';
import moment from 'moment';

export default function CreateEventScreen() {
  const [type, setType] = useState<'evento' | 'curso' | 'actividad'>('evento');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [location, setLocation] = useState('');
  const [schedule, setSchedule] = useState('mañana');
  const [startHour, setStartHour] = useState<Date | null>(null);
  const [endHour, setEndHour] = useState<Date | null>(null);
  const [allDay, setAllDay] = useState(true);

  const [activityStartDate, setActivityStartDate] = useState<Date>(new Date());
  const [activityEndDate, setActivityEndDate] = useState<Date>(new Date());
  const [activitySchedule, setActivitySchedule] = useState<Record<string, DaySchedule>>({
    monday: { day: 'monday', active: false, start_time: '', end_time: '' },
    tuesday: { day: 'tuesday', active: false, start_time: '', end_time: '' },
    wednesday: { day: 'wednesday', active: false, start_time: '', end_time: '' },
    thursday: { day: 'thursday', active: false, start_time: '', end_time: '' },
    friday: { day: 'friday', active: false, start_time: '', end_time: '' },
    saturday: { day: 'saturday', active: false, start_time: '', end_time: '' },
    sunday: { day: 'sunday', active: false, start_time: '', end_time: '' },
  });
  

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
  
    if (!title) {
      Alert.alert('Error', 'El título es obligatorio.');
      return;
    }
  
    if (type === 'evento') {
      if (!date) {
        Alert.alert('Error', 'La fecha del evento es obligatoria.');
        return;
      }
  
      if (!allDay && (!startHour || !endHour)) {
        Alert.alert('Error', 'Debes seleccionar hora de inicio y finalización.');
        return;
      }
  
      payload = {
        event_title: title,
        event_description: description,
        event_date: moment(date).format('YYYY-MM-DD'),
        event_start_hour: combineDateAndTime(date, startHour),
        event_final_hour: combineDateAndTime(date, endHour),
        all_day: allDay,
        ...commonData,
      };
    }
  
    else if (type === 'curso') {
      if (!date) {
        Alert.alert('Error', 'La fecha del curso es obligatoria.');
        return;
      }
  
      payload = {
        course_title: title,
        course_type: 'virtual',
        course_start_date: moment(date).format('YYYY-MM-DD'),
        course_final_date: moment(date).format('YYYY-MM-DD'),
        location,
        schedule,
        professor_id: 1,
        ...commonData,
      };
    }
  
    else if (type === 'actividad') {
      const scheduleItems = Object.values(activitySchedule).filter(s => s.active);
  
      if (!activityStartDate || !activityEndDate || scheduleItems.length === 0) {
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
        activity_title: title,
        activity_start_date: moment(activityStartDate).format('YYYY-MM-DD'),
        activity_final_date: moment(activityEndDate).format('YYYY-MM-DD'),
        location,
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
  

  const handleAllDayToggle = (value: boolean) => {
    setAllDay(value);
    if (value && date) {
      const start = moment(date).set({ hour: 0, minute: 0, second: 0 }).toDate();
      const end = moment(date).set({ hour: 23, minute: 59, second: 0 }).toDate();
      setStartHour(start);
      setEndHour(end);
    } else {
      setStartHour(null);
      setEndHour(null);
    }
  };

  const handleChangeScheduleDay = (
    day: string,
    field: keyof DaySchedule,
    value: any
  ) => {
    setActivitySchedule((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear {type}</Text>

      <EventTypeToggle selected={type} onChange={setType} />

      {type === 'evento' && (
        <EventForm
          type={type}
          title={title}
          description={description}
          date={date}
          startHour={startHour}
          endHour={endHour}
          allDay={allDay}
          onChangeTitle={setTitle}
          onChangeDescription={setDescription}
          onChangeDate={setDate}
          onChangeStartHour={setStartHour}
          onChangeEndHour={setEndHour}
          onChangeAllDay={handleAllDayToggle}
          onSubmit={handleSubmit}
        />
      )}

      {type === 'curso' && (
        <CourseForm
          title={title}
          date={date}
          location={location}
          schedule={schedule}
          onChangeTitle={setTitle}
          onChangeDate={setDate}
          onChangeLocation={setLocation}
          onChangeSchedule={setSchedule}
          onSubmit={handleSubmit}
        />
      )}

      {type === 'actividad' && (
        <ActivityForm
        title={title}
        startDate={activityStartDate}
        endDate={activityEndDate}
        location={location}
        schedule={activitySchedule}
        onChangeTitle={setTitle}
        onChangeStartDate={setActivityStartDate}
        onChangeEndDate={setActivityEndDate}
        onChangeLocation={setLocation}
        onChangeScheduleDay={handleChangeScheduleDay}
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
