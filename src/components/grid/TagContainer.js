import React from 'react';
import { StyleSheet, View } from 'react-native';

export const TagContainer = ({ children }) => {
  return (
    <View style={styles.tagContainer}>
      <View style={styles.tag}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    marginRight: 16,
    marginTop: 24,
  },
});
