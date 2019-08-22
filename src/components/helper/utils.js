"use strict"

// This function traverses a JavaScript object and executes the callback on every primitive property of the object and it's children
export const traverseJSONObject = (jsonObj, callback) => {
    // If jsonObj is an array or object continue traversing
    if( jsonObj !== null && typeof jsonObj == "object" ) {
        Object.entries(jsonObj).forEach(([key, value]) => {
            // Key is either an array index or object key
            jsonObj[key] = traverseJSONObject(value, callback);
        });
    }
    else{
        // If jsonObj is not an object, execute the callback function with jsonObj as the parameter
        jsonObj = callback(jsonObj);
    }
    return jsonObj;
}
