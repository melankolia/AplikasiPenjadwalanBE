const express = require("express");
const Router = express.Router();

// Root Directory
const path = require("path");
const rootDir = require("../Utils/Configs/path.js");

// Routes
const Users = require("./Users");
const WelcomePage = require("./WelcomePage");

Router.use("/users", Users);
Router.use("/WelcomePage", WelcomePage);

// Welcome Page HTML
Router.use("/", (req, res, next) => {
    res.status(404).sendFile(path.join(rootDir, "src" , "Views", "WelcomePage.html"));
});

module.exports = Router;