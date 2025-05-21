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
                    placeholderTextColor="#666"
                    inputContainerStyle={styles.inputContainer}
                    leftIcon={<Icon name="email" type="material" color="#466887" />}
                    style={styles.inputs}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />

                <Input
                    placeholder="Contraseña"
                    placeholderTextColor="#666"
                    secureTextEntry
                    inputContainerStyle={styles.inputContainer}
                    leftIcon={<Icon name="lock-closed-outline" type="ionicon" color="#466887" />}
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
    inputContainer: {
        backgroundColor: '#F1F5F9',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 2,
        marginBottom: 16,
        borderBottomWidth: 0,
    },
    inputs: {
        fontSize: 15,
        color: '#333',
        paddingLeft: 8,
    },
    loginButton: {
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 14,
        backgroundColor: '#466887',
        borderRadius: 12,
        marginTop: 10,
    },
    loginButtonText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
    },
    createAccountButton: {
        marginTop: 20,
        color: '#666',
        fontSize: 14,
    },
});

export default LoginScreen;
