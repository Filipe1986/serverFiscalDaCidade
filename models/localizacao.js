const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocalizacaoSchema = new mongoose.Schema(
    {
        titulo :{ type: String, required: true },
        descricao :{type: String, required: true},
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        pathImages: [{type: String , required :false}],
        //idUsuario: {type: Schema.Types.ObjectId,  ref: 'Usuario'}
        idUsuario: {type: Schema.Types.ObjectId, require: true, ref: "Usuario"  }
        
        //data : { type : Date, default: Date.now },
        //likes : [{ type: Schema.ObjectId, ref: 'User'}]

    }, {timestamps: true}
);
module.exports = mongoose.model('Localizacao', LocalizacaoSchema);
