const express = require("express");
const Router = express.Router();

const Controller = require("../../Controllers/Dosen");

Router.get("/", Controller.getDosen);
Router.get("/available", Controller.getDosenAvailable);
Router.get("/:nidn_dosen", Controller.getDetailDosen);
Router.post("/", Controller.createDosen);
Router.put("/:nidn_dosen", Controller.updateDosen);
Router.delete("/", Controller.deleteDosen);

module.exports = Router;