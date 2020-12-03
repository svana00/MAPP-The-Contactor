import { StyleSheet } from 'react-native';
import { LIGHT_BLUE } from '../../styles/colors';

export default StyleSheet.create({
  confirm: {
    flex: 1,
    marginTop: 30,
    backgroundColor: 'red',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonItem: {
    padding: 15,
    justifyContent: 'center',
  },
  importIcon: {
    padding: 0,
  },
  import: {
    color: 'green',
    fontSize: 20,
    backgroundColor: 'white',
  },
  cancel: {
    color: LIGHT_BLUE,
    fontSize: 20,
    backgroundColor: 'white',
  },
});
