const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    githubId: String,
    name: String,
    username: String,
    avatar: String,
    location: String,
    bio: String,
    repositories: Number
});

module.exports = mongoose.model('User', UserSchema);