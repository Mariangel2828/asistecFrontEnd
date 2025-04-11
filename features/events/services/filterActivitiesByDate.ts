import moment from 'moment';

type ScheduleItem = {
    date: string;
    start_time: string;
    end_time: string;
};

/**
 * Filtra y transforma una lista de actividades según una fecha seleccionada.
 *
 * La función verifica que la fecha seleccionada esté dentro del rango de inicio y fin
 * de cada actividad y que dicha fecha coincida con alguno de los días activos en el horario (schedule).
 *
 * Luego, transforma cada actividad en un objeto con estructura estandarizada para mostrar en la UI.
 *
 * @param activities - Arreglo de actividades. Cada actividad debe tener `startDate`, `endDate`, `schedule` y `location`.
 * @param selectedDate - Fecha seleccionada en formato `YYYY-MM-DD`.
 *
 * @returns Un nuevo arreglo de actividades que ocurren el día seleccionado, incluyendo detalles como título, horario y ubicación.
 *
 * @example
 * ```ts
 * const activities = [
 *   {
 *     id: '1',
 *     title: 'Fútbol',
 *     startDate: '2025-04-01',
 *     endDate: '2025-04-30',
 *     location: 'Cancha',
 *     schedule: {
 *       1: { date: 'monday', start_time: '14:00', end_time: '16:00' },
 *       2: { date: 'wednesday', start_time: '10:00', end_time: '12:00' }
 *     }
 *   }
 * ];
 *
 * const filtered = filterActivitiesByDate(activities, '2025-04-14');
 * // Devuelve actividades del lunes 14 de abril si están dentro del rango y coinciden con el día.
 * ```
 */

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