import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { ORANGE } from '../../styles/colors';

const LoadingScreen = () => (
  <View style={{
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  }}
  >
    <ActivityIndicator size="large" color={ORANGE} />
  </View>
);

export default LoadingScreen;
