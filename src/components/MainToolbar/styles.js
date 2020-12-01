import { StyleSheet } from 'react-native';
import { LIGHT_BLUE } from '../../styles/colors';

export default StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    backgroundColor: LIGHT_BLUE,
    borderColor: 'black',
  },
  toolbarAction: {
    flex: 1,
    alignItems: 'center',
  },
  toolbarActionText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
  },
  toolbarAddText: {
    fontWeight: 'bold',
    color: 'green',
    fontSize: 25,
  },
  clear: {
    color: 'transparent',
  },
});
