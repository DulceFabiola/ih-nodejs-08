//Autentificación
const express = require("express");
const router = express.Router();

const authController = require("./../controllers/authController");
const routeGuard = require("./../middlewares/route-guard");
//MOSTRAR EL FORMULARIO
router.get(
  "/signup",
  routeGuard.usuarioNoLoggeado,
  authController.viewRegister
);

//ENVIAR DATOS A LA DB QUE VIENENE DEL FORMULARIO
router.post("/signup", routeGuard.usuarioNoLoggeado, authController.register);

// INICIAR SESIÓN
// A. MOSTRAR EL FORMULARIO
router.get("/login", routeGuard.usuarioNoLoggeado, authController.viewLogin);

//B MANEJO DEL FORMULARIO
router.post("/login", routeGuard.usuarioNoLoggeado, authController.login);

//CERRAR SESION

router.post("/logout", routeGuard.usuarioLoggeado, authController.logout);
module.exports = router;
