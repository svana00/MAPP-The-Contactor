import React from 'react';
import {
  Text, View, TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';
import { AntDesign } from '@expo/vector-icons';
import Modal from '../Modal';
import styles from './styles';

const ConfirmationModal = ({
  isOpen, closeModal, onConfirm,
}) => (

  <Modal
    isOpen={isOpen}
    closeModal={closeModal}
  >
    <AntDesign name="download" size={70} color="black" />
    <Text style={styles.modalTitleText}>
      Import Phone Contacts?
    </Text>
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonItem}>
          <TouchableHighlight onPress={() => { closeModal(); }}>
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.buttonItem}>
          <TouchableHighlight onPress={() => { onConfirm(); }}>
            <Text style={styles.import}>
              Import
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  </Modal>
);

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ConfirmationModal;
