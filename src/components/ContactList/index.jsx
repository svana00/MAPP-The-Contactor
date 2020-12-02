import React from 'react';
import PropTypes from 'prop-types';
import {
  View, FlatList, Text, TextInput, Image, Button,
} from 'react-native';
import filter from 'lodash.filter';
import styles from './styles';
import ContactListItem from '../ContactListItem';
import LoadingContactsImage from '../../resources/images/resourceNotFound.png';
import contains from '../../helpers/containsSubstring';

class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      modifiedData: props.contacts,
    };
  }

  handleSearch(text) {
    const {
      contacts,
    } = this.props;
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(contacts, (contact) => contains(
      contact.name.toLowerCase(), formattedQuery,
    ));
    this.updateModifiedData(filteredData);
    this.setQuery(text);
  }

  setQuery(queryText) {
    this.setState({ query: queryText });
  }

  updateModifiedData(filteredData) {
    this.setState({ modifiedData: filteredData });
  }

  renderHeader() {
    const {
      query,
    } = this.state;
    return (
      <View
        style={{
          backgroundColor: '#fff',
          padding: 10,
          marginVertical: 10,
          borderRadius: 20,
        }}
      >
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          value={query}
          onChangeText={(queryText) => this.handleSearch(queryText)}
          placeholder="Search"
          style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
        />
      </View>
    );
  }

  render() {
    const {
      modifiedData,
    } = this.state;
    const { onDelete, onPress } = this.props;
    return (
      <View style={styles.listContainer}>
        <FlatList
          ListHeaderComponent={this.renderHeader()}
          numColumns={1}
          data={modifiedData}
          ListEmptyComponent={() => (
            <View style={{ alignItems: 'center', marginTop: 30, justifyContent: 'center' }}>
              <Text style={styles.title}>No Contacts Found</Text>
              <Image source={LoadingContactsImage} style={styles.image} resizeMode="cover" />
            </View>
          )}
          renderItem={({
            item: {
              id, name, phoneNumber, image, fileName,
            },
          }) => (
            <View>
              <ContactListItem
                id={id}
                name={name}
                phoneNumber={phoneNumber}
                thumbnailPhoto={image}
                fileName={fileName}
                onDelete={onDelete}
                onPress={onPress}
              />
              <View style={styles.buttonContainer}>
                <View style={styles.buttonItem}>
                  <Button color="red" title="Delete Contact" onPress={() => { onDelete(fileName); }} />
                </View>
              </View>
            </View>
          )}
          keyExtractor={(contact) => contact.id.toString()}
        />
      </View>
    );
  }
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string,
    image: PropTypes.string.isRequired,
  })).isRequired,
};

export default ContactList;
