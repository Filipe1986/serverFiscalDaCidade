const routersUsuario = require('express').Router();
const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const config = require('../config');
const jwt  = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');

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
    Usuario.find({ "email": req.body.email }).lean().exec(function (err, usuario) {
        if (usuario.length > 0) {
            res.status(409).json("Usuario já existente");
        } else {
            bcryptjs.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    res.status(500).json({ erro: err })
                } else {
                    var user = new Usuario();
                    user.nome = req.body.nome;
                    user.username = req.body.username;
                    user.email = req.body.email;
                    user.password = hash;

                    user.save(function (err) {
                        if (err) {
                            res.send(err);
                        } else {
                            res.json({ message: 'Usuario criado!' });
                        }
                    });
                }
            });
        }
    });

});

routersUsuario.route('/login').post(function (req, res) {
    Usuario.find({ "email": req.body.email }).lean().exec(function (err, usuario) {
        if (usuario.length < 1) {
            return res.status(401).json("Falha na autenticação!");
        }
        bcryptjs.compare(req.body.password, usuario[0].password, (err, result) => {
            if(err){
                return res.status(401).json("Falha na autenticação!");
            }
            if(result){
               const token = jwt.sign({
                    email: usuario[0].email,
                    userId: usuario[0]._id                    
                }, config.jwtSecret, { expiresIn : "1h"});
                return res.status(200).json(
                    {message: "Usário logado",
                    token : token
                });

            }
            return res.status(401).json("Falha na autenticação!");
        });
    });
});



//routersUsuario.route('/deletarusuario', checkAuth).delete(function (req, res) {
routersUsuario.delete('/deletarusuario', checkAuth,function (req, res) {
    var busca = req.body._id;

    Usuario.deleteOne({ "_id": busca }).exec(function (err, usuario) {
        if (err) {
            res.status(500).json({ err });
        } else {
            if(usuario.length > 0 ){
                res.json( "Usuario  deletado" );
            }else {
                res.json( "Usuario  Inexistente" );
            }        
        }
    });
});
//routersUsuario.route('/atualizarusuario').post(function (req, res) {
routersUsuario.post('/atualizarusuario', checkAuth, function (req, res) {
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