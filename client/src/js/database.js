import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// Referring to Activity 28 -> client -> src -> js -> database.js
export const putDb = async (content) => {
  console.log('Put to the database');

  // Create connection to the database and version we want to use 
  const contactDb = await openDB('jate', 1);

  // Create a new transaction to specify the database and data privileges 
  const tx = contactDb.transaction('jate', 'readWrite');

  // Open up the desired object store
  const store = tx.objectStore('jate');

  // Use the .add() method on the store and pass in the content 
  // ASK TUTOR: did I do this right? 
  const request = store.add(content);

  // Get confirmation of the request 
  const result = await request;
  console.log('Data saved to the database', result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  const contactDb = await openDB('jate', 1);

  const tx = contactDb.transaction('jate', 'readonly');

  const store = tx.objectStore('jate');

  // Use the .getAll() method to get all data in the database
  const request = store.getAll();

  // Get confirmation of the request 
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
