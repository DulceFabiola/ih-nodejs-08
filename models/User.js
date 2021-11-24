//1.IMPORTACIONES
const mongoose = require("mongoose");

//2.SCHEMA
const userSchema = mongoose.Schema({
  username: String,
  //Control de errores, en caso de que el usuario mande email vacio
  email: {
    type: String,
    required: [true, "Email es requerido."], // QUE NO ESTÉ VACÍO
    match: [/^\S+@\S+\.\S+$/, "Por favor, ingresa un email válido."], // REGEX DEL EMAIL
    unique: true, // EMAIL ÚNICO EN LA BASE DE DATOS
    lowercase: true, // MINÚSCULAS
    trim: true, // SIN ESPACIOS VACÍOS
  },
  passwordEncriptado: String,
});

//3.MODELO
const User = mongoose.model("User", userSchema);

//4. EXPORTACION
module.exports = User;
