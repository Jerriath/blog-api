// Importing necessary node modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Modeling out the schema
const PostSchema = new Schema({
    title: { required: true, type: String },
    content: { required: true, type: String },
    date: { required: true, type: Date, default: Date.now() },
    author: { required: true, type: String },
    published: { required: true, type: Boolean, default: false }
})


// Exporting the schema as a model
module.exports = mongoose.model("Post", PostSchema);