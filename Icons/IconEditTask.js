import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const IconEditTask = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/icons8-tarefa-100.png')}
      />
    </View>
  );
}

export default IconEditTask;

const styles = StyleSheet.create({
    container: {
      top: 4,
      right: 0,
    },
    logo: {
      width: 62,
      height: 52,
      tintColor: "#D96800",
    },
  });