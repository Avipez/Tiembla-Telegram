// Recibe y procesa peticiones http

const express = require("express");
const controller = require("./controller")
const router = express.Router();
const response = require("../../network/response");


router.get("/", (req, res) => {
    controller.getMessages()
        .then((messageList => {
            response.success(req, res, messageList, 201)
        }))
        .catch( e => {
            response.error(req, res, "Unexpected error", 500, e)
        });
});

router.post("/", (req, res) => {
    controller.addMessages(req.body.user, req.body.message)
        .then((fullMessage) =>{
            response.success(req, res, fullMessage, 201);
        })
        .catch( e => {
            response.error(req, res, "Información inválida", 400);
        });
});

router.patch( "/:id", (req, res) => {
    console.log(req.params.id);
    controller.updateMessages(req.params.id, req.body.message)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch( e => {
            response.error(req, res, "Error interno", 500, e)
        });
});

router.put("/", (req, res) => {
    if(req.query.error == "ok"){
        response.error(req, res, "Error inesperado", 400, "es solo una simulación")
    } else {
        response.success(req, res, "Actualizado exitosamente", 201)
    }
    })

router.delete("/", (req, res) => {
    console.log(req.headers);
    console.log(req.query);
    console.log(req.body);
    response.success(req, res, {
        "error": "No hay error xdxdxd",
        "body": "El mensaje se " + req.body + " ha elminado"})
});


module.exports = router;