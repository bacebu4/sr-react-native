import React from 'react';
import { StyleSheet, View } from 'react-native';

export const Container = ({
  children,
  mt = 0,
  center = false,
  border = false,
  mb = 0,
}) => {
  return (
    <View
      style={{
        ...styles.container,
        marginTop: mt,
        marginBottom: mb,
        alignItems: center ? 'center' : 'stretch',
        borderBottomWidth: border ? 1 : 0,
        borderBottomColor: border ? '#d7d7d7' : 'white',
      }}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 32,
  },
});
