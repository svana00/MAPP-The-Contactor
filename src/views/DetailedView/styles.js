import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  thumbnailImage: {
    margin: 50,
    marginBottom: 20,
    width: 200,
    height: 200,
    borderRadius: 400,
    overflow: 'hidden',
  },
  infoContainer: {
    alignItems: 'center',
  },
  phoneNumber: {
    padding: 10,
    fontSize: 36,
    color: 'green',
  },
  name: {
    fontSize: 36,
  },
  phone: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 5,
  },
});
