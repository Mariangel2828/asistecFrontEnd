import api from '@/shared/constants/api';

/**
 * channelService.ts
 *
 * Contiene funciones de servicio para interactuar con los endpoints relacionados a:
 * - Canales suscritos y disponibles
 * - Suscripción y desuscripción de canales
 * - Publicaciones (posts) por canal
 *
 * Funciones exportadas:
 *
 * 1. fetchSubscribedChannels(userId)
 *    - Obtiene todos los canales a los que el usuario está suscrito.
 *    - GET /api/channels/subscribed_channels
 *
 * 2. fetchNotSubscribedChannels(userId)
 *    - Obtiene los canales disponibles a los que el usuario aún no se ha suscrito.
 *    - GET /api/channels/not_subscribed_channels
 *
 * 3. subscribeToChannel(userId, channelId, isAdmin, isFavorite)
 *    - Crea una nueva suscripción entre el usuario y el canal.
 *    - POST /api/subscriptions/create_subscription
 *    - Params opcionales: isAdmin (default: false), isFavorite (default: false)
 *
 * 4. unsubscribeFromChannel(userId, channelId)
 *    - Elimina la suscripción del usuario a un canal.
 *    - DELETE /api/subscriptions/delete_subscription
 *
 * 5. fetchPostsByChannel(channelId)
 *    - Obtiene las publicaciones asociadas a un canal específico.
 *    - GET /api/posts/by_channel
 */

export const fetchSubscribedChannels = async (userId: number) => {
    const res = await api.get('/api/channels/subscribed_channels', {
    params: { user_id: userId },
    });
    return res.data;
};

export const fetchNotSubscribedChannels = async (userId: number) => {
    const res = await api.get('/api/channels/not_subscribed_channels', {
        params: { user_id: userId },
    });
    return res.data;
};

export const subscribeToChannel = async (
    userId: number,
    channelId: number,
    isAdmin: boolean = false,
    isFavorite: boolean = false
    ) => {
    const res = await api.post('/api/subscriptions/create_subscription', {
        user_id: userId,
        channel_id: channelId,
        is_admin: isAdmin,
        is_favorite: isFavorite,
    });
    return res.data;
};

export const unsubscribeFromChannel = async (userId: number, channelId: number) => {
    const res = await api.delete('/api/subscriptions/delete_subscription', {
        params: { user_id: userId, channel_id: channelId },
    });
    return res.data;
};

export const fetchPostsByChannel = async (channelId: number) => {
    const res = await api.get('/api/posts/by_channel', {
        params: { channel_id: channelId },
    });
    return res.data;
};