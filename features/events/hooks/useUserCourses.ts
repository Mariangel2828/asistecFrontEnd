import { useEffect, useState } from 'react';
import { fetchUserCourses } from '../services/eventsService';
import { useAuth } from '@/features/auth/context/AuthContext';
import moment from 'moment';

// Tipo para el horario que debe ser consistente
type ScheduleItem = { date: string; start_time: string; end_time: string };
type Schedule = { [key: string]: ScheduleItem };

export type CourseData = {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    schedule: Schedule;
    location: string;
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
                const mapped: CourseData[] = raw.map((c: any) => ({
                    id: String(c.course_id),
                    title: c.course_title,
                    startDate: moment(c.course_start_date, 'DD/MM/YYYY').toISOString(),
                    endDate: moment(c.course_final_date, 'DD/MM/YYYY').toISOString(),
                    schedule: c.schedule, 
                    location: c.location,
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