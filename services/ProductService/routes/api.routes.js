const { Router } = require("express");
const { getAllServices: getAllServices, getServicioid: getServicioid, putServicio: putServicio, deleteServicio: deleteServicio, addServicio: addServicio } = require("../controllers/api.controllers");



const router = Router()

router.get("/", getAllServices)

router.get("/:id", getServicioid)

router.put("/:id", putServicio)

router.delete("/:id", deleteServicio)

router.post("/", addServicio)

module.exports = router



