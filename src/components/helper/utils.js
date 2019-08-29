'use strict';

// Traverses a JavaScript object than:
// Call the callback on every primitive property of the object
export const traverseJSONObject = (jsonObj, callback) => {
  // If jsonObj is an array or object continue traversing
  if ( jsonObj !== null && typeof jsonObj == 'object' ) {
    Object.entries(jsonObj).forEach(([key, value]) => {
      // Key is either an array index or object key
      jsonObj[key] = traverseJSONObject(value, callback);
    });
  } else {
    // If jsonObj is not an object than:
    // execute the callback function with jsonObj as the parameter
    jsonObj = callback(jsonObj);
  }
  return jsonObj;
};

// Traverses a JavaScript object, than:
// Set the entire object = null if:
// It contains a property 'Visible' having value false
export const sanitizeProtectedData = (jsonObj) => {
  // If jsonObj is an array or object continue traversing
  if ( jsonObj !== null && typeof jsonObj == 'object' ) {
    // If jsonObj contains a property 'Visible' having value false than:
    // Set jsonObj = null
    if (jsonObj.Visible === false) {
      return null;
    } else {
      // Otherwise keep traversing further
      Object.entries(jsonObj).forEach(([key, value]) => {
        // Key is either an array index or object key
        jsonObj[key] = sanitizeProtectedData(value);
      });
    }
  }
  // If jsonObj is not an array or object return jsonObj
  return jsonObj;
};
