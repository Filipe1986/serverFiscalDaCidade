const mongoose = require('mongoose');
var JSON = require('json');

var UsuarioSchema = new mongoose.Schema(
    {
        //login
        
        nome :{ type: String, required: true },
        username: { type: String, required: true, index: { unique: true } },
        email: {type: String, required: true},
        password :{type: String, required :true},
        //trocar password depois por hash and salt
        //dataNascimento
        //
        

        //avaliação
    }, {timestamps: true}
);
module.exports = mongoose.model('Usuario', UsuarioSchema);
