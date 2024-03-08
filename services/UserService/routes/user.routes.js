const { Router } = require("express");
const { getAllUsers, getUserByUsername, updateUserPassword, createUser } = require("../controllers/user.controller");



const router = Router()

router.get("/", getAllUsers)

router.post("/", createUser)

router.get("/:usuario", getUserByUsername)

router.put("/:usuario", updateUserPassword)


module.exports = router



