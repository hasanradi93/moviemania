const express = require('express')

const router = express.Router()

const usersController = require("../Controllers/usersController")

router.get("/api/users", usersController.users)
router.post("/api/users", usersController.addUser)
router.put("/api/users/:id", usersController.updateUser)
router.delete("/api/users/:id", usersController.deleteUser)

module.exports = router