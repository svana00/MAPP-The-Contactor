import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
// import styles from './styles';

const LoadingScreen = () => (
  <View style={{
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  }}
  >
    <ActivityIndicator size="large" color="#fe7624" />
  </View>
);

export default LoadingScreen;
