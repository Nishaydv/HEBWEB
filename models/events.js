const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventsSchema = new Schema({
    event_name: {
        type: String,
        required: true
    },
    event_date:{
        type:String,
        required:true
    },
    event_time: {
        type:String,
        required: true
    },
    event_img:{
      data:Buffer,
      contentType:String,
    },
    event_organiser:{
        type:String,
        required:true
    },
    event_desc:{
        type:String,
        required:true
    },
},{
    timestamps: true
});
var Events = mongoose.model('events', eventsSchema);
module.exports = Events;
