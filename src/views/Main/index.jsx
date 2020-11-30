import React from 'react';
import { View, Text } from 'react-native';
import MainToolbar from '../../components/MainToolbar';
import data from '../../resources/data.json';
import AddContactModal from '../../components/AddContactModal';
import ContactList from '../../components/ContactList';
import { takePhoto, selectFromCameraRoll } from '../../services/imageService';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: data.contacts,
      thumbnailPhoto: '',
      isAddBoardModalOpen: false,
      isBeingModified: false,
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
      isAddBoardModalOpen,
      isBeingModified,
    } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Text>Welcome to the main page</Text>
      </View>
    );
  }
}

export default Main;
