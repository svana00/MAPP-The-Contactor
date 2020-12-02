import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  thumbnailImage: {
    width: 80,
    height: 80,
    borderRadius: 150 / 2,
    overflow: 'hidden',
    borderWidth: 3,
  },
  icon: {
    fontSize: 25,
    marginTop: 25,
    marginBottom: 10,
    color: 'red',
  },
  listItem: {
    marginTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  listItemTitleText: {
    fontSize: 18,
  },
  title: {
    fontSize: 18,
    width: 170,
    padding: 10,
    marginTop: 15,
    marginLeft: 5,
  },
  subTitle: {
    fontSize: 15,
    width: 200,
    padding: 10,
    paddingHorizontal: 0,
  },
});
