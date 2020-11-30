import React from 'react';
import { View, TextInput, SafeAreaView } from 'react-native';
import MainToolbar from '../../components/MainToolbar';
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
      contacts: data.contacts.sort((a, b) => a.name.localeCompare(b.name)),
      thumbnailPhoto: '',
      isAddContactModalOpen: false,
      isLoading: false,
    };
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
        <MainToolbar />
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
