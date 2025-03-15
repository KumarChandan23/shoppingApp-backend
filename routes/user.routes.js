
const Router = require("express");
const { registerUser, loginUser, logOut } = require("../controllers/user.controllers");

const router = Router();

router.get("/",(req,res)=>{
    res.status(200).send("Hello Developer, This is landing Page")
})
router.post("/register",registerUser);
router.post("/login", loginUser);
router.get("/logout", logOut)

module.exports = router;