import api from '../../../shared/constants/api';

export const registerUser = async (userData: {
    name: string;
    lastname: string;
    mail: string;
    area_id: string;
    password: string;
    carnet_number: string;
    birth_date: string;
    gender: string;
}) => {
    const response = await api.post('/api/users/user_create', userData); // this function is used to call the api and register the user
    return response.data;
};

export const loginUser = async (credentials: {
    mail: string;
    password: string;
    }) => {
    const response = await api.post('/api/users/user_login', credentials);
    return response.data;
    };