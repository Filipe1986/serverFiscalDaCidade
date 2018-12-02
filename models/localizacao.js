const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const votos = require("mongoose-voting"); 
/*
var votoSchema = new Schema({
    usuario:{type: Schema.Types.ObjectId, require: true, unique: true },
    posicionamento:{ type: Boolean, required: true}
});
*/
var LocalizacaoSchema = new mongoose.Schema(
    {
        titulo :{ type: String, required: true },
        descricao :{type: String, required: true},
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        pathImages: [{type: String , required :false}],
        idUsuario: {type: Schema.Types.ObjectId, require: true, ref: "Usuario"  },
        //votos : votos
    }, {timestamps: true}
);

LocalizacaoSchema.plugin(votos, { ref: 'Usuario' });

module.exports = mongoose.model('Localizacao', LocalizacaoSchema);
