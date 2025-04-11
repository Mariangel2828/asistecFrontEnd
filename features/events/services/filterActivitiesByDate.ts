import moment from 'moment';

type ScheduleItem = {
    date: string;
    start_time: string;
    end_time: string;
};

export const filterActivitiesByDate = (activities: any[], selectedDate: string) => {
    const date = moment(selectedDate);
    const dayName = date.format('dddd').toLowerCase();

    return activities
    .filter((a) => {
    const inRange =
        date.isSameOrAfter(moment(a.startDate)) &&
        date.isSameOrBefore(moment(a.endDate));

    if (!inRange) return false;

    return Object.values(a.schedule).some(
        (s: any) => s.date.toLowerCase() === dayName
    );
    })
    .map((a) => {
        const scheduleForDay = Object.values(a.schedule as Record<string, ScheduleItem>).find(
            (s) => s.date.toLowerCase() === dayName
        );

        return {
            id: a.id,
            title: a.title,
            type: 'actividad',
            location: a.location,
            descripcion: `${scheduleForDay?.start_time} - ${scheduleForDay?.end_time}`,
            date: selectedDate,
            initialHour: `${selectedDate}T${scheduleForDay?.start_time}`,
            finalHour: `${selectedDate}T${scheduleForDay?.end_time}`,
            isAllDay: false,
        };
    });
};