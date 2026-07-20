const express = require("express");

const router = express.Router;
const {handleGetAllusers, handleDeleteId, handleGetId, handlePatchId, handleCreateUser}= require('../controllers/user')

router.get("/", handleGetAllusers);


router
    .route("/:id")
    .get(handleGetId)
    .patch(handlePatchId)
    .delete(handleDeleteId)


router.post("/", handleCreateUser);


router.get("/", (req, res) => {
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});


//"I have created this router. Now I am sharing it so other files can use it."
module.exports = router;