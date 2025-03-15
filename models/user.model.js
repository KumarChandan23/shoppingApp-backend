const bcrypt = require("bcryptjs");

const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username:{type:String,required:true},
    email:{type:String, required: true, unique: true},
    password:{type: String, required: true}
}, { timestamps: true})

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next(); // Skip if password isn't modified
    let salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.verifyPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = model("User", userSchema);

