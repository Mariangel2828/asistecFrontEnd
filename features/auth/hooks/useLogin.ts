import { useState } from 'react';
import { useRouter } from 'expo-router';
import api from '../../../shared/constants/api';
import { useAuth } from '../context/AuthContext';

export const useLogin = () => {
    const router = useRouter();
    const { setAuth, AuthData } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
        alert('Por favor, complete todos los campos.');
        return;
        }

        try {
        const { data } = await api.post('/api/users/user_login', {
            mail: email,
            password,
        });

        setAuth(data);

        setEmail('');
        setPassword('');

        router.replace('/'); // Redirige al index (o a la pantalla Home)
        } catch (error: any) {
        const detail = error?.response?.data?.detail;

        if (detail === 'Inactive') {
            alert('Usuario inactivo, por favor contacte al administrador');
        } else if (detail === 'Invalid credentials') {
            alert('Credenciales inválidas, por favor intente de nuevo');
        } else {
            console.error(error);
            alert('Error al iniciar sesión, por favor intente de nuevo');
        }
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
    };
    };
