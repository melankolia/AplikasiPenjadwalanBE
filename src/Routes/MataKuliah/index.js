const express = require("express");
const Router = express.Router();

const Controller = require("../../Controllers/MataKuliah");

Router.get("/", Controller.getMataKuliah);
Router.post("/", Controller.createMataKuliah);
Router.put("/", Controller.updateMataKuliah);
Router.delete("/", Controller.deleteMataKuliah);

module.exports = Router;