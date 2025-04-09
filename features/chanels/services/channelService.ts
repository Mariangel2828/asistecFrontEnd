import api from '@/shared/constants/api';

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