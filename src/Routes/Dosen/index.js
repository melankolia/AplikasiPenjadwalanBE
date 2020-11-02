const express = require("express");
const Router = express.Router();

const Controller = require("../../Controllers/Dosen");

Router.get("/", Controller.getDosen);
Router.post("/", Controller.createDosen);
Router.put("/", Controller.updateDosen);
Router.delete("/", Controller.deleteDosen);

module.exports = Router;