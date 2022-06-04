const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    username: { required, String },
    password: { required, String }
});

// This middleware function will run when a new user is saved. It simply hashes the user password via bcrypt
UserSchema.pre('save', async (next) => {
    const hashedPass = await bcrypt.hash(this.password, 10);
    this.password = hashedPass;
    next();
})

// This is a custom method attatched to the user schema. It checks to see if some input password is correct by using bcrypt.compare with the hashed password.
UserSchema.methods.validatePassword = async (password) => {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);