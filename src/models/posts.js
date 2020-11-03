const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    author: String,
    place: String,
    description: String,
    image: String,
});

module.exports = mongoose.model('Post', PostSchema);