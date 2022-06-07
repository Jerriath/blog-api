// Importing necessary node modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Modeling out the model's schema
const CommentSchema = new Schema({
    name: { type: String },
    message: { required: true, type: String },
    post: { required: true, type: mongoose.SchemaTypes.ObjectId, ref: "Post" },
    date: { default: Date.now(), required: true, type: Date}
})


// Exporting the schema as a model
module.exports = mongoose.model("Comment", CommentSchema);