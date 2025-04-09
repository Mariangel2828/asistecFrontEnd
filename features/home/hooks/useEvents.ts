import { useEffect, useState } from 'react';
import {
  fetchUserEvents,
  fetchUserCourses,
  fetchUserActivities,
} from '../services/eventsService';
import { useAuth } from '@/features/auth/context/AuthContext';

type UnifiedEvent = {
  id: string;
  title: string;
  date: string; 
  type: 'evento' | 'curso' | 'actividad';
};

export const useEvents = () => {
  const { auth } = useAuth();
  const [events, setEvents] = useState<UnifiedEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (input: string): string => {
    const date = new Date(input);
    return new Intl.DateTimeFormat('es-CR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  useEffect(() => {
    if (!auth?.userId) return;

    const loadAllEvents = async () => {
      try {
        const [eventsRaw, coursesRaw, activitiesRaw] = await Promise.all([
          fetchUserEvents(Number(auth.userId)),
          fetchUserCourses(Number(auth.userId)),
          fetchUserActivities(Number(auth.userId)),
        ]);

        const eventos = eventsRaw.map((e: any) => ({
          id: String(e.event_id),
          title: e.event_title,
          date: e.event_date,
          type: 'evento' as const,
        }));

        const cursos = coursesRaw.map((c: any) => ({
          id: String(c.course_id),
          title: c.course_title,
          date: c.course_start_date, // format: "dd/MM/yyyy"
          type: 'curso' as const,
        }));

        const actividades = activitiesRaw.map((a: any) => ({
          id: String(a.activity_id),
          title: a.activity_title,
          date: a.activity_start_date, // format: "dd/MM/yyyy"
          type: 'actividad' as const,
        }));

        // Normalize date formats
        const parseDate = (dateStr: string) => {
          const parts = dateStr.split('/');
          if (parts.length === 3) {
            const [day, month, year] = parts;
            return new Date(`${year}-${month}-${day}`);
          }
          return new Date(dateStr);
        };

        const all = [...eventos, ...cursos, ...actividades].map((e) => ({
          ...e,
          date: formatDate(parseDate(e.date).toISOString()),
        }));

        const sorted = all.sort(
          (a, b) =>
            parseDate(a.date).getTime() - parseDate(b.date).getTime()
        );

        setEvents(sorted);
      } catch (err) {
        console.error('Error cargando eventos:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAllEvents();
  }, [auth]);

  return { events, loading };
};
