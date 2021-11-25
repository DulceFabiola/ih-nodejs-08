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
    res.redirect("/auth/login");
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

exports.viewLogin = async (req, res) => {
  res.render("auth/login");
};

exports.login = async (req, res) => {
  try {
    // 1. OBTENCIÓN DE DATOS DEL FORMULARIO
    const email = req.body.email;
    const password = req.body.password;

    // 2. VALIDACIÓN DE USUARIO ENCONTRADO EN BD
    //metodo findOne devulve la primer coincidencia y termina la busqueda
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      res.render("auth/login", {
        errorMessage: "Email o contraseña sin coincidencia.",
      });
      return;
    }

    // 3. VALIDACIÓN DE CONTRASEÑA

    const verifiedPass = await bcryptjs.compareSync(
      password,
      foundUser.passwordEncriptado
    );

    if (!verifiedPass) {
      res.render("auth/login", {
        errorMessage: "Email o contraseña errónea. Intenta nuevamente.",
      });

      return;
    }

    // 4. (PRÓXIMAMENTE) GENERAR LA SESIÓN
    //PERSISTENCIA DE IDENTIDAD
    req.session.currentUser = {
      _id: foundUser._id,
      username: foundUser.username,
      email: foundUser.email,
      mensaje: "LO LOGRAMOS CARAJO",
    };
    // 5. REDIRECCIONAR AL HOME
    res.redirect("/users/profile");
  } catch (error) {
    console.log(error);
  }
};

//cerrar sesion
exports.logout = async (req, res) => {
  res.clearCookie("session-token");
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return next(err);
    }

    res.redirect("/");
  });
};
