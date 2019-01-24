const mongoose = require('mongoose');
var Schema = mongoose.Schema;
//const votos = require("mongoose-voting"); 

var eventSchema = new mongoose.Schema(
    {
        
        project :{type: String, required: true},
        title:{type: String, required: true},
        Assign :{type: String, required: true},
        pipeline :{ type: String, required: true },
        comment :{ type: String, required: true },
        milestone:{ type: String, required: true },
        labels: { type: String, required: true },
        created_at: {type: timestamps, required: true},
        updated_at: {type: timestamps, required: true}

    }, {timestamps: true}
);


module.exports = mongoose.model('event', eventSchema);
