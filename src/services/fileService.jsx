import * as FileSystem from 'expo-file-system';

const contactDirectory = `${FileSystem.documentDirectory}contacts`;

const onException = (cb, errorHandler) => {
  try {
    return cb();
  } catch (err) {
    if (errorHandler) {
      return errorHandler(err);
    }
    console.error(err);
  }
};

export const cleanDirectory = async () => {
  await FileSystem.deleteAsync(contactDirectory);
};

export const loadContact = async (fileName) => onException(() => FileSystem.readAsStringAsync(`${contactDirectory}/${fileName}`));

export const addContact = async (contact) => {
  const fileUri = `${contactDirectory}/${contact.fileName}`;
  console.log(fileUri);
  await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(contact));
};

export const remove = async (fileName) => {
  await onException(() => FileSystem.deleteAsync(`${contactDirectory}/${fileName}`, { idempotent: true }));
};

const setupDirectory = async () => {
  const dir = await FileSystem.getInfoAsync(contactDirectory);
  if (!dir.exists) {
    await FileSystem.makeDirectoryAsync(contactDirectory);
  }
};

export const getAllContacts = async () => {
  // Check if directory exists
  await setupDirectory();

  const result = await onException(() => FileSystem.readDirectoryAsync(contactDirectory));
  return Promise.all(result.map(async (fileName) => ({
    contact: JSON.parse(await loadContact(fileName)),
  })));
};
