const express = require("express");

const router = express.Router();

router.post("/ussd", (req, res) => {

  // Read variables sent via POST from our SDK
  
  const { sessionId, serviceCode, phoneNumber, text } = req.body;

  console.log('####################', req.body);
  let response = "";

  // Chained IF statements will take us through the USSD logic
  if (text === "") {
    console.log(text);
    // This is the first request 
    // Start responses with CON if they have further options/they CONtinue
    response = `CON Welcome to our USSD demo! Choose an option to proceed:
        1. New to Africa's Talking
        2. O.G. Member `;
  } else if (text === "1") {
    // Business logic for first level response
    // response = `CON Please enter your registration number:
    //     1. Yes
    //     2. No`;
    response = `CON Do you have an account?
    1. Yes
    2. No `;

  } else if (text === "2") {
    // Business logic for first level response, option 2
    // Start the response with END since it does not proceed further, (terminal request) it ENDs
    response = `END Welcome back, glad you're here. Your phone number is ${phoneNumber}.`;
  } else if (text === "1*1") {
    // This is a second level response
    // 1 was selected in the first level, 1 in the second level
    const accountNumber = "ACC100101";
    // The response starts with END since it is a terminal request
    response = `END That's true:). Your account number is ${accountNumber}`;
  } else if (text === "1*2") {
    // This is a second level response
    // 1 was selected in the first level, 2 in the second level
    // The response starts with END since it is a terminal request
    response = `END What are waiting for? Create an account at developers.africastalking.com. Looking forward to having you!`;
  }

  // Print the response onto the page so that our SDK can read it
  res.set("Content-Type: text/plain");
  res.send(response);
});

module.exports = router;