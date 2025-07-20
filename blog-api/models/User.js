const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    timestamps: true
});

userSchema.methods.generateToken = function() {
    const token = jwt.sign({ _id: this._id, email: this.email }, JWT_SECRET, { expiresIn: '7d' });
    return token;
}

const User = mongoose.model('User', userSchema);

module.exports = User;
