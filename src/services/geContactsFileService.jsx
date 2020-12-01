/* eslint-disable consistent-return */
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';

// eslint-disable-next-line import/prefer-default-export
export const getAllSystemContacts = async () => {
  const { status } = await Permissions.askAsync(Permissions.CONTACTS);
  if (status === 'granted') {
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.Image, Contacts.Fields.PhoneNumbers],
    });
    return data;
  }
};
