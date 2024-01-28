const mongoose = require('mongoose');
const {model, Schema} = mongoose;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    domain: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const blogs = model('blogs', blogSchema);
module.exports = blogs;