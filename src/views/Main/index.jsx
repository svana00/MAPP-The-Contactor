import React from 'react';
import { View, TextInput, SafeAreaView } from 'react-native';
import * as Contacts from 'expo-contacts';
import data from '../../resources/data.json';
import AddContactModal from '../../components/AddContactModal';
import ContactList from '../../components/ContactList';
import LoadingScreen from '../../components/LoadingScreen';
import { takePhoto, selectFromCameraRoll } from '../../services/imageService';
import styles from './styles';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: data.contacts,
      thumbnailPhoto: '',
      isAddContactModalOpen: false,
      isLoading: false,
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    this.loadContact();
  }

  async loadContact() {
    const permission = await Contacts.requestPermissionsAsync();

    if (permission !== 'granted') {
      return;
    }
    const { contactData } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.Name,
        Contacts.Fields.PhoneNumbers,
        Contacts.Fields.Image,
      ],
    });
    console.log(contactData);
    this.setState({ contacts: contactData, isLoading: false });
  }

  async takePhoto() {
    const { thumbnailPhoto } = this.state;
    if (thumbnailPhoto === '') {
      console.log('hi');
    }
    const photo = await takePhoto();
    if (photo.length > 0) { this.setState({ thumbnailPhoto: photo }); }
  }

  async selectFromCameraRoll() {
    const photo = await selectFromCameraRoll();
    if (photo.length > 0) { this.setState({ thumbnailPhoto: photo }); }
  }

  render() {
    const {
      contacts,
      isAddContactModalOpen,
      isLoading,
    } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#e5e5e5' }}>
        <SafeAreaView style={{ backgroundColor: '#e5e5e5' }} />
        <View style={styles.search}>
          <TextInput
            placeholder="Search"
            placeholderTextColor="#000000"
            style={styles.search}
          />
        </View>
        {isLoading ? <LoadingScreen /> : null}
        <ContactList
          contacts={contacts}
        />
        <AddContactModal
          isOpen={isAddContactModalOpen}
        />
      </View>
    );
  }
}

export default Main;
