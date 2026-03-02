import { useEffect, useState } from 'react';
import { fetchPostsByChannel } from '../services/channelService';

/**
 * useChannelPosts
 *
 * Hook personalizado que obtiene las publicaciones (posts) de un canal específico.
 * Se activa automáticamente cada vez que cambia el `channelId` recibido por parámetro.
 *
 * Parámetros:
 * - channelId (number): ID del canal del que se quieren obtener las publicaciones.
 *
 * Funcionalidades:
 * - Hace una solicitud a `fetchPostsByChannel` para traer las publicaciones desde el backend.
 * - Expone el estado de carga (`loading`) mientras se obtienen los datos.
 *
 * Devuelve:
 * - posts: listado de publicaciones del canal (arreglo vacío si no hay)
 * - loading: booleano que indica si está cargando
 *
 * Uso:
 * const { posts, loading } = useChannelPosts(channelId);
 */

export const useChannelPosts = (channelId: number) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const load = async () => {
        try {
            setLoading(true);
            const data = await fetchPostsByChannel(channelId);
            setPosts(data);
        } catch (err) {
            console.error('Error cargando publicaciones:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (channelId) load();
    }, [channelId]);

    return { posts, loading, refetch: load };
};
