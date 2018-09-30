const mongoose = require('mongoose');
var JSON = require('json');

var LocalizacaoSchema = new mongoose.Schema(
    {
        titulo :{ type: String, required: true },
        descricao :{type: String, required: true},
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },

        //avaliação
    }
);
module.exports = mongoose.model('Localizacao', LocalizacaoSchema);
