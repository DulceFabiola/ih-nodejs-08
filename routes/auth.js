//Autentificación
const express = require("express");
const router = express.Router();

const authController = require("./../controllers/authController");

//MOSTRAR EL FORMULARIO
router.get("/signup", authController.viewRegister);

//ENVIAR DATOS A LA DB QUE VIENENE DEL FORMULARIO
router.post("/signup", authController.register);
module.exports = router;
