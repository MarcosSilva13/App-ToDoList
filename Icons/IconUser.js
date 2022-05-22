import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const IconUser = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/icons8-add-user-100.png')}
      />
    </View>
  );
}

export default IconUser;

const styles = StyleSheet.create({
    container: {
      top: 20
    },
    logo: {
      width: 50,
      height: 50,
      //tintColor: ""
    },
  });