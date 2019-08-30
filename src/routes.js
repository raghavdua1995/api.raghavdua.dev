'use strict';

import express from 'express';

import {fetchData} from './components/controller/firebase.js';
import firebaseModel from './components/model/firebase.js';
// encodeStr function encodes a string for HTML rendering
// forwardGuestMsg function sends the messages from 'contact me' form to Zapier
import {encodeStr, forwardGuestMsg} from './components/controller/services.js';
import {traverseJSONObject} from './components/helper/utils.js';
import asyncMiddleware from './components/middleware/asyncMiddleware.js';

const router = new express.Router();

// This route handles request for data
router.get('/data', asyncMiddleware(async (request, response, next) => {
  let queryArray = [];
  // Type of data needed is provided in the 'type' query parameter
  // 'type' query parameter is case sensitive
  // If type of data needed is provided, fetch that data
  // If type of data needed is NOT provided, fetch all the data
  // If type of data needed does not exists, the request returns null
  if (!request.query.type || !request.query.type.length) {
    console.warn('No valid values provided for query parameter \'type\'');
    queryArray = firebaseModel;
  } else {
    queryArray = request.query.type.split(',');
  }

  // fetchData function pulls the requested data from the database and than:
  // It returns data in an array
  const rawData = await fetchData(queryArray);

  // Data returned by the fetchData function is stored in an object with keys
  const formattedData = {};
  queryArray.map((key, index) => {
    formattedData[`${key}`] = rawData[`${index}`];
  });

  // traverseJSONObject function traverses a JavaScript object and than:
  // It executes a function on every primitive property of the object
  // In this case formattedData is our object
  // Every string property of this object is converted into an encoded string
  // For HTML rendering by the frontend
  // This function returns the object with encoded strings
  const encodedContent = traverseJSONObject(formattedData, encodeStr);

  // The object is sent as a response to the client
  response.send(encodedContent);
}));

// This route handles messages sent from the 'contact me' form in the frontend
router.post('/message', asyncMiddleware(async (request, response, next) => {
  // Send the messages received from the frontend to Zapier
  const result = await forwardGuestMsg({
    'Name': request.body['Name'],
    'e-Mail': request.body['e-Mail'],
    'Subject': request.body['Subject'],
    'Content': request.body['Content'],
  });

  // Send the response from Zapier's API to the frontend
  response.send(result.status);
}));

// This is a debug route for testing Sentry
router.get('/debug-sentry', function mainHandler(request, response, next) {
  // This route should work in testing environment only and
  // Should gives a 404 in production
  if (process.env.NODE_ENV === 'production') {
    response.status(404).send('The requested resource does not exist');
  } else {
    throw new Error('This is sample error message for Sentry');
  }
});

export default router;
