'use strict';

import stringifyEntities from 'stringify-entities';
import axios from '../../../config/axios/axios.js';

// This function replaces HTML reserved characters with HTML character entities.
export const encodeStr = (input) => {
  if (typeof(input) === 'string') {
    return stringifyEntities(input);
  } else {
    return input;
  }
};

// This function forwards the data received from the 'contact us' form to Zapier
export const forwardGuestMsg = async (messageObject) => {
  return await axios.post('/hooks/catch/4655889/oba3c69', messageObject);
};
