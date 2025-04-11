import React from 'react';
import { TextInput, TouchableOpacity, Text, View, StyleSheet } from 'react-native';

type Props = {
    title: string;
    date: string;
    location: string;
    schedule: string;
    onChangeTitle: (text: string) => void;
    onChangeDate: (text: string) => void;
    onChangeLocation: (text: string) => void;
    onChangeSchedule: (text: string) => void;
    onSubmit: () => void;
};

export default function CourseForm({
    title,
    date,
    location,
    schedule,
    onChangeTitle,
    onChangeDate,
    onChangeLocation,
    onChangeSchedule,
    onSubmit,
}: Props) {
return (
        <View>
        <TextInput 
        style={styles.input} 
        placeholder="Título del curso" 
        value={title} 
        onChangeText={onChangeTitle} 
        />

        <TextInput 
        style={styles.input} 
        placeholder="Fecha (YYYY-MM-DD)" 
        value={date} 
        onChangeText={onChangeDate} 
        />

        <TextInput 
        style={styles.input} 
        placeholder="Ubicación" 
        value={location} 
        onChangeText={onChangeLocation} 
        />

        <TextInput 
        style={styles.input} 
        placeholder="Horario" 
        value={schedule} 
        onChangeText={onChangeSchedule} 
        />
        <TouchableOpacity 
        style={styles.button} 
        onPress={onSubmit}
        >
        <Text style={styles.buttonText}>Crear curso</Text>
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
        paddingHorizontal: 10, paddingVertical: 8, marginBottom: 12,
    },
    button: {
        backgroundColor: '#007bff', padding: 12,
        borderRadius: 8, alignItems: 'center', marginTop: 10,
    },
    buttonText: { color: '#fff', fontWeight: 'bold' },
});
