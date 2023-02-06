const express = require("express");
var app = express();
const server = require("http").Server(app);
//const router = express.Router();//manera vieja de enrutar las peticiones

const socket = require("./socket")
app.use(express.json());
app.use(express.urlencoded({extended : false}));

const db = require("./db");

db("mongodb+srv://avipez:Ev%4004Love@test-telegram.pkrxdwt.mongodb.net/test");


/* app.use("/", function(req, res) {
    res.send("hola");
}); */

/* app.use(router); 
app.use(router); manera vieja  x2 */

const routes =  require("./network/routes");
routes(app); // manera nueva y modular

socket.connect(server);

app.use("/app", express.static("public"));

app.listen(3000, function () {
    console.log("Server iniciado correctamente en http://localhost:3000");
});

console.log("La app esta escuchando en el puerto 3000")

