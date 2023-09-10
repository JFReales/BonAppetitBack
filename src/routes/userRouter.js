const { Router } = require("express");
const { createUser, deleteUser } = require("../controllers/createUser");
const { changePasswordUser } = require("../handlers/handlerCreateUser");
const getUserById = require("../controllers/getUserById");

const userRouter = Router();

userRouter.get("/:id", getUserById);
userRouter.post("/create", createUser);

userRouter.delete("/delete", deleteUser);

userRouter.put("/put", changePasswordUser);

module.exports = userRouter;
