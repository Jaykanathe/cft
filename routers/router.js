const ROUTER = require("express").Router();
const userRouter = require("./userRouter");
ROUTER.use("/user",userRouter);

module.exports = ROUTER