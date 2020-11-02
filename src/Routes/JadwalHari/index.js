const express = require("express");
const Router = express.Router();

const Controller = require("../../Controllers/JadwalHari");

Router.get("/", Controller.getHari);
Router.post("/", Controller.createHari);
Router.put("/", Controller.updateHari);
Router.delete("/", Controller.deleteHari);

module.exports = Router;