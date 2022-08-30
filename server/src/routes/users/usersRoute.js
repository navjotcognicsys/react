const express = require("express");
const { registerUser, fetchUsers, loginUserCtrl } = require("../../controllers/users/usersCtrl");
const userRoute = express.Router();

userRoute.post('/register', registerUser);
userRoute.post('/login', loginUserCtrl);
userRoute.get('/',fetchUsers)

module.exports = userRoute
