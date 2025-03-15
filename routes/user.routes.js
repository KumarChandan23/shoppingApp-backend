
const Router = require("express");
const { registerUser, loginUser, logOut } = require("../controllers/user.controllers");

const router = Router();

router.post("/register",registerUser);
router.post("/login", loginUser);
router.get("/logout", logOut)

module.exports = router;