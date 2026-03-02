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
 * 3. subscribeToChannel(userId, channelId, isAdmin, isSubscribed)
 *    - Crea una nueva suscripción entre el usuario y el canal.
 *    - POST /api/subscriptions/create_subscription
 *    - Params opcionales: isAdmin (default: false), isSubscribed (default: true)
 *
 * 4. unsubscribeFromChannel(userId, channelId)
 *    - Cancela la suscripción del usuario a un canal.
 *    - DELETE /api/subscriptions/cancel_subscription
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
    isSubscribed: boolean = true
    ) => {
    const res = await api.post('/api/subscriptions/create_subscription', {
        user_id: userId,
        channel_id: channelId,
        is_admin: isAdmin,
        is_subscribed: isSubscribed,
    });
    return res.data;
};

export const unsubscribeFromChannel = async (userId: number, channelId: number) => {
    const res = await api.delete('/api/subscriptions/cancel_subscription', {
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

export const createPost = async (post: {
    channel_id: number;
    user_id: number;
    title: string;
    content: string;
    date: string;
    tags?: string;
}) => {
    const res = await api.post('/api/posts/create', post);
    return res.data;
};

export const updatePost = async (
    postId: number,
    userId: number,
    data: { title?: string; content?: string; tags?: string }
) => {
    const res = await api.put(`/api/posts/update/${postId}`, data, {
        params: { user_id: userId },
    });
    return res.data;
};

export const deletePost = async (postId: number, userId: number) => {
    const res = await api.delete(`/api/posts/delete/${postId}`, {
        params: { user_id: userId },
    });
    return res.data;
};