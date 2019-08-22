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

// This function traverses a JavaScript object and sets the entire object or it's children = null, if they contain a property 'Visible' having value false 
export const sanitizeProtectedData = (jsonObj) => {
   // If jsonObj is an array or object continue traversing
    if( jsonObj !== null && typeof jsonObj == "object" ) {
        // If jsonObj contains a property 'Visible' having value false than set jsonObj = null
        if(jsonObj.Visible === false){
            return null;
        }
        // Otherwise keep traversing further
        else{
            Object.entries(jsonObj).forEach(([key, value]) => {
                // Key is either an array index or object key
                jsonObj[key] = sanitizeProtectedData(value);
            });
        }
    }
    // If jsonObj is not an array or object return jsonObj
    return jsonObj;
}