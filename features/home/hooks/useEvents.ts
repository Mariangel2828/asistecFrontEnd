import { useEffect, useState } from 'react';
import { fetchUserAllEvents } from '../services/eventsService';
import { useAuth } from '@/features/auth/context/AuthContext';

type UnifiedEvent = {
  id: string;
  title: string;
  date: string;
  start_time: string;
  location: string | null;
  type: 'evento' | 'curso' | 'actividad';
};

export const useEvents = () => {
  const { auth } = useAuth();
  const [events, setEvents] = useState<UnifiedEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth?.userId) return;

    const loadEvents = async () => {
      try {
        const rawData = await fetchUserAllEvents(Number(auth.userId));

        const normalized: UnifiedEvent[] = rawData.map((item: any) => ({
          id: String(item.id),
          title: item.title,
          date: item.date, // ya viene en ISO: yyyy-MM-dd
          start_time: item.start_time,
          location: item.location,
          // estandariza el type si es necesario
          type: item.type === 'event' ? 'evento'
               : item.type === 'course' ? 'curso'
               : 'actividad',
        }));

        setEvents(normalized);
      } catch (err) {
        console.error('Error cargando eventos:', err);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [auth]);

  return { events, loading };
};
