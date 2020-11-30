import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, TouchableOpacity, Image,
} from 'react-native';
import styles from './styles';

const ContactListItem = ({
  id, name, phoneNumber, thumbnailPhoto, navigation: { navigate },
}) => (
  <View>
    <TouchableOpacity>
      <Image source={{ uri: thumbnailPhoto }} style={styles.image} resizeMode="cover" />
    </TouchableOpacity>
    <Text>{name}</Text>
  </View>
);

ContactListItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.number.isRequired,
  thumbnailPhoto: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default ContactListItem;
