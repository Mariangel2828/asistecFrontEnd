import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { registerUser } from '../services/authService';
import { useRouter } from 'expo-router';


export const useRegister = () => {
    // this hook is used to manage the registration process
    const navigation = useNavigation();
    const router = useRouter();

    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [areaId, setAreaId] = useState('');
    const [password, setPassword] = useState('');
    const [carnetNumber, setCarnetNumber] = useState('');
    const [gender, setGender] = useState('');
    const [birthdate, setBirthdate] = useState('');

    const handleRegister = async () => {
    try {
        await registerUser({ name, lastname, mail: email, area_id: areaId, password, carnet_number:carnetNumber, gender, birth_date: birthdate }); // this function is used to register the user when we had the data
        alert('Usuario creado exitosamente');
        clearFields();
        router.replace('/login');
    } catch (error: any) {
        const detail = error?.response?.data?.detail || '';
        if (detail === 'Email already registered') {
            alert('Este correo electrónico ya está registrado.');
        } else if (detail === 'Carnet number already registered') {
            alert('Este número de carné ya está registrado.');
        } else if (detail.includes('not supported') || detail.includes('no permitido')) {
            alert('Solo se permiten correos con dominio @tec.cr, @estudiantec.cr o @itcr.ac.cr');
        } else if (!error?.response) {
            alert('No se pudo conectar al servidor. Verifique su conexión a internet.');
        } else {
            console.error(error.response || error);
            alert('Ocurrió un error al crear el usuario.');
        }
    }
    };

    const clearFields = () => {
    setName('');
    setLastName('');
    setEmail('');
    setAreaId('');
    setPassword('');
    setCarnetNumber('');
    setGender('');
    setBirthdate('');
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
    carnetNumber,
    setCarnetNumber,
    gender,
    setGender,
    birthdate,
    setBirthdate,
    };
    };
