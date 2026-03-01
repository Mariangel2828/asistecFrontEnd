import React, { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { Input, Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
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
    gender, setGender,
    birthdate, setBirthdate,
    carnetNumber, setCarnetNumber,
    handleRegister,
  } = useRegister();

  const { majors } = useMajors();

  const [open, setOpen] = useState(false);
  const [genderOptions, setGenderOptions] = useState([
    { label: 'Masculino', value: 'M' },
    { label: 'Femenino', value: 'F' },
    { label: 'Otro', value: 'O' },
  ]);

  const [openMajor, setOpenMajor] = useState(false);
  const [formattedMajors, setFormattedMajors] = useState([]);

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateText, setDateText] = useState('');

  const [showPassword, setShowPassword] = useState(false);


  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
    const formattedDate = formatDate(currentDate);
    setDateText(formattedDate);
    setBirthdate(formattedDate);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  useEffect(() => {
    if (majors && majors.length > 0) {
      const formattedItems = majors.map(major => ({
        label: major.area_name,
        value: major.area_id
      }));
      setFormattedMajors(formattedItems);
    }
  }, [majors]);

  useEffect(() => {
    if (birthdate) {
      setDateText(birthdate);
      try {
        const [year, month, day] = birthdate.split('-');
        setDate(new Date(parseInt(year), parseInt(month) - 1, parseInt(day)));
      } catch (error) {
        console.error("Error parsing date:", error);
      }
    }
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formWrapper}>
        <Text style={styles.title}>Registro de Usuario</Text>

        <Input
          placeholder="Nombre"
          leftIcon={<Icon name="perm-identity" type="material" color="#466887" />}
          inputContainerStyle={styles.inputContainer}
          containerStyle={styles.inputOuter}
          errorStyle={{ height: 0 }}
          style={styles.inputs}
          value={name}
          onChangeText={setName}
        />

        <Input
          placeholder="Apellido"
          leftIcon={<Icon name="perm-identity" type="material" color="#466887" />}
          inputContainerStyle={styles.inputContainer}
          containerStyle={styles.inputOuter}
          errorStyle={{ height: 0 }}
          style={styles.inputs}
          value={lastname}
          onChangeText={setLastName}
        />

        <DropDownPicker
          open={openMajor}
          value={areaId}
          items={formattedMajors}
          setOpen={setOpenMajor}
          setValue={setAreaId}
          placeholder="Selecciona tu carrera..."
          style={styles.inputLikePicker}
          dropDownContainerStyle={styles.dropdownContainer}
          listMode="SCROLLVIEW"
          zIndex={2500}
          zIndexInverse={1500}
        />

        <Input
          placeholder="Correo electrónico"
          leftIcon={<Icon name="email" type="material" color="#466887" />}
          inputContainerStyle={styles.inputContainer}
          containerStyle={styles.inputOuter}
          errorStyle={{ height: 0 }}
          style={styles.inputs}
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Input
          placeholder="Contraseña"
          secureTextEntry={!showPassword}
          leftIcon={
            <Icon name="lock-closed-outline" type="ionicon" color="#466887" />
          }
          rightIcon={
            <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}>
              <Icon
                name={showPassword ? 'eye-off' : 'eye'}
                type="ionicon"
                color="#466887"
              />
            </TouchableOpacity>
          }
          inputContainerStyle={styles.inputContainer}
          containerStyle={styles.inputOuter}
          errorStyle={{ height: 0 }}
          style={styles.inputs}
          value={password}
          onChangeText={setPassword}
        />

        <DropDownPicker
          open={open}
          value={gender}
          items={genderOptions}
          setOpen={setOpen}
          setValue={setGender}
          setItems={setGenderOptions}
          placeholder="Selecciona tu género..."
          style={styles.inputLikePicker}
          dropDownContainerStyle={styles.dropdownContainer}
          listMode="SCROLLVIEW"
          zIndex={3000}
          zIndexInverse={1000}
        />

        <TouchableOpacity onPress={showDatepicker} style={styles.datePickerButton}>
          <Icon name="calendar-today" type="material" color="#466887" />
          <Text style={styles.datePickerButtonText}>
            {dateText ? dateText : "Selecciona tu fecha de nacimiento"}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
            maximumDate={new Date()}
          />
        )}

        <Input
          placeholder="Número de carnet"
          leftIcon={<Icon name="badge" type="material" color="#466887" />}
          inputContainerStyle={styles.inputContainer}
          containerStyle={styles.inputOuter}
          errorStyle={{ height: 0 }}
          style={styles.inputs}
          value={carnetNumber}
          onChangeText={setCarnetNumber}
        />

        <TouchableOpacity onPress={handleRegister} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Crear Cuenta</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/login')}>
          <Text style={styles.linkText}>
            ¿Ya tienes una cuenta? <Text style={{ color: 'black' }}>Inicia sesión</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 80,
    backgroundColor: '#F9FAFB',
  },
  formWrapper: {
    width: '85%',
    marginTop: '18%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    color: '#466887',
    fontWeight: 'bold',
  },
  inputOuter: {
    width: '100%',
    paddingHorizontal: 0,
    marginBottom: 16,
  },
  inputs: {
    fontSize: 15,
    color: '#333',
    paddingLeft: 8,
  },
  inputContainer: {
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderBottomWidth: 0,
    height: 50,
  },
  inputLikePicker: {
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    borderColor: 'transparent',
    height: 50,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  dropdownContainer: {
    borderColor: '#ccc',
    marginTop: 2,
    backgroundColor: '#fff',
  },
  datePickerButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  datePickerButtonText: {
    marginLeft: 10,
    color: '#666',
    fontSize: 15,
  },
  submitButton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#466887',
    borderRadius: 12,
    marginTop: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  linkText: {
    marginTop: 20,
    marginBottom: 20,
    color: '#666',
    fontSize: 14,
  },
});

export default RegisterScreen;
