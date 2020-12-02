import { StyleSheet } from 'react-native';
import { LIGHT_BLUE } from '../../styles/colors';

export default StyleSheet.create({
  modalTitleText: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    paddingTop: 20,
  },
  confirm: {
    flex: 1,
    marginTop: 30,
    backgroundColor: 'red',
  },
  smallContainer: {
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    height: 100,
    width: 300,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonItem: {
    padding: 5,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    flexDirection: 'row',
    paddingBottom: 5,
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
