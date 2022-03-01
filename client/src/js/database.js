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
export const putDb = async (content) => {
  const contentDB = await openDB('content');
  const text =contentDB.transaction('content', 'readwrite');
  const store = text.objectStore('content');
  const request= store.put ({id:1, value: content});
  const result = await request;
  console.log('J.A.T.E saved your text', result)
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const contentDB =await openDB('content');
  const text =contentDB.transaction('content', 'readonly');
  const store = text.objectStore('content');
  const request = store.getAll();
  const result=await request;
  console.log('result.value', result)
  return result;
}

initdb();
