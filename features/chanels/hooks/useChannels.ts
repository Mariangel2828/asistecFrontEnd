import { useEffect, useState } from 'react';
import {
    fetchSubscribedChannels,
    fetchNotSubscribedChannels,
} from '../services/channelService';
import { useAuth } from '@/features/auth/context/AuthContext';

/**
 * useChannels
 *
 * Hook personalizado que maneja la lógica para obtener y gestionar canales desde el backend.
 * Separa los canales en dos grupos: los que el usuario ya tiene suscritos y los disponibles para suscribirse.
 *
 * Funcionalidades:
 * - Carga automática de canales al detectar un `userId` en el contexto de autenticación (`useAuth`)
 * - Expone estado de carga (`loading`)
 * - Permite recargar los datos manualmente con `refetch()`
 *
 * Devuelve:
 * - subscribed: canales a los que el usuario está suscrito
 * - available: canales disponibles a los que aún no se ha suscrito
 * - loading: booleano que indica si está cargando los datos
 * - refetch(): función para volver a cargar los datos (útil después de una suscripción o desuscripción)
 */

export const useChannels = () => {
    const { auth } = useAuth();
    const [subscribed, setSubscribed] = useState([]);
    const [available, setAvailable] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchChannels = async () => {
    try {
        const [subs, avail] = await Promise.all([
        fetchSubscribedChannels(auth.userId),
        fetchNotSubscribedChannels(auth.userId),
        ]);
        setSubscribed(subs);
        setAvailable(avail);
    } catch (err) {
        console.error('Error al cargar canales:', err);
    }
    };

    useEffect(() => {
    if (!auth?.userId) return;
    setLoading(true);
    fetchChannels().finally(() => setLoading(false));
    }, [auth]);

    return {
    subscribed,
    available,
    loading,
    refetch: fetchChannels,
    };
};
