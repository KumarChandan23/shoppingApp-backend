const express = require("express");
const { connectDB } = require("./config/db");
const { PORT } = require("./config/index.JS");
const userRouter = require("./routes/user.routes.js")
const cors = require("cors");
const app = express();

connectDB();
app.use(cors());
app.use(express.json())

app.use("/api/v1/users", userRouter)

app.listen(PORT, (error) => {
    if (error) console.log(error)
    console.log("Express is running on port: ", PORT)
})