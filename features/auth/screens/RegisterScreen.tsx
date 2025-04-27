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

  // Estados para el ComboBox de género
  const [open, setOpen] = useState(false);
  const [genderOptions, setGenderOptions] = useState([
    { label: 'Masculino', value: 'M' },
    { label: 'Femenino', value: 'F' },
    { label: 'Otro', value: 'O' },
  ]);

  const [openMajor, setOpenMajor] = useState(false);
  // Estado para almacenar las carreras en el formato correcto
  const [formattedMajors, setFormattedMajors] = useState([]);

  // Estados para el DatePicker
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateText, setDateText] = useState('');

  // Función para manejar el cambio de fecha
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios'); // En iOS se mantiene visible, en Android se cierra
    setDate(currentDate);
    
    // Formatear la fecha como YYYY-MM-DD
    const formattedDate = formatDate(currentDate);
    setDateText(formattedDate);
    setBirthdate(formattedDate); // Actualizar el estado en useRegister
  };

  // Función para formatear la fecha a YYYY-MM-DD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Abrir el selector de fecha
  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  // Convertir majors al formato que espera DropDownPicker
  useEffect(() => {
    if (majors && majors.length > 0) {
      const formattedItems = majors.map(major => ({
        label: major.area_name,
        value: major.area_id
      }));
      setFormattedMajors(formattedItems);
    }
  }, [majors]);

  // Inicializar dateText si birthdate ya tiene un valor
  useEffect(() => {
    if (birthdate) {
      setDateText(birthdate);
      try {
        // Intentar convertir la cadena birthdate a un objeto Date
        const [year, month, day] = birthdate.split('-');
        setDate(new Date(parseInt(year), parseInt(month) - 1, parseInt(day)));
      } catch (error) {
        console.error("Error parsing date:", error);
      }
    }
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
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

        <View style={{ marginBottom: 20 }}>
          <View style={styles.dropdownWithIcon}>
            <Icon
              name="school"
              type="material"
              color="#769ECB"
              style={styles.dropdownIcon}
            />
            <DropDownPicker
              open={openMajor}
              value={areaId}
              items={formattedMajors} // Usar los datos formateados
              setOpen={setOpenMajor}
              setValue={setAreaId}
              placeholder="Selecciona tu carrera..."
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              listMode="SCROLLVIEW"
              zIndex={2500}
              zIndexInverse={1500}
            />
          </View>
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

        <View style={{ marginBottom: 20 }}>
          <View style={styles.dropdownWithIcon}>
            <Icon
              name="wc"
              type="material"
              color="#769ECB"
              style={styles.dropdownIcon}
            />
            <DropDownPicker
              open={open}
              value={gender}
              items={genderOptions}
              setOpen={setOpen}
              setValue={setGender}
              setItems={setGenderOptions}
              placeholder="Selecciona tu género..."
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              listMode="SCROLLVIEW"
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>
        </View>

        {/* DatePicker para fecha de nacimiento */}
        <TouchableOpacity onPress={showDatepicker} style={styles.datePickerButton}>
          <Icon name="calendar-today" type="material" color="#769ECB" />
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
            maximumDate={new Date()} // No permite fechas futuras
          />
        )}

        <Input
          placeholder="Número de carnet"
          leftIcon={<Icon name="badge" type="material" color="#769ECB" />}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          style={styles.inputs}
          value={carnetNumber}
          onChangeText={setCarnetNumber}
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
  dropdownWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    position: 'relative',
    zIndex: 3000,
  },
  dropdownIcon: {
    marginRight: 10,
  },
  dropdown: {
    flex: 1,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  dropdownContainer: {
    borderColor: '#ccc',
    marginTop: 2,
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 20,
  },
  datePickerButtonText: {
    marginLeft: 10,
    color: '#00000066',
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
    marginTop: 20,
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