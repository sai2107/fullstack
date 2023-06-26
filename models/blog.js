const mongoose = require('mongoose');
const Schema = mongoose.Schema;

blogSchema = new Schema({
    title: {
    type: String,
    required:true
    },
    snippet:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    }
},{ timestamps:true });

const Blog = mongoose.model('BLog',blogSchema);
module.exports = Blog;
