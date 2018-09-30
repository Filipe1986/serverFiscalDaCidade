var router = require('express').Router();
localizacao = require('./localizacao');

router.get('/', function (req, res) {
    localizacao.find().lean().exec(function (err, local) {
        console.log(local);
        res.json({ local });
    });

});

router.route('/novaLocalicade').post(function (req, res) {

    var local = new localizacao();
    local.titulo  = req.body.titulo;
    local.descricao  = req.body.descricao;
    local.latitude = req.body.latitude;
    local.longitude = req.body.longitude;

    // save the bear and check for errors
    local.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: 'localidade criada!' + local });
        }
    });
    
});


module.exports = router;