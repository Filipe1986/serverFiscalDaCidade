const mongoose = require('mongoose');

var LocalizacaoSchema = new mongoose.Schema(
    {
        titulo :{ type: String, required: true },
        descricao :{type: String, required: true},
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        pathImages: [{type: String , required :false}]
        
        //data : { type : Date, default: Date.now },
        //likes : [{ type: Schema.ObjectId, ref: 'User'}]

    }
);
module.exports = mongoose.model('Localizacao', LocalizacaoSchema);
