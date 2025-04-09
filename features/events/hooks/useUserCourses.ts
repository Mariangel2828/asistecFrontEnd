import { useEffect, useState } from 'react';
import { fetchUserCourses } from '../services/eventsService';
import { useAuth } from '@/features/auth/context/AuthContext';

export type CourseData = {
    id: string;
    title: string;
    date: string; // ISO
};

const parseDate = (ddmmyyyy: string): string => {
    const [day, month, year] = ddmmyyyy.split('/');
    return new Date(`${year}-${month}-${day}`).toISOString();
    };

    export const useUserCourses = () => {
    const { auth } = useAuth();
    const [courses, setCourses] = useState<CourseData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!auth?.userId) return;

        const loadCourses = async () => {
        try {
            const raw = await fetchUserCourses(auth.userId);
            const mapped = raw.map((c: any) => ({
            id: String(c.course_id),
            title: c.course_title,
            date: parseDate(c.course_start_date),
            }));
            setCourses(mapped);
        } catch (err) {
            console.error('Error fetching courses:', err);
        } finally {
            setLoading(false);
        }
        };

        loadCourses();
    }, [auth]);

    return { courses, loading };
};