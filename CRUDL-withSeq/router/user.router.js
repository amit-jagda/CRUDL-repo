const express = require("express");
const userRouter = express.Router();

const { asyncHandler } = require("../globalHandler/globalTryCatch");
const { addUser, getUsers } = require("../controllers/users.controller");

userRouter.post("/", asyncHandler(addUser));
// userRouter.get("/", asyncHandler(getUsers)); // not used currently

module.exports = userRouter;
