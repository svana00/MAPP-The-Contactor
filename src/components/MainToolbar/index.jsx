import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import styles from './styles';

const MainToolbar = ({
  onAdd, onModify, onImport, title,
}) => (
  <View styleName="horizontal" style={styles.toolbar}>
    {onAdd ? (
      <View style={styles.toolbarAction}>
        <TouchableHighlight onPress={onImport} style={{ padding: 10 }}>
          <AntDesign name="download" size={25} color="white" />
        </TouchableHighlight>
      </View>
    )
      : null}
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
      <View style={styles.toolbarAction}>
        <TouchableHighlight onPress={onAdd} style={{ padding: 10 }}>
          <Text style={styles.toolbarAddText}>+</Text>
        </TouchableHighlight>
      </View>
    )
      : null}
  </View>
);

MainToolbar.propTypes = {
  onAdd: PropTypes.func,
  onModify: PropTypes.func,
  onImport: PropTypes.func,
  title: PropTypes.string.isRequired,
};
MainToolbar.defaultProps = {
  onAdd: null,
  onModify: null,
  onImport: null,
};

export default MainToolbar;
