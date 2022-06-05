const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { required, String },
    content: { required, String },
    date: { required, Date, default: Date.now() },
    author: { required, String },
    published: { required, Boolean }
})

module.exports = mongoose.model("Post", PostSchema);