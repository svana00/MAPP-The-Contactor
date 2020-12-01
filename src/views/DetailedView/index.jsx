import React from 'react';
import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { AntDesign } from '@expo/vector-icons';
import MainToolbar from '../../components/MainToolbar';
import styles from './styles';

class DetailedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: '',
      phoneNumber: '',
      thumbnailPhoto: '',
      isEditModalOpen: false,
    };
  }

  async componentDidMount() {
    // load board
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
    });
  }

  function() {
    console.log('hello, im a function!');
  }

  render() {
    const {
      id,
      name,
      phoneNumber,
      thumbnailPhoto,
      isEditModalOpen,
    } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#e5e5e5' }}>
        <MainToolbar title="" onModify={this.function} />
        <View style={{ alignItems: 'center' }}>
          <Image source={{ uri: thumbnailPhoto }} style={styles.thumbnailImage} resizeMode="cover" />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{name}</Text>
          <TouchableOpacity>
            <View style={styles.phone}>
              <Text style={styles.phoneNumber}>{phoneNumber}</Text>
              <AntDesign name="edit" color="white" size={25} />
            </View>
          </TouchableOpacity>
        </View>
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
