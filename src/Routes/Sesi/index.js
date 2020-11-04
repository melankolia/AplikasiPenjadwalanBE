const express = require("express");
const Router = express.Router();

const Controller = require("../../Controllers/Sesi");

Router.get("/", Controller.getSesi);
Router.delete("/clean-up", Controller.cleanUpSesi);

module.exports = Router;
