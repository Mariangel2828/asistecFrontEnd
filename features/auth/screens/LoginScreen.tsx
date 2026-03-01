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

            <View style={styles.formWrapper}>
                <Input
                    placeholder="Correo electrónico"
                    placeholderTextColor="#666"
                    inputContainerStyle={styles.inputContainer}
                    containerStyle={styles.inputOuter}
                    errorStyle={{ height: 0 }}
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
                    containerStyle={styles.inputOuter}
                    errorStyle={{ height: 0 }}
                    leftIcon={<Icon name="lock-closed-outline" type="ionicon" color="#466887" />}
                    style={styles.inputs}
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push('/register')}>
                    <Text style={styles.linkText}>
                        ¿Todavía no tienes una cuenta? <Text style={{ color: 'black' }}>Registrate</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageBackground: {
        flex: 1,
        resizeMode: 'cover',
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    formWrapper: {
        width: '85%',
        alignItems: 'center',
        marginTop: 60,
    },
    inputOuter: {
        width: '100%',
        paddingHorizontal: 0,
        marginBottom: 16,
    },
    inputContainer: {
        backgroundColor: '#F1F5F9',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderBottomWidth: 0,
        height: 50,
    },
    inputs: {
        fontSize: 15,
        color: '#333',
        paddingLeft: 8,
    },
    loginButton: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#466887',
        borderRadius: 12,
        marginTop: 8,
    },
    loginButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
    },
    linkText: {
        marginTop: 20,
        color: '#666',
        fontSize: 14,
    },
});

export default LoginScreen;
