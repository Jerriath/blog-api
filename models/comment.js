// Importing necessary node modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Modeling out the model's schema
const CommentSchema = new Schema({
    name: { String },
    message: { required: true, String },
    date: { default: Date.now(), required, Date}
})


// Exporting the schema as a model
module.exports = mongoose.model("Comment", CommentSchema);