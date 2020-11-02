const express = require("express");
const Router = express.Router();

const Controller = require("../../Controllers/Sesi");

Router.get("/", Controller.getSesi);

module.exports = Router;
