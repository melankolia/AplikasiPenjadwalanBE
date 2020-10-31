const express = require("express");
const Router = express.Router();

const Controller = require("../../Controllers/WelcomePage/index");

Router.get("/", Controller.WelcomePage);

module.exports = Router;
