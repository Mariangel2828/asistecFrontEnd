import React from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { useRegister } from '../hooks/useRegister';
import { useMajors } from '../hooks/useMajors';

const RegisterScreen = () => {
  const router = useRouter();

  const {
    name, setName,
    lastname, setLastName,
    email, setEmail,
    areaId, setAreaId,
    password, setPassword,
    handleRegister,
  } = useRegister();

  const { majors, loading: majorsLoading } = useMajors();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/*<Image
        style={styles.imageBackground}
        source={require('../../../assets/images/createAccount.png')}
      />*/}

      <View style={{ width: '80%', marginTop: '20%' }}>
        <Input
          placeholder="Nombre"
          leftIcon={<Icon name="perm-identity" type="material" color="#769ECB" />}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          style={styles.inputs}
          value={name}
          onChangeText={setName}
        />
        <Input
          placeholder="Apellido"
          leftIcon={<Icon name="perm-identity" type="material" color="#769ECB" />}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          style={styles.inputs}
          value={lastname}
          onChangeText={setLastName}
        />

        <Text style={styles.label}>Carrera</Text>
        <View style={styles.pickerWrapper}>
        <Picker
    selectedValue={areaId}
    onValueChange={(value) => setAreaId(value)}
    style={styles.picker}
    >
    <Picker.Item label="Selecciona una carrera..." value="" />
    {majors.map((major) => (
        <Picker.Item
        key={major.area_id}
        label={major.area_name}
        value={String(major.area_id)}
        />
    ))}
    </Picker>
        </View>

        <Input
          placeholder="Correo electrónico"
          leftIcon={<Icon name="email" type="material" color="#769ECB" />}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          style={styles.inputs}
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder="Contraseña"
          secureTextEntry
          leftIcon={<Icon name="lock-closed-outline" type="ionicon" color="#769ECB" />}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          style={styles.inputs}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity onPress={handleRegister} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Crear Cuenta</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('/login')}>
        <Text style={styles.createAccountButton}>
          ¿Ya tienes una cuenta? <Text style={{ color: 'black' }}>Inicia sesión</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 60,
  },
  imageBackground: {
    position: 'absolute',
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  inputs: {
    padding: 15,
    color: '#00000066',
    borderBottomWidth: 1,
    borderBottomColor: '#00000066',
  },
  label: {
    marginLeft: 10,
    marginBottom: 5,
    fontWeight: '500',
    color: '#333',
    fontSize: 14,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
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

export default RegisterScreen;
