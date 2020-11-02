const express = require("express");
const Router = express.Router();

const Controller = require("../../Controllers/JadwalJam");

Router.get("/", Controller.getJam);
Router.post("/", Controller.createJam);
Router.put("/", Controller.updateJam);
Router.delete("/", Controller.deleteJam);

module.exports = Router;