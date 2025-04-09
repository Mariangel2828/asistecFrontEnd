import React from 'react';
import {
    View, Text, Image, StyleSheet, TouchableOpacity,
} from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { useLogin } from '../hooks/useLogin';
import { useRouter } from 'expo-router';

const LoginScreen = () => {
    const { email, setEmail, password, setPassword, handleLogin } = useLogin();
    const router = useRouter();

    return (
        <View style={styles.container}>
        <Image
            style={styles.imageBackground}
            source={require('../../../assets/images/loginImage.png')}
        />

        <View style={{ width: '80%' }}>
            <Input
            placeholder="Correo electrónico"
            placeholderTextColor="#00000066"
            inputContainerStyle={{ borderBottomWidth: 0 }}
            leftIcon={<Icon name="email" type="material" color="#769ECB" />}
            style={styles.inputs}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            />

            <Input
            placeholder="Contraseña"
            placeholderTextColor="#00000066"
            secureTextEntry
            inputContainerStyle={{ borderBottomWidth: 0 }}
            leftIcon={<Icon name="lock-closed-outline" type="ionicon" color="#769ECB" />}
            style={styles.inputs}
            value={password}
            onChangeText={setPassword}
            />
        </View>

        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/register')}>
            <Text style={styles.createAccountButton}>
            ¿Todavía no tienes una cuenta? <Text style={{ color: 'black' }}>Registrate</Text>
            </Text>
        </TouchableOpacity>
        </View>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageBackground: {
        flex: 1,
        resizeMode: 'cover',
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    inputs: {
        padding: 15,
        color: '#00000066',
        borderBottomWidth: 1,
        borderBottomColor: '#00000066',
    },
    loginButton: {
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 2,
        padding: 14,
        backgroundColor: '#769ECB',
        borderRadius: 20,
    },
    loginButtonText: {
        textAlign: 'center',
        fontSize: 19,
        fontWeight: '700',
        color: 'white',
    },
    createAccountButton: {
        marginTop: 20,
        color: '#00000066',
        fontSize: 14,
    },
    });

export default LoginScreen;
