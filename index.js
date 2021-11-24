//1.IMPORTACIONES
const express = require("express");
const app = express();
const hbs = require("hbs");

//importacion de la db
const connectDB = require("./config/db");
require("dotenv").config();

//2.MIDDLEWARES
app.use(express.static("public"));

app.set("views", __dirname + "views");
app.set("view engine", "hbs");

hbs.registerPartials(__dirname + "/views/partials");

app.use(express.urlencoded({ extended: true }));
connectDB();

//3.RUTAS
app.use("/users", require("./routes/users"));
app.use("/", require("./routes/index"));

//4.EXPORTACION

app.listen(process.env.PORT, () => {
  console.log(`Puerto corriendo http://localhost:${process.env.PORT}`);
});
