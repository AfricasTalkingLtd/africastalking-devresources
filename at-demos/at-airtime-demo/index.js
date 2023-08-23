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

const airtime = AfricasTalking.AIRTIME;
// Send Airtime route
router.post("/", (req, res) => {
  const { options = {
            maxNumRetry: 3, // Will retry the transaction every 60seconds for the next 3 hours.
            recipients: [{
                phoneNumber: "+254***",
                currencyCode: "KES",
                amount: "5"
            }] 
          }
        } = req.body || res.status(400).json({error: "Both 'maxNumRetry' and 'recipients details' are required"});

  airtime
    .send(options)
    .then(response => {
      console.log(response);
      res.json(response);
    })
    .catch(error => {
      console.log(error);
      res.json(error.toString());
    });
});

// Create callback route
router.post("/status", async( req, res ) => {
  console.log(req.body);

  res.status(200).json({
      status: "success",
      message: "Airtime received successfully"
  })
});

module.exports = router;