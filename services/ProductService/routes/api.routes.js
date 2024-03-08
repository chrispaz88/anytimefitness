const { Router } = require("express");
const { getAllPlatillos, getPlatilloid, putPlatillo, deletePlatillo, addPlatillo } = require("../controllers/api.controllers");



const router = Router()

router.get("/", getAllPlatillos)

router.get("/:id", getPlatilloid)

router.put("/:id", putPlatillo)

router.delete("/:id", deletePlatillo)

router.post("/", addPlatillo)

module.exports = router



