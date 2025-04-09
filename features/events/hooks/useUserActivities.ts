import { useEffect, useState } from 'react';
import { fetchUserActivities } from '../services/eventsService';
import { useAuth } from '@/features/auth/context/AuthContext';

export type ActivityData = {
    id: string;
    title: string;
    date: string; // ISO
};

const parseDate = (ddmmyyyy: string): string => {
    const [day, month, year] = ddmmyyyy.split('/');
    return new Date(`${year}-${month}-${day}`).toISOString();
    };

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
            date: parseDate(a.activity_start_date),
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