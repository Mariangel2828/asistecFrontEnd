import { useEffect, useState } from 'react';
import {
    fetchSubscribedChannels,
    fetchNotSubscribedChannels,
} from '../services/channelService';
import { useAuth } from '@/features/auth/context/AuthContext';

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
