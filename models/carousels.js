const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carouselSchema = new Schema({
    maxcapacity:{
       type:Number,
       required:true,
       max:5    
    },
    images:{
        data:Buffer,
        contentType:String
    }
},{
    timestamps: true
});
var Carousel = mongoose.model('carousel', carouselSchema);
module.exports = Carousel;