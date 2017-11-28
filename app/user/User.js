const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.statics.findByUsername = function(username, cb) {
    return this.findOne({username: username}, cb);
}

UserSchema.statics.findByUsernameAndRemove = function(username, cb) {
    return this.findOneAndRemove({username: username}, cb);
}

UserSchema.statics.findByUsernameAndUpdate = function(username, updatedUser, cb) {
    return this.findOneAndUpdate({username: username}, updatedUser, {new: true}, cb);
}

UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

module.exports = mongoose.model('User', UserSchema);