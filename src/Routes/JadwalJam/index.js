const express = require("express");
const Router = express.Router();

const Controller = require("../../Controllers/JadwalJam");

Router.get("/", Controller.getJam);
Router.get("/:id_jam", Controller.getDetailJam);
Router.post("/", Controller.createJam);
Router.put("/", Controller.updateJam);
Router.delete("/", Controller.deleteJam);

module.exports = Router;