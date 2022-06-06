const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    name: { String },
    message: { required: true, String },
    date: { default: Date.now(), required, Date}
})

module.exports = mongoose.model("Comment", CommentSchema);