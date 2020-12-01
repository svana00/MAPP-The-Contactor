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

export const loadContact = async (fileName) => await onException(() => FileSystem.readAsStringAsync(`${contactDirectory}/${fileName}`));

export const addContact = async (contact, id) => {
  const fileName = contact.name.trim() + "-" + id + ".json";
  console.log(fileName);
  fileUri = `${contactDirectory}/${fileName}`;
  console.log(fileUri);
  contents = JSON.stringify(contact);
  console.log("IM HERE")
  await FileSystem.writeAsStringAsync(fileUri, contents)
  console.log("I SHOULD BW HWERE")
}

export const remove = async (name, id) => {
  const fileName = name.trim() + "-" + id + ".json";
  await onException(() => FileSystem.deleteAsync(`${contactDirectory}/${fileName}`, { idempotent: true }))};

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
  console.log("HE", result)
  return Promise.all(result.map(async (fileName) => ({
    contact: JSON.parse(await loadContact(fileName)),
  })));
};
