"use strict";

import express from "express";

import {fetchData} from "./components/controller/firebase.js";
import firebaseModel from "./components/model/firebase.js";
import {encodeString, forwardGuestMessage} from "./components/controller/services.js";
import {traverseJSONObject} from "./components/helper/utils.js";
import asyncMiddleware from "./components/middleware/asyncMiddleware.js"

const router = express.Router();

// This route handles request for data
router.get("/data", asyncMiddleware(async (request, response, next) => {
    let queryArray = [];
    // Type of data needed is provided in the 'type' query parameter, this field is case sensitive
    // If type of data needed is provided, fetch that data
    // If type of data needed is NOT provided, fetch all the data
    // If type of data needed does not exists, the request returns null
    try{
        if(request.query.type.length <= 0){
            throw("No valid values provided for query parameter 'type'");
        }
        queryArray = request.query.type.split(",");
    }
    catch(warning){
        console.warn("Fetching the complete dataset", warning);
        queryArray = firebaseModel;
    }
    
    // fetchData function pulls the requested data from the database, it returns data in an array
    let rawData = await fetchData(queryArray);

    // Data returned by the fetchData function is stored in an object with keys
    let formattedData = {};
    queryArray.map((key, index) => {
        formattedData[key] = rawData[index];
    })

    // traverseJSONObject function traverses a JavaScript object and executes a function on every primitive property of the object and it's children
    // In this case formattedData is our object and every string property of the object and it's children is converted into an encoded string for HTML rendering by the frontend
    // This function returns the object with encoded strings
    let encodedContent = traverseJSONObject(formattedData, encodeString);
    
    // The object is sent as a response to the client
    response.send(encodedContent);
    }));

    // This route handles messages sent from the 'contact us' form in the frontend
    router.post("/message", asyncMiddleware(async (request, response, next) => {
        // Forward the messages received from the frontend to Zapier by calling forwardGuestMessage function
        let result = await forwardGuestMessage({
            "Name": request.body["Name"],
            "e-Mail": request.body["e-Mail"],
            "Subject": request.body["Subject"],
            "Content": request.body["Content"]
        });

        // Send the response from Zapier's API to the frontend
        response.send(result.status);       
    }));

    // This is a debug route for testing Sentry
    router.get('/debug-sentry', function mainHandler(request, response, next) {
        //This route should work in testing environment only and should gives a 404 in production
        if(process.env.NODE_ENV === "production"){
            response.status(404).send("The requested resource does not exist");
        }
        else{
            throw new Error('This is sample error message for Sentry');
        }
    });

export default router;