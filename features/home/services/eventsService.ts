import api from "@/shared/constants/api";

export const fetchUserEvents = async (userId: number) => {
    const response = await api.get(`/api/events/user_events`, {
        params: { user_id: userId },
    });
    return response.data; 
};

export const fetchUserCourses = async (userId: number) => {
    const response = await api.get('/api/courses/user_courses', {
        params: { user_id: userId },
    });
    return response.data;
};

export const fetchUserActivities = async (userId: number) => {
    const response = await api.get('/api/activities/user_activities', {
        params: { user_id: userId },
    });
    return response.data;
};