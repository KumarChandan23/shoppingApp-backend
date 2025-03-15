const asyncHandler = require("express-async-handler");
const userModel = require("../models/user.model");
const ErrorHandler = require("../utils/errorHandlers.utils.js");
const { generateToken } = require("../utils/jwt.utils.js");

exports.registerUser = asyncHandler(async (req, res) => {
    
    let {username, email, password} = req.body;
    let existingUser = await userModel.findOne({email});

    if(existingUser){
        throw new ErrorHandler(409, "User already exists with this email, Please login.");
    }

    let newUser = await userModel.create({username, email, password});

    res.status(201).json({
        success:true,
        message:"user registered successfully",
        newUser
    })

})

exports.loginUser = asyncHandler( async (req, res) => {
    
    let {email, password} = req.body;
    let existingUser = await userModel.findOne({email});
    if(!existingUser){
        throw new ErrorHandler(404,"User does not exists. Please Signup first.")
    }
    let isMatch = await existingUser.verifyPassword(password);
    if(!isMatch){
        throw new ErrorHandler(400," Invalid credentials");
    }

    let token = generateToken(existingUser.id);

    res.cookie("cookieName", token, { maxAge: 1 * 60 * 60 * 1000 });

    res.status(200).json({success: true, message: "User loggedin successfully"})
})

exports.logOut = asyncHandler(async (req, res) => {
    res.clearCookie("cookieName","", {maxAge:1});
    res.status(200).json({success: true, message: "User logged out successfully"});
})