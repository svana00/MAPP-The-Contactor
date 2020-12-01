import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  icon: {
    fontSize: 45,
    marginTop: 15,
    marginBottom: 15,
  },
  text: {
    fontSize: 20,
  },
  modalStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalTitleText: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 2,
  },
  textInput: {
    borderColor: 'grey',
    borderWidth: 1,
    width: 200,
    textAlign: 'center',
    margin: 2,
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 4,
    paddingRight: 4,
    marginBottom: 8,
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor: 'green',
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
  },
});
