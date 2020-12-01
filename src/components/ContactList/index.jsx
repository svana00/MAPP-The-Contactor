import React from 'react';
import PropTypes from 'prop-types';
import {
  View, FlatList, Text, ActivityIndicator, TextInput
} from 'react-native';
import filter from 'lodash.filter';
import styles from './styles';
import ContactListItem from '../ContactListItem';

class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      fullData: props.contacts,
    };
  }

  handleSearch(text) {
    const {
      fullData,
    } = this.state;
    const {
      updateData,
    } = this.props;
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(fullData, (contact) => this.contains(
      contact.name.toLowerCase(), formattedQuery,
    ));
    updateData(filteredData);
    this.setQuery(text);
  }

  setQuery(queryText) {
    this.setState({ query: queryText });
  }

  updateFullData(filteredData) {
    this.setState({ fullData: filteredData });
  }

  contains(name, query) {
    console.log(name);

    if (name.includes(query)) {
      console.log("here");
      return true;
    }

    console.log("here2");
    return false;
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
      contacts,
    } = this.props;
    return (
      <View style={styles.listContainer}>
        <Text style={styles.text}>Favorite Contacts</Text>
        <FlatList
          ListHeaderComponent={this.renderHeader()}
          numColumns={1}
          data={contacts}
          renderItem={({
            item: {
              id, name, phoneNumber, thumbnailPhoto,
            },
          }) => (
            <View>
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
  }
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    phoneNumber: PropTypes.number,
    thumbnailPhoto: PropTypes.string.isRequired,
  })).isRequired,
};

export default ContactList;
