const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var voto = new Schema({
    usuario:{type: Schema.Types.ObjectId, require: true},
    voting:{ type: Boolean, required: true}
});

var LocalizacaoSchema = new mongoose.Schema(
    {
        titulo :{ type: String, required: true },
        descricao :{type: String, required: true},
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        pathImages: [{type: String , required :false}],
        idUsuario: {type: Schema.Types.ObjectId, require: true, ref: "Usuario"  },
        votos : [voto]
    }, {timestamps: true}
);
module.exports = mongoose.model('Localizacao', LocalizacaoSchema);
