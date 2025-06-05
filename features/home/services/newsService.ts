import api from "@/shared/constants/api";

/**
 * Obtiene los posts más recientes de los canales a los que el usuario está suscrito
 * y ha marcado como favoritos.
 * @param userId ID del usuario
 * @returns Una promesa que resuelve a una lista de posts.
 */
export const fetchRecentUserPosts = async (userId: number) => {
    const response = await api.get('/api/posts/user_recent_posts', {
        params: { user_id: userId },
    });
    return response.data;
};