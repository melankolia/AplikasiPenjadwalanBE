const express = require("express");
const Router = express.Router();

const Controller = require("../../Controllers/Exception");

Router.get("/", Controller.getException);
Router.post("/", Controller.createException);
Router.delete("/", Controller.deleteException);

module.exports = Router;