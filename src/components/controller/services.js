"use strict"

import stringifyEntities from "stringify-entities";
import axios from "../../../config/axios/axios.js"

// This function replaces HTML reserved characters in the input string HTML character entities.
export const encodeString = (input) => {
    if(typeof(input) === "string"){
        return stringifyEntities(input);
    }
    else{
        return input
    }
}

// This function forwards the message received from the 'contact us' form in frontend to Zapier
export const forwardGuestMessage = async (messageObject) => {
    return await axios.post("/hooks/catch/4655889/oba3c69", messageObject);
}