const express = require("express");
const Router = express.Router();

const Controller = require("../../Controllers/Ruang");

Router.get("/", Controller.getRuang);
Router.post("/", Controller.createRuang);
Router.put("/", Controller.updateRuang);
Router.delete("/", Controller.deleteRuang);

module.exports = Router;