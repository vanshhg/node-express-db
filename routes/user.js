const express = require("express");

const router = express.Router;
const {handleGetAllusers, handleDeleteId, handleGetId, handlePatchId, handleCreateUser}= require('../controllers/user')

router
    .route("/")
    .get(handleGetAllusers)
    .post(handleCreateUser);


router
    .route("/:id")
    .get(handleGetId)
    .patch(handlePatchId)
    .delete(handleDeleteId);



//"I have created this router. Now I am sharing it so other files can use it."
module.exports = router;