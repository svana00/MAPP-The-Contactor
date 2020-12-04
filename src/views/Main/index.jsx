import React from 'react';
import { View, Alert } from 'react-native';
import PropTypes from 'prop-types';
import AddContactModal from '../../components/AddContactModal';
import ContactList from '../../components/ContactList';
import LoadingScreen from '../../components/LoadingScreen';
import MainToolbar from '../../components/MainToolbar';
import ConfirmationModal from '../../components/ConfirmationModal';
import { takePhoto, selectFromCameraRoll } from '../../services/imageService';
import {
  getAllContacts, addContact, remove,
} from '../../services/fileService';
import { importContactsFromPhone } from '../../services/getContactsFileService';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      thumbnailPhoto: 'http://www.clker.com/cliparts/d/L/P/X/z/i/no-image-icon-md.png',
      isAddContactModalOpen: false,
      isLoading: true,
      selectedContact: { id: 0, name: '', phoneNumber: '' },
      isBeingModified: false,
      isConfirmationModalOpen: false,
    };
  }

  async componentDidMount() {
    // await this.loadContacts();
    const { navigation } = this.props;
    await this.fetchContacts();
    this.willFocusSubscription = navigation.addListener(
      'willFocus',
      async () => {
        this.setState({ isLoading: true });
        await this.fetchContacts();
      },
    );
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  async setData(filteredData) {
    this.setState({ contacts: filteredData });
  }

  async TestContacts() {
    const data = await importContactsFromPhone();
    for (let i = 0; i < data.length; i += 1) {
      const { name } = data[i];
      if (data[i].phoneNumbers !== undefined) {
        const { number } = data[i].phoneNumbers[0];
        if (data[i].image !== undefined) {
          await this.setState({ thumbnailPhoto: data[i].image.uri });
        }
        await this.addFromPhone(name, number);
      }
    }

    this.setState({ isConfirmationModalOpen: false, isLoading: false, thumbnailPhoto: 'http://www.clker.com/cliparts/d/L/P/X/z/i/no-image-icon-md.png' });
  }

  async addFromPhone(name, phoneNumber) {
    this.setState({ isLoading: true });
    let { contacts } = this.state;
    const { thumbnailPhoto } = this.state;

    const spacelessPhoneNumber = phoneNumber.replace(/\s/g, '');
    let newName = name.replace(/\s/g, '');

    newName = newName.replace(/[^\w\s]/gi, '');

    const id = `${newName.trim()}${spacelessPhoneNumber.trim()}`;
    const newId = id.replace(/[^\w\s]/gi, '');

    const alreadyThere = contacts.filter((contact) => contact.id === id);
    const fileName = `${newName.trim()}-${newId.trim()}.json`;

    if (alreadyThere.length === 0) {
      const contact = {
        id,
        name,
        phoneNumber: phoneNumber.toString(),
        image: thumbnailPhoto,
        fileName,
      };
      contacts = [...contacts, contact];
      const sortedContacts = await contacts.sort((a, b) => a.name.localeCompare(b.name));
      await addContact(contact);
      this.setState({
        contacts: sortedContacts,
        isAddContactModalOpen: false,
        thumbnailPhoto: 'http://www.clker.com/cliparts/d/L/P/X/z/i/no-image-icon-md.png',
      });
    }
  }

  async fetchContacts() {
    const gotten = await getAllContacts();
    const unsortedContacts = [];
    for (let i = 0; i < gotten.length; i += 1) {
      unsortedContacts.push(gotten[i].contact);
    }
    const contacts = await unsortedContacts.sort((a, b) => a.name.localeCompare(b.name));
    this.setState({ isLoading: false, contacts });
  }

  async takePhoto() {
    const photo = await takePhoto();
    if (photo.length > 0) { this.setState({ thumbnailPhoto: photo }); }
  }

  async selectFromCameraRoll() {
    const photo = await selectFromCameraRoll();
    if (photo.length > 0) { this.setState({ thumbnailPhoto: photo }); }
  }

  async modify(id, name, phoneNumber) {
    const { thumbnailPhoto, contacts } = this.state;
    let newName = name;
    let newPhone = phoneNumber;
    let newImage = thumbnailPhoto;
    const old = contacts.filter((contact) => contact.id === id);
    const rest = contacts.filter((contact) => contact.id !== id);
    if (newName === '') { newName = old.name; }
    if (newPhone === '') { newPhone = old.phoneNumber; }
    if (newImage === '') { newImage = old.image; }

    const modified = {
      id,
      name: newName,
      phoneNumber: newPhone,
      image: newImage,
    };
    await this.setState({ contacts: [...rest, modified] });
    await addContact(modified, id);
    old.name = old.name.trim().replace(/[^\w\s]/gi, '');
    old.name = old.name.replace(/\s/g, '');
    await remove(old.name, id);
  }

  async addContact(name, phoneNumber) {
    this.setState({ isLoading: true });
    let { contacts } = this.state;
    const { thumbnailPhoto } = this.state;

    if (name.length === 0 || phoneNumber.length === 0) {
      setTimeout(() => {
        Alert.alert(
          'Blank Fields',
          'Please do not leave any fields blank.',
          [
            {
              text: 'OK',
              onPress: () => {},
            },
          ],
          { cancelable: false },
        );
      }, 500);
      this.setState({ isLoading: false });
    } else {
      const id = `${name.trim()}${phoneNumber.trim()}`;
      const alreadyThere = contacts.filter((contact) => contact.id === id);
      const fileName = `${name.trim().replace(/[^\w\s]/gi, '').replace(/\s/g, '')}-${id.trim().replace(/[^\w\s]/gi, '').replace(/\s/g, '')}.json`;
      if (alreadyThere.length === 0) {
        const contact = {
          id,
          name,
          phoneNumber: phoneNumber.toString(),
          image: thumbnailPhoto,
          fileName,
        };
        contacts = [...contacts, contact];
        const sortedContacts = await contacts.sort((a, b) => a.name.localeCompare(b.name));
        await addContact(contact);
        this.setState({
          contacts: sortedContacts,
          isAddContactModalOpen: false,
          thumbnailPhoto: 'http://www.clker.com/cliparts/d/L/P/X/z/i/no-image-icon-md.png',
        });
        setTimeout(() => {
          Alert.alert(
            'Contact created',
            'Your contact has been added to the system',
            [
              {
                text: 'OK',
                onPress: () => {},
              },
            ],
            { cancelable: false },
          );
        }, 500);
        this.setState({ isLoading: false });
      } else {
        setTimeout(() => {
          Alert.alert(
            'Contact already exists',
            'This contact already exists so we did not create it',
            [
              {
                text: 'OK',
                onPress: () => {},
              },
            ],
            { cancelable: false },
          );
        }, 500);
        this.setState({ isLoading: false, isAddContactModalOpen: false });
      }
    }
  }

  async deleteContact(fileName) {
    const { contacts } = this.state;
    this.setState({ isLoading: true });
    await remove(fileName);
    await this.setState({
      isLoading: false,
      contacts: contacts.filter((contact) => contact.fileName !== fileName),
    });
  }

  render() {
    const {
      contacts,
      isAddContactModalOpen,
      isLoading,
      selectedContact,
      isBeingModified,
      isConfirmationModalOpen,
    } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#e5e5e5' }}>
        <MainToolbar
          onAdd={() => this.setState({ isAddContactModalOpen: true })}
          onImport={() => this.setState({ isConfirmationModalOpen: true })}
          title="Contacts"
        />
        {isLoading
          ? <LoadingScreen />
          : (
            <>
              <ContactList
                contacts={contacts}
                updateData={(filteredData) => this.setData(filteredData)}
                onDelete={(fileName) => this.deleteContact(fileName)}
              />
            </>
          )}
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onConfirm={() => this.TestContacts()}
          closeModal={() => this.setState({ isConfirmationModalOpen: false })}
        />
        <AddContactModal
          id={selectedContact.id.toString()}
          oldName={selectedContact.name}
          oldPhone={selectedContact.phoneNumber.toString()}
          isOpen={isAddContactModalOpen}
          closeModal={() => this.setState({ isAddContactModalOpen: false })}
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
Main.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    addListener: PropTypes.func.isRequired,
  }).isRequired,
};
export default Main;
