var routersUsuario = require('express').Router();
Usuario = require('./usuario');

routersUsuario.get('/Usuario', function (req, res) {
    var busca = req.body._id;
    Usuario.find({ "_id": busca }).lean().exec(function (err, usuario) {
        res.json({ usuario });
    });
});

routersUsuario.get('/usuario/todos', function (req, res) {
    Usuario.find({}).exec(function (err, result) {
        if (err) throw err;
        res.json({ result });
    });
});

routersUsuario.route('/novoUsuario').post(function (req, res) {
    console.log(req)
    var user = new Usuario();
    user.nome = req.body.nome;
    user.username = req.body.username;
    user.email	= req.body.email;
    user.password = req.body.password;

    user.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: 'Usuario criado!'});
        }
    });

});

routersUsuario.route('/deletarusuario').delete(function (req, res) {
    var busca = req.body._id;

    Usuario.deleteOne({ "_id": busca }).exec(function (err, usuario) {
        var text
        
        if (err) {
            res.json({ err });
        } else {
            text = "Usuario  destruido";
            res.json({ text });
        }
    });
});
routersUsuario.route('/atualizarusuario').post(function (req, res) {
    var id = req.body._id;
    Usuario.findByIdAndUpdate(id, {
        $set: {
            nome: req.body.nome,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password


        }
    }, { new: true }, function (err, usuario) {
        if (err) return handleError(err);
        res.send(usuario);
    });

});

module.exports = routersUsuario;