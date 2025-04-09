import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { registerUser } from '../services/authService';
import { useRouter } from 'expo-router';


export const useRegister = () => {
    const navigation = useNavigation();
    const router = useRouter();

    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [areaId, setAreaId] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
    try {
        await registerUser({ name, lastname, mail: email, area_id: areaId, password });
        alert('Usuario creado exitosamente');
        clearFields();
        router.replace('/');
    } catch (error: any) {
        console.error(error.response || error);
        alert(error.response?.data?.detail || 'Ocurrió un error al crear el usuario.');
    }
    };

    const clearFields = () => {
    setName('');
    setLastName('');
    setEmail('');
    setAreaId('');
    setPassword('');
    };

    return {
    name,
    setName,
    lastname,
    setLastName,
    email,
    setEmail,
    areaId,
    setAreaId,
    password,
    setPassword,
    handleRegister,
    };
    };
