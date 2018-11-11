const mongoose = require('mongoose');
var JSON = require('json');

var LocalizacaoSchema = new mongoose.Schema(
    {
        titulo :{ type: String, required: true },
        descricao :{type: String, required: true},
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        
        data : { type : Date, default: Date.now },
        //likes : [{ type: Schema.ObjectId, ref: 'User'}]
        

        //avaliação
    }
);
module.exports = mongoose.model('Localizacao', LocalizacaoSchema);
