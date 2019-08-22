"use strict"

import firebaseAdmin from "firebase-admin";

// Initialise the firebase-admin module
// Refer https://firebase.google.com/docs/database/admin/start/#admin-sdk-authentication for more information
firebaseAdmin.initializeApp({
    "credential": firebaseAdmin.credential.applicationDefault(),
    "databaseURL": process.env.FIREBASE_URL
});

const db = firebaseAdmin.database();

// This function fetches the data located at https://firebase_database_url/path[i]
// It takes 'path' array as an argument.
// 'path' Array is a list of paths which contain the data to be fetched
// Refer https://firebase.google.com/docs/database/admin/retrieve-data for more information
// It returns an Array containing the data, data at each index of the Array is fetched from the path at the corresponding index of the path Array
export const fetchData = async (path) => {
    let firebaseRequestPromises = await path.map(async (key) => {
    const ref = db.ref(key);
        try{
            const snapshot = await ref.once("value");
            return snapshot.val();
        }
        catch(errorObject){
            return new Promise((resolve, reject) => {
                reject(errorObject)
            })
        }
    });
    return await Promise.all(firebaseRequestPromises);
}
