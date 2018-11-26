const mongoose = require('mongoose');

var UsuarioSchema = new mongoose.Schema(
    {
        //login
        
        nome :{ type: String, required: true },
        username: { type: String, required: false},
        email: {type: String, required: true , index: { unique: true }, match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/},
        password :{type: String, required :true},
        admin: {type: Boolean, default: true }
        //trocar password depois por hash and salt
        //dataNascimento
        //
   
    }, {timestamps: true}
);
module.exports = mongoose.model('Usuario', UsuarioSchema);
