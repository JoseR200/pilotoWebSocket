const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

router.post("/register", UserController.register);
router.get("/list", UserController.list);
router.get("/test-route", UserController.test);

module.exports = router;