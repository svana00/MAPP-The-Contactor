import React from 'react';
import {
  View, Text, Image, TouchableOpacity, Linking,
} from 'react-native';
import PropTypes from 'prop-types';
import MainToolbar from '../../components/MainToolbar';
import styles from './styles';
import LoadingScreen from '../../components/LoadingScreen';
import {
  getAllContacts, addContact, remove, cleanDirectory,
} from '../../services/fileService';

class DetailedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: '',
      phoneNumber: '',
      thumbnailPhoto: '',
      newThumbnail: '',
      newName: '',
      newPhone: '',
      isEditModalOpen: false,
      isLoading: true,
      modify: false,
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const contactId = navigation.getParam('contactId', '');
    const contactName = navigation.getParam('contactName', '');
    const contactPhoneNumber = navigation.getParam('contactPhoneNumber', '');
    const contactThumbnailPhoto = navigation.getParam('contactThumbnailPhoto', '');
    this.setState({
      id: contactId,
      name: contactName,
      phoneNumber: contactPhoneNumber,
      thumbnailPhoto: contactThumbnailPhoto,
      isLoading: false,
    });
  }

  async modify(id, name, phoneNumber) {
    const { thumbnailPhoto } = this.state;
    let newName = name;
    let newPhone = phoneNumber;
    let newImage = thumbnailPhoto;
    const old = contacts.filter((contact) => contact.id === id);
    const rest = contacts.filter((contact) => contact.id !== id);
    if (newName === '') { newName = old.name; }
    if (newPhone === '') { newPhone = old.phoneNumber; }
    if (newImage === '') { newImage = old.image; }
    const modified = {
      id, name: newName, phoneNumber: newPhone, image: newImage,
    };
    await this.setState({ contacts: [...rest, modified] });
    await addContact(modified, id);
    await remove(old.name, id);
  }

  render() {
    const {
      id,
      name,
      phoneNumber,
      thumbnailPhoto,
      isEditModalOpen,
      isLoading
    } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#e5e5e5' }}>
        <MainToolbar title={name} onModify={() => { console.log('hi'); }} />
        {isLoading
          ? <LoadingScreen />
          : (
            <>
            <View style={{ alignItems: 'center' }}>
              <Image source={{ uri: thumbnailPhoto }} style={styles.thumbnailImage} resizeMode="cover" />
            </View>
            <View style={styles.infoContainer}>
              <TouchableOpacity onPress={() => { Linking.openURL(`tel:${phoneNumber}`); }}>
                <View style={styles.phone}>
                  <Text style={styles.phoneNumber}>{phoneNumber}</Text>
                </View>
              </TouchableOpacity>
            </View>
            </>
          )}

      </View>
    );
  }
}

DetailedView.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};

export default DetailedView;
