const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");

dotenv.config();

// Authentication
const credentials = {
  apiKey: process.env.API_KEY, // API Key here, sandbox or live
  username: process.env.USERNAME // Username: 'sandbox' for the test environment, App username for live
};

// Require the AT package
const AfricasTalking = require("africastalking")(credentials);

const sms = AfricasTalking.SMS;
// Send SMS route
router.post("/", (req, res) => {
  sms
    .send({ 
        to: '+254***',
        message: "Hey there, welcome to AT dev! :)",
        enqueue: true })
    .then(response => {
      console.log(response);
      res.json(response);
    })
    .catch(error => {
      console.log(error);
      res.json(error.toString());
    });
});

// Delivery callback route
router.post("/delivery", async( req, res ) => {
  console.log(req.body);

  res.status(200).json({
      status: "success",
      message: "SMS received successfully"
  })
});

module.exports = router;