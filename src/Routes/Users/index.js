const express = require("express");
const Router = express.Router();

const Controller = require("../../Controllers/Users/index.js");

Router.get("/", Controller.getUser);
Router.post("/", Controller.register);
Router.post("/login", Controller.loginUser);

module.exports = Router;