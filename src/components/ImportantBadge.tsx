import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const ImportantBadge = () => {
  return (
    <View style={styles.importantBadge}>
      <Text style={styles.importantBadgeText}>Important</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  importantBadge: {
    backgroundColor: '#c0392b',
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 4,
    height: 14,
  },
  importantBadgeText: {
    fontSize: 8,
    color: '#fff',
  },
});
