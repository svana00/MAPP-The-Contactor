import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const MainToolbar = ({ onAdd, title }) => (
  <View styleName="horizontal" style={styles.toolbar}>
    <View style={styles.toolbarAction}>
      <Text style={styles.clear}>i</Text>
    </View>
    <View style={styles.toolbarAction}>
      <Text style={styles.toolbarActionText}>{title}</Text>
    </View>
    <TouchableHighlight style={styles.toolbarAction} onPress={onAdd}>
      <Text style={styles.toolbarAddText}>+</Text>
    </TouchableHighlight>
  </View>
);

MainToolbar.propTypes = {
  onAdd: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default MainToolbar;
