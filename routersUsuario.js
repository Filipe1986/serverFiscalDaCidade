var routersUsuario = require('express').Router();
Usuario = require('./Usuario');

routersUsuario.get('/Usuario', function (req, res) {
    var busca = req.body._id;
    Usuario.find({ "_id": busca }).lean().exec(function (err, usuario) {
        res.json({ usuario });
    });
});

routersUsuario.get('/Usuario/todos', function (req, res) {
    Usuario.find({}).exec(function (err, result) {
        if (err) throw err;
        res.json({ result });
    });
});

routersUsuario.route('/Usuario/novoUsuario').post(function (req, res) {
    console.log(req)
    var Usuario = new localizacao();
    Usuario.nome = req.body.nome;
    Usuario.username = req.body.username;
    Usuario.email	= req.body.email;
    Usuario.password = req.body.password;

    Usuario.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: 'Usuario criado!' + Usuario });
        }
    });

});

routersUsuario.route('/deletarUsuario').delete(function (req, res) {
    var busca = req.body._id;

    Usuario.deleteOne({ "_id": busca }).exec(function (err, usuario) {
        var text
        console.log(usuario);
        if (err) {
            res.json({ err });
        } else {
            text = "Usuario :" + busca + " destruido";
            res.json({ text });
        }
    });
});
routersUsuario.route('/atualizarUsuario').post(function (req, res) {
    var id = req.body._id;
    Usuario.findByIdAndUpdate(id, {
        $set: {
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            latitude: req.body.latitude,
            longitude: req.body.longitude

        }
    }, { new: true }, function (err, usuario) {
        if (err) return handleError(err);
        res.send(usuario);
    });

});

module.exports = routersUsuario;