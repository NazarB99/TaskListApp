import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

interface Props {
  buttonText: string;
  onPress: () => void;
}

export const SubmitButton = ({buttonText, onPress}: Props) => {
  return (
    <Pressable style={styles.submitButtonStyles} onPress={onPress}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  submitButtonStyles: {
    backgroundColor: '#3979F1',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
});
