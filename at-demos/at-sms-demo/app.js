const express = require("express");
const dotenv = require("dotenv");
const smsRoute = require("./index");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`running on localhost:${PORT}`));

app.use(bodyParser.json());

app.use("/", smsRoute);