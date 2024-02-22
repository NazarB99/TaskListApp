import React from 'react';
import {Text, TextInput, TextInputProps, View} from 'react-native';

interface Props {
  label: string;
  placeholder: string;
  inputStyles: TextInputProps['style'];
  value: string;
  onChange?: (text: string) => void;
}

export const Input = ({
  label,
  placeholder,
  value,
  inputStyles,
  onChange,
}: Props) => {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput
        value={value}
        style={inputStyles}
        placeholder={placeholder}
        onChangeText={onChange}
      />
    </View>
  );
};
