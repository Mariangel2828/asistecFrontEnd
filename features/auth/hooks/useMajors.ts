import { useEffect, useState } from 'react';
import { fetchMajors } from '../services/areaService';

export const useMajors = () => {
    const [majors, setMajors] = useState<{ area_name: string; area_id: number }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMajors = async () => {
        try {
            const data = await fetchMajors();
            setMajors(data);
        } catch (err) {
            console.error('Error cargando carreras:', err);
        } finally {
            setLoading(false);
        }
        };

        loadMajors();
    }, []);

    return { majors, loading };
};
