import { useEffect, useState } from 'react';
import { fetchUserEvents } from '../services/eventsService';
import { useAuth } from '@/features/auth/context/AuthContext';

export type EventData = {
    id: string;
    title: string;
    date: string; // ISO
};

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