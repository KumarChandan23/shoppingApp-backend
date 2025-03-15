const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { JWT_SECRET } = require("../config/index.JS");

exports.generateToken = asyncHandler(async (id) => {
        jwt.sign({id}, JWT_SECRET, {expiresIn: "1d"})
})