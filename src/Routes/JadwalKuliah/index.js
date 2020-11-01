const express = require("express");
const Router = express.Router();

const Controller = require("../../Controllers/JadwalKuliah");

Router.get("/", Controller.getJadwalKuliah);
Router.post("/create", Controller.createSesi);

module.exports = Router;