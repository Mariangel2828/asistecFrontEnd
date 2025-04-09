import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
    selected: string;
    onChange: (value: string) => void;
};

const options = ['evento', 'curso', 'actividad'];

export default function EventFilterToggle({ selected, onChange }: Props) {
    return (
        <View style={styles.container}>
        {options.map((opt) => (
            <TouchableOpacity
            key={opt}
            style={[styles.button, selected === opt && styles.selected]}
            onPress={() => onChange(opt)}
            >
            <Text style={selected === opt ? styles.selectedText : styles.text}>
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </Text>
            </TouchableOpacity>
        ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flexDirection: 'row', justifyContent: 'center', marginBottom: 10 },
    button: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        marginHorizontal: 5,
        borderRadius: 20,
        backgroundColor: '#ccc',
    },
    selected: {
        backgroundColor: '#007bff',
    },
    text: { color: '#000' },
    selectedText: { color: '#fff', fontWeight: 'bold' },
});
