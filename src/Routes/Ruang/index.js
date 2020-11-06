const express = require("express");
const Router = express.Router();

const Controller = require("../../Controllers/Ruang");

Router.get("/", Controller.getRuang);
Router.get("/:id_ruang", Controller.getDetailRuang);
Router.post("/", Controller.createRuang);
Router.put("/", Controller.updateRuang);
Router.delete("/", Controller.deleteRuang);

module.exports = Router;