var router = require('express').Router();
localizacao = require('./localizacao');
var ObjectId = require('mongodb').ObjectId; 
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

router.route('/um').delete(function (req, res) {
    var busca = req.body._id;
    console.log(busca);

    localizacao.deleteOne({"_id" : busca}).exec(function (err, local) {
        var text
        console.log(local);
        if(!err){
            text = "objeto :" + busca + " destruido";
        }else{
            res.json({ err });
        }
        res.json({ text });
    });
    
});

module.exports = router;