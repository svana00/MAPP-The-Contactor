import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import MainToolbar from '../../components/MainToolbar';

class DetailedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: '',
      phoneNumber: '',
    };
  }

  async componentDidMount() {
    // load board
    const { navigation } = this.props;
    const contactId = navigation.getParam('contactId', '');
    const contactName = navigation.getParam('contactName', '');
    const contactPhoneNumber = navigation.getParam('contactPhoneNumber', '');
    this.setState({ id: contactId, name: contactName, phoneNumber: contactPhoneNumber });
  }

  render() {
    const {
      id,
      name,
      phoneNumber,
    } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#e5e5e5' }}>
        <MainToolbar />
        <Text>
          Why, hello there
          {' '}
          {name}
          Your Id is
          {' '}
          {id}
          And your Phone Number is
          {' '}
          {phoneNumber}
        </Text>
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