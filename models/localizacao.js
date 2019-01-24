const mongoose = require('mongoose');
var Schema = mongoose.Schema;
//const votos = require("mongoose-voting"); 

var LocalizacaoSchema = new mongoose.Schema(
    {
        titulo :{ type: String, required: true },
        descricao :{type: String, required: true},
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        idUsuario: {type: Schema.Types.ObjectId, require: true, ref: "Usuario"  },
        //votos : votos
    }, {timestamps: true}
);


module.exports = mongoose.model('Localizacao', LocalizacaoSchema);
