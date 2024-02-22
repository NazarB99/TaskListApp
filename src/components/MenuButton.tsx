import React from 'react';
import {Image, Pressable, PressableProps, StyleSheet} from 'react-native';

export const MenuButton = (props: PressableProps) => {
  return (
    <Pressable {...props}>
      <Image style={styles.buttonIcon} source={require('../assets/dots.png')} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonIcon: {
    height: 16,
    width: 32,
  },
});
