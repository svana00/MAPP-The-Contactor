import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, Image,
} from 'react-native';
import styles from './styles';

const ContactListItem = ({
  id, name, phoneNumber, thumbnailPhoto,
}) => (
  <View style={styles.listItem}>
    <Image
      source={{ uri: thumbnailPhoto }}
      style={styles.thumbnailImage}
      resizeMode="cover"
    />
    <Text style={styles.title}>{name}</Text>
  </View>
);

ContactListItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.number.isRequired,
  thumbnailPhoto: PropTypes.string.isRequired,
};

export default ContactListItem;
