const express = require("express");
const Router = express.Router();

const Controller = require("../../Controllers/MataKuliah");

Router.get("/", Controller.getMataKuliah);
Router.get("/check", Controller.countMataKuliah);
Router.get("/:id_matkul", Controller.getDetailMataKuliah);
Router.post("/", Controller.createMataKuliah);
Router.put("/", Controller.updateMataKuliah);
Router.delete("/", Controller.deleteMataKuliah);

module.exports = Router;