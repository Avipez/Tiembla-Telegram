const express = require("express");
const controller = require("./controller")
const router = express.Router();
const response = require("../../network/response");

router.post("/", (req, res) => {
    controller.addChat(req.body.users)
        .then(data=> {
            response.success(req, res, data, 201)
        })
        .catch(err => {
            response.error(req, res, "Internal error", 505, err);
        })
});

router.get("/:userId", (req, res) => {
    controller.getChats(req.params.userID)
        .then( userChats => 
            response.success(req, res, userChats, 201))
        .catch( e => {
            response.error(req, res, "Unexpected error", 500, e)
        })
});


module.exports = router;