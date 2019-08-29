'use strict';

import firebaseAdmin from 'firebase-admin';

import {sanitizeProtectedData} from '../helper/utils.js';

// Initialise the firebase-admin module
// Refer https://firebase.google.com/docs/database/admin/start/#admin-sdk-authentication for more information
firebaseAdmin.initializeApp({
  'credential': firebaseAdmin.credential.applicationDefault(),
  'databaseURL': process.env.FIREBASE_URL,
});

const db = firebaseAdmin.database();

// 'path' is an array of paths which contain the data to be fetched
// Fetch the data located at https://firebase_database_url/path[i]
// Return the Array containing the data
// Refer https://firebase.google.com/docs/database/admin/retrieve-data for more information
export const fetchData = async (path) => {
  const firebaseRequestPromises = await path.map(async (key) => {
    const ref = db.ref(key);
    try {
      const snapshot = await ref.once('value');
      // Remove the data which is set be invisible than:
      // Return the resultant data
      return sanitizeProtectedData(snapshot.val());
    } catch (errorObject) {
      return new Promise((resolve, reject) => {
        reject(errorObject);
      });
    }
  });
  return await Promise.all(firebaseRequestPromises);
};
