import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
  selected: 'evento' | 'curso' | 'actividad';
  onChange: (value: 'evento' | 'curso' | 'actividad') => void;
};

const options: Array<'evento' | 'curso' | 'actividad'> = ['evento', 'curso', 'actividad'];

export default function EventTypeToggle({ selected, onChange }: Props) {
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
  container: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },
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
