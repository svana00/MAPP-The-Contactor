import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  listContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactContainer: {
    borderWidth: 2,
    borderColor: 'lightgrey',
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 10,
  },
  contactItem: {
    padding: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 5,
  },
  image: {
    width: 350,
    height: 200,
    borderRadius: 20,
    margin: 10,
  },
  title: {
    fontSize: 20,
    padding: 20,
    color: '#2c1c6c',
  },
});
