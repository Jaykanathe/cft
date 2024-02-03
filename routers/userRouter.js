const ROUTER = require("express").Router();
const userController = require("../controllers/userControlle");

ROUTER.post("/signup",userController.registerUser);
ROUTER.post("/login",userController.login);

module.exports = ROUTER;