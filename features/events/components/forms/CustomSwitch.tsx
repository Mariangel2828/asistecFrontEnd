import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';

type CustomSwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
};

const CustomSwitch = ({ value, onValueChange }: CustomSwitchProps) => {
  const thumbColor = value ? "#466887" : "#f4f3f4";
  const trackColor = "#d3d3d3";

  return (
    <Pressable
      onPress={() => onValueChange(!value)}
      style={[
        styles.track,
        { backgroundColor: trackColor },
      ]}
    >
      <View
        style={[
          styles.thumb,
          { backgroundColor: thumbColor },
          value ? styles.thumbOn : styles.thumbOff,
        ]}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  track: {
    width: 50,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
  },
  thumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
    marginHorizontal: 2,
  },
  thumbOn: {
    transform: [{ translateX: 20 }],
  },
  thumbOff: {
    transform: [{ translateX: 0 }],
  },
});

export default CustomSwitch;