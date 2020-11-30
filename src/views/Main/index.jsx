import React from 'react';
import { View } from 'react-native';
import MainToolbar from '../../components/MainToolbar';
import data from '../../resources/data.json';
import AddContactModal from '../../components/AddContactModal';
import ContactList from '../../components/ContactList';
import { takePhoto, selectFromCameraRoll } from '../../services/imageService';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: data.contacts.sort((a, b) => a.name.localeCompare(b.name)),
      thumbnailPhoto: '',
      isAddContactModalOpen: false,
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
    } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <MainToolbar />
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
