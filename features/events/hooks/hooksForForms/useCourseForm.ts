import { useState } from 'react';

// Estructura para el horario de un día
type DaySchedule = {
    day: string;
    active: boolean;
    start_time: string;
    end_time: string;
};

export const useCourseForm = () => {
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [location, setLocation] = useState('');
    const [courseType, setCourseType] = useState(1); // 1: virtual, 2: presencial
    const [professorId, setProfessorId] = useState('');

    const [schedule, setSchedule] = useState<Record<string, DaySchedule>>({
        monday: { day: 'monday', active: false, start_time: '', end_time: '' },
        tuesday: { day: 'tuesday', active: false, start_time: '', end_time: '' },
        wednesday: { day: 'wednesday', active: false, start_time: '', end_time: '' },
        thursday: { day: 'thursday', active: false, start_time: '', end_time: '' },
        friday: { day: 'friday', active: false, start_time: '', end_time: '' },
        saturday: { day: 'saturday', active: false, start_time: '', end_time: '' },
        sunday: { day: 'sunday', active: false, start_time: '', end_time: '' },
    });

    const updateScheduleDay = (
        day: string,
        field: keyof DaySchedule,
        value: any
    ) => {
        setSchedule(prev => ({
            ...prev,
            [day]: { ...prev[day], [field]: value },
        }));
    };

    return {
        title, setTitle,
        startDate, setStartDate,
        endDate, setEndDate,
        location, setLocation,
        courseType, setCourseType,
        professorId, setProfessorId,
        schedule,
        updateScheduleDay,
    };
};