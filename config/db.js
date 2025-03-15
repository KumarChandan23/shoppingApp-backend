const { mongoose } = require("mongoose")
const { MONGODB } = require("./index.JS")

exports.connectDB = async()=>{
    await mongoose.connect(MONGODB,{dbName: "shoppingApp"});
    console.log("Mongodb is connected with Database")
}