import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';

// eslint-disable-next-line import/prefer-default-export
export const importContactsFromPhone = async () => {
  const { status } = await Permissions.askAsync(Permissions.CONTACTS);
  if (status === 'granted') {
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers, Contacts.Fields.Image],
    });
    console.log("mamma", data)
    return data;
  }
};
