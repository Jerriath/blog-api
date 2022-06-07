// Importing necessary node modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Modeling out the schema
const PostSchema = new Schema({
    title: { required: true, type: String },
    content: { required: true, type: String },
    date: { required: true, type: Date, default: Date.now() },
    user: { required: true, type: Schema.Types.ObjectId, ref: 'User' },
    published: { required: true, type: Boolean, default: false }
})


// Exporting the schema as a model
module.exports = mongoose.model("Post", PostSchema);