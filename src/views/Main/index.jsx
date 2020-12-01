import React from 'react';
import { View, TextInput, SafeAreaView } from 'react-native';
import MainToolbar from '../../components/MainToolbar';
import data from '../../resources/data.json';
import AddContactModal from '../../components/AddContactModal';
import ContactList from '../../components/ContactList';
import LoadingScreen from '../../components/LoadingScreen';
import { takePhoto, selectFromCameraRoll } from '../../services/imageService';
import styles from './styles';
import { getAllContacts, addContact, remove } from '../../services/fileService';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      thumbnailPhoto: '',
      isAddContactModalOpen: false,
      isLoading: false,
      selectedContact: { id: 0, name: '', phoneNumber: '' },
      nextId: 2,
      isBeingModified: false,
    };
  }

  async componentDidMount() {
    await this._fetchContacts();
  }

  async _fetchContacts() {
    this.setState({isLoading: true});
    const gotten = await getAllContacts();
    let unsortedContacts = [];
    console.log('PABBI', contacts);
    for (var i in gotten) {
      unsortedContacts.push(gotten[i].contact)
    }
    const contacts = unsortedContacts.sort((a, b) => a.name.localeCompare(b.name))
    this.setState({isLoading: false, contacts})
  }

  async setData(filteredData) {
    this.setState({ contacts: filteredData });
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

  async addContact(name, phoneNumber) {
    console.log('IM HERE');
    const { contacts, nextId, thumbnailPhoto } = this.state;
    console.log('WOMAN', thumbnailPhoto);
    const contact = {
      id: nextId, name, phoneNumber, image: thumbnailPhoto,
    };
    console.log('NOW IM THERE');
    await addContact(contact, nextId);
    this.setState({ nextId: nextId + 1, contacts: [...contacts, contact] });
  }

  async modify(id, name, phoneNumber) {
    let newName = name;
    const newPhone = phoneNumber;
    let newImage = this.state.thumbnailPhoto;
    const old = contacts.filter((contact) => contact.id == id);
    const rest = contacts.filter(contact => contact.id != id);
    if (newName == '') { newName = old.name; }
    if (newPhone == '') {newPhoneNumber = old.phoneNumber; }
    if (newImage == '') {newImage = old.image; }
    const modified = {id, name: newName, phoneNumber: newPhone, image: newImage};
    await this.setState({ contacts: [...rest, modified] });
    await addContact(modified, id);
    await remove(old.name, id);
  }

  render() {
    const {
      contacts,
      isAddContactModalOpen,
      isLoading,
      selectedContact,
      isBeingModified,
    } = this.state;
    console.log('Hearthstone', contacts);
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
          updateData={(filteredData) => this.setData(filteredData)}
        />
        <AddContactModal
          id={selectedContact.id}
          oldName={selectedContact.name}
          oldPhone={selectedContact.phoneNumber}
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

export default Main;
