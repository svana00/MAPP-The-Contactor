import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import styles from './styles';

const MainToolbar = ({ onAdd, onModify, title }) => (
  <View styleName="horizontal" style={styles.toolbar}>
    <View style={styles.toolbarAction}>
      <Text style={styles.clear}>i</Text>
    </View>
    <View style={styles.toolbarAction}>
      <Text style={styles.toolbarActionText}>{title}</Text>
    </View>
    {onModify ? (
      <TouchableHighlight style={styles.toolbarAction} onPress={onModify}>
        <AntDesign name="edit" color="white" size={25} />
      </TouchableHighlight>
    )
      : null}
    {onAdd ? (
      <TouchableHighlight style={styles.toolbarAction} onPress={onAdd}>
        <Text style={styles.toolbarAddText}>+</Text>
      </TouchableHighlight>
    )
      : null}
  </View>
);

MainToolbar.propTypes = {
  onAdd: PropTypes.func,
  onModify: PropTypes.func,
  title: PropTypes.string.isRequired,
};
MainToolbar.defaultProps = {
  onAdd: null,
  onModify: null,
};

export default MainToolbar;
