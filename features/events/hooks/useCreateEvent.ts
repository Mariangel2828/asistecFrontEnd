import api from '@/shared/constants/api';

export const useCreateEvent = () => {
  const create = async (type: 'evento' | 'curso' | 'actividad', payload: any) => {
    switch (type) {
      case 'evento':
        console.log(payload);
        return await api.post('/api/events/event_create', payload);
      case 'curso':
        return await api.post('/api/courses/course_create', payload);
      case 'actividad':
        return await api.post('/api/activities/activity_create', payload);
    }
  };

  return { create };
};
