const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { required: true, String },
    content: { required: true, String },
    date: { required: true, Date, default: Date.now() },
    author: { required: true, String },
    published: { required: true, Boolean }
})

module.exports = mongoose.model("Post", PostSchema);