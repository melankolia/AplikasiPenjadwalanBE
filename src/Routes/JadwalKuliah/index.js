const express = require("express");
const Router = express.Router();

const Controller = require("../../Controllers/JadwalKuliah");

Router.get("/", Controller.getJadwalKuliah);
Router.get("/check", Controller.checkJadwal);
Router.post("/create", Controller.generateJadwalKuliah);
Router.post("/create/sesi", Controller.createSesi);
Router.delete("/clean-up", Controller.cleanUpJadwal);

module.exports = Router;