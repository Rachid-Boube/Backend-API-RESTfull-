const express = require("express");
const router = express.Router();
const authenticateUser = require("../middlewares/auth.middleware");
const homeController = require("../controllers/home.controller.js");

router.get("/", authenticateUser, homeController.home);

module.exports = router;
