// Importing necessary node modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Modeling out the schema
const PostSchema = new Schema({
    title: { required: true, String },
    content: { required: true, String },
    date: { required: true, Date, default: Date.now() },
    author: { required: true, String },
    published: { required: true, Boolean }
})


// Exporting the schema as a model
module.exports = mongoose.model("Post", PostSchema);