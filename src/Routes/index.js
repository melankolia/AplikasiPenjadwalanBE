const express = require("express");
const Router = express.Router();

// Root Directory
const path = require("path");
const rootDir = require("../Utils/Configs/path.js");

// Routes
const Users = require("./Users");
const WelcomePage = require("./WelcomePage");
const JadwalKuliah = require("./JadwalKuliah");
const JadwalHari = require("./JadwalHari");
const JadwalJam = require("./JadwalJam");
const Ruang = require("./Ruang");
const Sesi = require("./Sesi");
const Dosen = require("./Dosen");


Router.use("/users", Users);
Router.use("/WelcomePage", WelcomePage);
Router.use("/jadwal-kuliah", JadwalKuliah);
Router.use("/jadwal-hari", JadwalHari);
Router.use("/jadwal-jam", JadwalJam);
Router.use("/ruang", Ruang);
Router.use("/sesi", Sesi);
Router.use("/dosen", Dosen);

// Welcome Page HTML
Router.use("/", (req, res, next) => {
    res.status(404).sendFile(path.join(rootDir, "src" , "Views", "WelcomePage.html"));
});

module.exports = Router;