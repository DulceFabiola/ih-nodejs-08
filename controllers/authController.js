const bcryptjs = require("bcryptjs");
const User = require("./../models/User");

exports.viewRegister = (req, res) => {
  res.render("auth/signup");
};

//Establecer un nuevo valor
exports.register = async (req, res) => {
  //1. Obtenemos datos del formulario
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  //2.Ecriptacion de password
  //bcryptjs pide que antes de que encriptes tu password el server haga un revolvente de A-H y del 0-9
  const salt = await bcryptjs.genSalt(10); //revolvente
  const passwordEncriptado = await bcryptjs.hash(password, salt); //combinancion del texto plano con el revolvente

  const newUser = await User.create({
    username,
    email,
    passwordEncriptado,
  });

  //redireccion de usuario
  res.redirect("/");
};
