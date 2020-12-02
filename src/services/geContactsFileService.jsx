import * as Contacts from 'expo-contacts';

// eslint-disable-next-line import/prefer-default-export
export const getAllSystemContacts = async () => {
  const permission = await Contacts.requestPermissionsAsync();

  if (permission.status !== 'granted') {
    console.log('permission not granted');
    console.log(permission);
    return null;
  }

  const { contactData } = await Contacts.getContactsAsync({
    fields: [Contacts.Fields.name,
    ],
  });
  console.log(contactData);
  return contactData;
};
