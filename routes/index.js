const express = require("express");
const router = express();
const indexController = require("./../controllers/indexController");
router.get("/", indexController.home);

module.exports = router;
