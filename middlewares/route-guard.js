//Clasificare rutas en publicas y privadas
//Guardianes de las rutas

//next se utiliza para los middlewares
// EVALUAR SI EL USUARIO NO ESTÁ LOGGEADO
// SI NO ESTÁ LOGGEADO ENVIARLO A LOGIN...
//AREAS PRIVADAS: EL USUARIO DEBE DE ESTAR LIOGEADO PARA ACCEDER
const usuarioLoggeado = (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect("/auth/login");
    return;
  }
  // SI SÍ ESTÁ LOGGEADO ENVIARLO A LA SIGUIENTE FUNCIÓN (CONTROLLER)
  next();
};

//AREAS DE AUTENTICACION: EL USUARIO YA SE AUTENTICO Y QUIERE ENTRAR A LAS AREAS DE SIGUP Y LOGIN. POR LO TANTO LO REDIRIGIMOS AL HOME
const usuarioNoLoggeado = (req, res, next) => {
  //evaluar si esta autenticado
  //si esta autenticado...
  if (req.session.currentUser) {
    return res.redirect("/");
  }

  //SI NO ESTA AUITENTICADO, DEJALO PASAR AL LOGIN
  next();
};
module.exports = {
  usuarioLoggeado,
  usuarioNoLoggeado,
};
