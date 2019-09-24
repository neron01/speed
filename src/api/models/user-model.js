const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Client', 'Manager', 'Admin'],
        default: 'Client'
    }
});

UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next();
    bcryptjs.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcryptjs.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (candidatePassword, next) {
    bcryptjs.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return next(err);
        next(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
