import { useState } from 'react';
import { useRouter } from 'expo-router';
import { loginUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';

export const useLogin = () => {
    const router = useRouter();
    const { setAuth } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        console.log(email, password)
        if (!email.trim() || !password.trim()) {
        alert('Por favor, complete todos los campos.');
        return;
        }

        try {
            const data = await loginUser({ mail: email, password });

            const authData = {
                userId: data.user_id,
                email: data.email,
                fullname: data.full_name,
                area: data.area,
            };
            setAuth(authData);
            clearFields();
            router.replace('/(tabs)/home');
        } catch (error: any) {
            const detail = error?.response?.data?.detail || '';
            if (detail === 'Inactive') {
                alert('Usuario inactivo, por favor contacte al administrador.');
            } else if (detail === 'Invalid credentials') {
                alert('Credenciales inválidas, por favor intente de nuevo.');
            } else if (detail.includes('not supported') || detail.includes('no permitido')) {
                alert('Solo se permiten correos con dominio @tec.cr, @estudiantec.cr o @itcr.ac.cr');
            } else if (!error?.response) {
                alert('No se pudo conectar al servidor. Verifique su conexión a internet.');
            } else {
                console.error(error);
                alert('Error al iniciar sesión, por favor intente de nuevo.');
            }
        }
    };

    const clearFields = () => {
        setEmail('');
        setPassword('');
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
    };
};