import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import styles from './styles';

const ContactListItem = ({
  id, name, thumbnailPhoto, phoneNumber, navigation: { navigate },
}) => (
  <TouchableOpacity
    onPress={() => navigate('DetailedView', {
      contactId: id,
      contactName: name,
      contactPhoneNumber: phoneNumber,
      contactThumbnailPhoto: thumbnailPhoto,
    })}
  >
    <View style={styles.listItem}>
      <Image
        source={{ uri: thumbnailPhoto }}
        style={styles.thumbnailImage}
        resizeMode="cover"
      />
      <View>
        <Text style={styles.title}>{name}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  thumbnailPhoto: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigation(ContactListItem);
