import React from 'react';
import {
  View, Text, Image, TouchableOpacity, Linking,
} from 'react-native';
import PropTypes from 'prop-types';
import MainToolbar from '../../components/MainToolbar';
import styles from './styles';
import LoadingScreen from '../../components/LoadingScreen';
import {
  addContact, remove,
} from '../../services/fileService';
import { takePhoto, selectFromCameraRoll } from '../../services/imageService';
import AddContactModal from '../../components/AddContactModal';

class DetailedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      phoneNumber: '',
      thumbnailPhoto: '',
      newThumbnail: '',
      isEditModalOpen: false,
      isLoading: true,
      isBeingModified: false,
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

  async setupModify() {
    this.setState({ isEditModalOpen: true, isBeingModified: true });
  }

  async takePhoto() {
    const photo = await takePhoto();
    if (photo.length > 0) { this.setState({ newThumbnail: photo }); }
  }

  async selectFromCameraRoll() {
    const photo = await selectFromCameraRoll();
    if (photo.length > 0) { this.setState({ newThumbnail: photo }); }
  }

  async modify(id, nName, nPhoneNumber) {
    const {
      newThumbnail, name, phoneNumber, thumbnailPhoto,
    } = this.state;
    let newName = nName;
    let newPhone = nPhoneNumber;
    let newImage = newThumbnail;
    if (newName === '') { newName = name; }
    if (newPhone === '') { newPhone = phoneNumber; }
    if (newImage === '') { newImage = thumbnailPhoto; }

    const spacelessPhoneNumber = phoneNumber.replace(/\s/g, '');

    const newId = `${newName.trim().replace(/[^\w\s]/gi, '').replace(/\s/g, '')}${spacelessPhoneNumber}`;
    const newFile = `${newName.trim().replace(/[^\w\s]/gi, '').replace(/\s/g, '')}-${newId.trim().replace(/[^\w\s]/gi, '').replace(/\s/g, '')}.json`;
    const modified = {
      id: newId, name: newName, phoneNumber: newPhone, image: newImage, fileName: newFile,
    };
    const oldFileName = `${name.trim().replace(/[^\w\s]/gi, '').replace(/\s/g, '')}-${id.trim().replace(/[^\w\s]/gi, '').replace(/\s/g, '')}.json`;
    await remove(oldFileName);
    await this.setState({
      id: newId,
      name: newName,
      phoneNumber: newPhone,
      thumbnailPhoto: newImage,
      isBeingModified: false,
      isEditModalOpen: false,
    });
    await addContact(modified);
  }

  render() {
    const {
      id,
      name,
      phoneNumber,
      thumbnailPhoto,
      isEditModalOpen,
      isLoading,
      isBeingModified,
    } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#e5e5e5' }}>
        <MainToolbar title={name} onModify={() => this.setupModify()} />
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

        <AddContactModal
          id={id}
          oldName={name}
          oldPhone={phoneNumber}
          isOpen={isEditModalOpen}
          closeModal={() => this.setState({ isEditModalOpen: false })}
          takePhoto={() => this.takePhoto()}
          selectFromCameraRoll={() => this.selectFromCameraRoll()}
          onSubmit={(name, phoneNumber) => this.addContact(name, phoneNumber)}
          isBeingModified={isBeingModified}
          onModify={(id, name, phoneNumber) => this.modify(id, name, phoneNumber)}
        />

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
