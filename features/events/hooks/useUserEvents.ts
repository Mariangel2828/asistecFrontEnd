import { useEffect, useState } from 'react';
import { fetchUserEvents } from '../services/eventsService';
import { useAuth } from '@/features/auth/context/AuthContext';

export type EventData = {
    /**
     * @typedef EventData
     * @description
     * Representa un evento individual creado por un usuario.
     * 
     * @property {string} id - Identificador único del evento.
     * @property {string} title - Título del evento.
     * @property {string} descripcion - Descripción del evento (opcional).
     * @property {string} date - Fecha del evento en formato ISO (YYYY-MM-DD).
     * @property {string} initialHour - Hora de inicio en formato ISO (YYYY-MM-DDTHH:mm:ss).
     * @property {string} finalHour - Hora de finalización en formato ISO (YYYY-MM-DDTHH:mm:ss).
     * @property {boolean} isAllDay - Indica si el evento dura todo el día.
     */
    id: string;
    title: string;
    date: string; 
    descripcion: string;
    initialHour: string; 
    finalHour: string; 
    isAllDay: boolean;
};

/**
 * @function useUserEvents
 * 
 * @description
 * Hook personalizado para obtener los eventos creados por el usuario autenticado.
 * Realiza una petición a la API y transforma los datos crudos en una lista tipada de eventos.
 * 
 * Utiliza el contexto de autenticación (`useAuth`) para identificar el `userId` del usuario.
 * 
 * @returns {Object} Un objeto con:
 * - `events` - Lista de eventos formateados según el tipo `EventData`.
 * - `loading` - Booleano que indica si los datos aún están en proceso de carga.
 * 
 * @example
 * const { events, loading } = useUserEvents();
 * if (loading) return <Loading />;
 * return <EventList events={events} />;
 */

export const useUserEvents = () => {
    const { auth } = useAuth();
    const [events, setEvents] = useState<EventData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!auth?.userId) return;

        const loadEvents = async () => {
        try {
            const raw = await fetchUserEvents(auth.userId);
            const mapped = raw.map((e: any) => ({
            id: String(e.event_id),
            title: e.event_title,
            descripcion: e.event_description,
            date: e.event_date,
            initialHour: e.event_start_hour,
            finalHour: e.event_final_hour,
            isAllDay : e.all_day,
            }));
            setEvents(mapped);
        } catch (err) {
            console.error('Error fetching events:', err);
        } finally {
            setLoading(false);
        }
        };

        loadEvents();
    }, [auth]);

    return { events, loading };
};