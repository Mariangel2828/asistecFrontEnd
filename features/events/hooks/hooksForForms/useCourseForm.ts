import { useState } from 'react';

export const useCourseForm = () => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState<Date | null>(null);
    const [location, setLocation] = useState('');
    const [schedule, setSchedule] = useState('mañana');

    return {
        title, setTitle,
        date, setDate,
        location, setLocation,
        schedule, setSchedule,
    };
};
