const express = require("express");
const Router = express.Router();

const Controller = require("../../Controllers/Users/index.js");

Router.get("/", Controller.getUser);
Router.post("/", Controller.register);

module.exports = Router;