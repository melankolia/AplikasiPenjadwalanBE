const express = require("express");
const Router = express.Router();

const Controller = require("../../Controllers/JadwalKuliah");

Router.get("/", Controller.getJadwalKuliah);

module.exports = Router;