import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const IconTask = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/icons8-lista-de-tarefas-100.png')}
      />
    </View>
  );
}

export default IconTask;

const styles = StyleSheet.create({
    container: {
      top: 2,
      right: 2,
    },
    logo: {
      width: 66,
      height: 55,
      //tintColor: "#D96800"
    },
  });