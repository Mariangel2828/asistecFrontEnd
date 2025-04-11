import { useEffect, useState } from 'react';
import { fetchUserActivities } from '../services/eventsService';
import { useAuth } from '@/features/auth/context/AuthContext';

export type ActivityData = {
    /**
     * @typedef ActivityData
     * @description
     * Representa una actividad programada que puede ocurrir múltiples veces en una semana.
     * 
     * @property {string} id - Identificador único de la actividad
     * @property {string} title - Título o nombre de la actividad
     * @property {string} startDate - Fecha de inicio de la actividad (formato ISO)
     * @property {string} endDate - Fecha de fin de la actividad (formato ISO)
     * @property {Object.<string, { date: string; start_time: string; end_time: string }>} schedule - Horario por día de la semana
     */
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    schedule: { [key: string]: { date: string; start_time: string; end_time: string } };
};

const parseDate = (ddmmyyyy: string): string => {
    const [day, month, year] = ddmmyyyy.split('/');
    return new Date(`${year}-${month}-${day}`).toISOString();
    };


    /**
     * @module useUserActivities
     * 
     * @description
     * Hook personalizado para obtener las actividades del usuario autenticado desde la API.
     * Realiza un `fetch` al backend y transforma los datos crudos en un arreglo tipado.
     * 
     * Este hook depende del contexto de autenticación (`useAuth`) para conocer el `userId`.
     * 
     * @returns Un objeto con:
     * - `activities`: arreglo de actividades del usuario.
     * - `loading`: booleano que indica si los datos están en proceso de carga.
     * 
     * @example
     * const { activities, loading } = useUserActivities();
     * 
     * if (loading) return <Loading />;
     * 
     * return <EventList events={activities} />;
     */

    export const useUserActivities = () => {
    const { auth } = useAuth();
    const [activities, setActivities] = useState<ActivityData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!auth?.userId) return;

        const loadActivities = async () => {
            try {
                const raw = await fetchUserActivities(auth.userId);
                const mapped = raw.map((a: any) => ({
                    id: String(a.activity_id),
                    title: a.activity_title,
                    startDate: a.activity_start_date,
                    endDate: a.activity_final_date,
                    schedule: a.schedule,
                    location: a.location
                }));
                setActivities(mapped);
                } catch (err) {
                console.error('Error fetching activities:', err);
                } finally {
                setLoading(false);
                }
            };

        loadActivities();
    }, [auth]);

    return { activities, loading };
};