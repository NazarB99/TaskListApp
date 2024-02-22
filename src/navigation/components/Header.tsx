import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {MainStackNavigationType} from '../MainStack';

interface Props {
  title: string;
}

export const Header = ({title}: Props) => {
  const {navigate} = useNavigation<MainStackNavigationType>();

  const handleAddPress = () => {
    navigate('TaskForm');
  };

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <Pressable onPress={handleAddPress}>
        <Image
          style={styles.plusIcon}
          source={require('../../assets/plus.png')}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#000',
  },
  plusIcon: {
    width: 30,
    height: 30,
  },
});
