const express = require("express");
const Router = express.Router();

const Controller = require("../../Controllers/JadwalHari");

Router.get("/", Controller.getHari);
Router.get("/:id_hari", Controller.getDetailHari);
Router.post("/", Controller.createHari);
Router.put("/:id_hari", Controller.updateHari);
Router.delete("/", Controller.deleteHari);

module.exports = Router;