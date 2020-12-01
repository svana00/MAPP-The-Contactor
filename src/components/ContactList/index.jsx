import React from 'react';
import PropTypes from 'prop-types';
import {
  View, FlatList, Text, Image,
} from 'react-native';
import styles from './styles';
import ContactListItem from '../ContactListItem';

const ContactList = ({ contacts }) => (
  <View style={styles.listContainer}>
    <FlatList
      numColumns={1}
      data={contacts}
      ListEmptyComponent={() => (
        <View style={{ alignItems: 'center', marginTop: 50, justifyContent: 'center' }}>
          <Text style={styles.title}>No Contacts Found</Text>
          <Image source={require('../../resources/images/resourceNotFound.png')} style={styles.image} resizeMode="cover" />
        </View>
      )}
      renderItem={({
        item: {
          id, name, phoneNumber, thumbnailPhoto,
        },
      }) => (
        <View style={styles.contactContainer}>
          <ContactListItem
            id={id}
            name={name}
            phoneNumber={phoneNumber}
            thumbnailPhoto={thumbnailPhoto}
          />
        </View>
      )}
      keyExtractor={(contact) => contact.id.toString()}
    />
  </View>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    phoneNumber: PropTypes.number,
    thumbnailPhoto: PropTypes.string.isRequired,
  })).isRequired,
};

export default ContactList;
