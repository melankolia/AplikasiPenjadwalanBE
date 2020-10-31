const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require('cors');
const helmet = require('helmet');
require("dotenv").config();

// Init Router & App
const app = express();
const Router = require("./src/Routes/index");


// Init Morgan
app.use(logger("short"));

// Init Body Parser
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

// Init Cross Server Scripting
app.use(helmet.xssFilter());

// Manage cors, menentukan situs mana yang boleh akses, situs yang mana yang di blacklist
app.use(cors());

//  Setting Root Endpoint
app.use("/", Router);

// Init Server
app.listen(process.env.SERVER_PORT, () => console.log(`Running on Port ${process.env.SERVER_PORT}`));
