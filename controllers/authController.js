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

  //Validacion
  //A) Verificar que username, email y password tengan contenido

  if (!username || !email || !password) {
    res.render("auth/signup", {
      errorMessage: "Uno o mas campos estan vacios. Revisalos nuevamente",
    });
    return;
  }

  //B) Fortaleciemiento de password
  //Verificar que password tengan 6 caracteres, un numero y una Mayuscula,

  //expresiones regulares: permiten hacer validaciones,
  //REGEX-Conjunto de reglas que auditan un texto plano
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res.render("auth/signup", {
      errorMessage:
        "Tu password debe de contener 6 caracteres mínimo, un número y una mayúscula.",
    });
    return;
  }

  //2.Ecriptacion de password
  //bcryptjs pide que antes de que encriptes tu password el server haga un revolvente de A-H y del 0-9
  //
  try {
    const salt = await bcryptjs.genSalt(10); //revolvente
    const passwordEncriptado = await bcryptjs.hash(password, salt); //combinancion del texto plano con el revolvente

    const newUser = await User.create({
      username,
      email,
      passwordEncriptado,
    });

    //redireccion de usuario
    res.redirect("/");
  } catch (error) {
    console.log(error);
    //Seccion de errores
    //Error status: 500, error en el server
    res.status(500).render("auth/signup", {
      errorMessage:
        "Hubo un error con la validacion de tu correo. Intenta nuevamente, nod ejes espacios, usa minusculas ",
    });
  }
};
