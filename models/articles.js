const mongoose = require('mongoose');
const Schema = mongoose.Schema;

 
const articleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image:{
        type:String,
        required:true,
        unique:true
    },
    title:{
        type:String,
        default:''
    },
    description:{
        type:String,
        required:true
    },
    like:{
        type:Number,
        default:0,
        required:true
    },
    featured:{
        type:Boolean,
        default:false
    },
},{
    timestamps: true
});
module.exports = mongoose.model('Article', articleSchema);
