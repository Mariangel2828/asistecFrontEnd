import { useState, useEffect } from 'react';
import moment from 'moment';

export const useEventForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState<Date | null>(null);
    const [startHour, setStartHour] = useState<Date | null>(null);
    const [endHour, setEndHour] = useState<Date | null>(null);
    const [allDay, setAllDay] = useState(true);

    useEffect(() => {
        if (allDay && date) {
            const start = moment(date).set({ hour: 0, minute: 0, second: 0 }).toDate();
            const end = moment(date).set({ hour: 23, minute: 59, second: 0 }).toDate();
            setStartHour(start);
            setEndHour(end);
        }
    }, [allDay, date]);

    return {
        title, setTitle,
        description, setDescription,
        date, setDate,
        startHour, setStartHour,
        endHour, setEndHour,
        allDay, setAllDay,
    };
};
