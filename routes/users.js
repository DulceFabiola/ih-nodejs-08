//IMPORTACION

const express = require("express");
const router = express();
const usersController = require("./../controllers/usersController");
const routeGuard = require("./../middlewares/route-guard");

// router.get("/", usersController.register);
//podemos generar middlewares por ruta
//tan pronto encuentre un next, esta es la indicacion para pasar a la sig. funcion
//Middlewares de ruta
router.get("/profile", routeGuard.usuarioLoggeado, usersController.profile);

module.exports = router;
