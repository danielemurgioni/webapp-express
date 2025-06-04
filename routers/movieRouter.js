const express = require("express")

//variabile router
const router = express.Router()

//importo il controller
const movieController = require("../controllers/movieController")

//rotta index
router.get("/", movieController.index)

//rotta show
router.get("/:id", movieController.show)

module.exports = router