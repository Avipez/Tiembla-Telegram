const express = require("express");
const controller = require("./controller")
const router = express.Router();
const response = require("../../network/response");

router.post("/", (req, res) => {
    controller.addUser(req.body.name)
        .then(data=> {
            response.success(req, res, data, 201)
        })
        .catch(err => {
            response.error(req, res, "Internal error", 505, err);
        })
});

router.get("/", (req, res) => {
    const filterUser = req.query.user || null;
    controller.getUsers(filterUser)
        .then( usersList => 
            response.success(req, res, usersList, 201))
        .catch( e => {
            response.error(req, res, "Unexpected error", 500, e)
        })
})

module.exports = router;