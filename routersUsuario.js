var routersUsuario = require('express').Router();
Usuario = require('./usuario');

var config = require('./config');
var jwt = require('jsonwebtoken');


routersUsuario.post('/authenticate', function (req, res) {

    // find the user
    Usuario.findOne({
        nome: req.body.nome
    }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {

                const payload = {
                    admin: user.admin
                };

                var token = jwt.sign(payload, config.secret, {
                    expiresIn: '1440' // expires in 24 hours
                });

                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }
        }
    });
});


/*

    Função de rota que faz validação de token.
    Todas as funções posteriores a essa função necessitarão de token


*/

routersUsuario.use(function (req, res, next) {

    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                req.decoded = decoded;
                next();
            }
        });

    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

routersUsuario.get('/usuario/todos', function (req, res) {
    Usuario.find({}).exec(function (err, result) {
        if (err) throw err;
        res.json({ result });
    });
});

routersUsuario.get('/Usuario', function (req, res) {
    var busca = req.body._id;
    Usuario.find({ "_id": busca }).lean().exec(function (err, usuario) {
        res.json({ usuario });
    });
});



routersUsuario.route('/novoUsuario').post(function (req, res) {
    console.log(req)
    var user = new Usuario();
    user.nome = req.body.nome;
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: 'Usuario criado!' });
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