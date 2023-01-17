// Recibe y procesa peticiones http

const express = require("express");
const controller = require("./controller")
const router = express.Router();
const response = require("../../network/response");
const multer = require("multer");

const upload = multer(
    {dest: "public/files",}
)

router.get("/", function (req, res) {
    const filterMessages = req.query.chat || null;
    controller.getMessages(filterMessages)
        .then((messageList => {
            response.success(req, res, messageList, 201)
        }))
        .catch( e => {
            response.error(req, res, "Unexpected error", 500, e)
        })
});

router.post("/", upload.single("file"), (req, res) => {
    controller.addMessages(req.body.chat, req.body.user, req.body.message, req.file)
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
    });

/* router.delete("/", (req, res) => {
    console.log(req.headers);
    console.log(req.query);
    console.log(req.body);
    response.success(req, res, {
        "error": "No hay error xdxdxd",
        "body": "El mensaje se " + req.body + " ha elminado"})
}); */

router.delete("/:id", (req, res) => {
    controller.deleteMessage(req.params.id)
    .then( () => {
        response.success( req, res, `Mensaje ${req.params.id} eliminado`, 200);
    })
    .catch( e => {
        response.error(req, res, "error interno", 500, e);
    })
})


module.exports = router;