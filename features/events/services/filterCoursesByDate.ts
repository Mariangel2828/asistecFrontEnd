import moment from 'moment';
import { CourseData } from '../hooks/useUserCourses';

/**
 * Filtra una lista de cursos para devolver solo aquellos activos en una fecha seleccionada,
 * respetando el día de la semana del horario.
 */
export const filterCoursesByDate = (courses: CourseData[], selectedDate: string) => {
    const date = moment(selectedDate);
    const dayName = date.format('dddd').toLowerCase(); // ej: "monday"

    return courses
        .filter((course) => {
            const startDate = moment(course.startDate);
            const endDate = moment(course.endDate);

            // 1. Verificar si la fecha está dentro del rango del curso
            const inRange = date.isBetween(startDate, endDate, 'day', '[]');
            if (!inRange) {
                return false;
            }

            // 2. Verificar si el día de la semana coincide con el horario del curso
            if (!course.schedule || typeof course.schedule !== 'object') {
                return false; // No hay horario para verificar
            }
            
            return Object.values(course.schedule).some(
                (s: any) => s.date.toLowerCase() === dayName
            );
        })
        .map((course) => {
            // Buscamos el horario específico para ese día para mostrarlo
            const scheduleForDay = Object.values(course.schedule).find(
                (s) => s.date.toLowerCase() === dayName
            );

            return {
                id: course.id,
                title: course.title,
                type: 'curso' as const,
                location: course.location,
                // Usamos la hora del horario para la descripción
                descripcion: `${scheduleForDay?.start_time} - ${scheduleForDay?.end_time}`,
                date: selectedDate, // Mantenemos la fecha seleccionada
                // También podemos añadir las horas para una visualización más detallada si quisiéramos
                initialHour: `${selectedDate}T${scheduleForDay?.start_time}`,
                finalHour: `${selectedDate}T${scheduleForDay?.end_time}`,
            };
        });
};