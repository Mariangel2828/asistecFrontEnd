import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/features/auth/context/AuthContext';
import { fetchRecentUserPosts } from '../services/newsService';
import moment from 'moment';
import 'moment/locale/es'; // Importar el locale en español para los meses

// Definimos un tipo más completo para las noticias
export type News = {
  id: string;
  title: string;
  date: string;
  channelName: string;
};

export const useNews = () => {
  const { auth } = useAuth();
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  const loadNews = useCallback(async () => {
    moment.locale('es');
    if (!auth?.userId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const rawData = await fetchRecentUserPosts(Number(auth.userId));

        // Mapeamos los datos crudos al tipo que nuestro componente espera
        const mapped: News[] = rawData.map((item: any) => ({
          id: String(item.post_id),
          title: item.title,
          // La API devuelve "DD/MM/YYYY HH:MM", lo formateamos a algo más legible
          date: moment(item.date, "DD/MM/YYYY HH:mm").format("DD [de] MMMM"),
          channelName: item.channel_name,
        }));

        setNews(mapped);
    } catch (err) {
      console.error('Error cargando noticias:', err);
    } finally {
      setLoading(false);
    }
  }, [auth]);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  return { news, loading, refetch: loadNews };
};