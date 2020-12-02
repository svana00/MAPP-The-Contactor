import React from 'react';
import PropTypes from 'prop-types';
import { Entypo } from '@expo/vector-icons';
import {
  TouchableOpacity, Text, TextInput, TouchableHighlight, View,
} from 'react-native';
import Modal from '../Modal';
import styles from './styles';

class AddContactModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phoneNumber: '',
    };
  }

  handlePress() {
    const { name, phoneNumber } = this.state;
    const {
      id, onModify, isBeingModified, onSubmit,
    } = this.props;
    if (isBeingModified) {
      onModify(id, name, phoneNumber);
    } else {
      onSubmit(name, phoneNumber);
    }
    this.setState({ name: '', phoneNumber: '' });
  }

  render() {
    const {
      isOpen, closeModal, takePhoto, selectFromCameraRoll, oldName, oldPhone, isBeingModified,
    } = this.props;
    const { name, phoneNumber } = this.state;

    return (
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        style={{ margin: 0 }}
      >
        <View style={styles.modalStyle}>
          <Text style={styles.modalTitleText}>
            Add Contact
          </Text>
          <View style={styles.buttonContainer}>
            <View>
              <TouchableOpacity
                onPress={() => takePhoto()}
                style={styles.buttonItem}
              >
                <Entypo style={styles.icon} name="camera" />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => selectFromCameraRoll()}
                style={styles.buttonItem}
              >
                <Entypo style={styles.icon} name="image" />
              </TouchableOpacity>
            </View>
          </View>
          <TextInput
            onChangeText={(text) => this.setState({ name: text })}
            value={name}
            placeholder={isBeingModified ? oldName : 'Enter name'}
            minLength={2}
            maxLength={29}
            style={styles.textInput}
          />
          <TextInput
            keyboardType="phone-pad"
            onChangeText={(text) => this.setState({ phoneNumber: text })}
            value={phoneNumber}
            placeholder={isBeingModified ? oldPhone : 'Enter phone number'}
            minLength={7}
            maxLength={7}
            style={styles.textInput}
          />
          <TouchableHighlight
            style={styles.button}
            onPress={() => { this.handlePress(); }}
          >
            <Text style={styles.buttonText}>Submit Changes</Text>
          </TouchableHighlight>
        </View>
      </Modal>
    );
  }
}

AddContactModal.propTypes = {
  id: PropTypes.string.isRequired,
  oldName: PropTypes.string.isRequired,
  oldPhone: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  takePhoto: PropTypes.func.isRequired,
  selectFromCameraRoll: PropTypes.func.isRequired,
  onModify: PropTypes.func.isRequired,
  isBeingModified: PropTypes.bool.isRequired,
};

AddContactModal.defaultProps = { oldPhone: '' };

export default AddContactModal;
