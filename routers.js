var router = require('express').Router();
localizacao = require('./localizacao');

router.get('/', function (req, res) {
    var busca = req.body._id;
    localizacao.find({ "_id": busca }).lean().exec(function (err, local) {
        res.json({ local });
    });
});

router.get('/todos', function (req, res) {
    localizacao.find({}).exec(function (err, result) {
        if (err) throw err;
        res.json({ result });
    });
});

router.route('/novaLocalicade').post(function (req, res) {
    var local = new localizacao();
    local.titulo = req.body.titulo;
    local.descricao = req.body.descricao;
    local.latitude = req.body.latitude;
    local.longitude = req.body.longitude;

    local.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: 'localidade criada!' + local });
        }
    });

});

router.route('/deletarLocalidade').delete(function (req, res) {
    var busca = req.body._id;

    localizacao.deleteOne({ "_id": busca }).exec(function (err, local) {
        var text
        console.log(local);
        if (err) {
            res.json({ err });
        } else {
            text = "objeto :" + busca + " destruido";
            res.json({ text });
        }
    });
});
router.route('/atualizarLocalidade').post(function (req, res) {
    var id = req.body._id;
    localizacao.findByIdAndUpdate(id, {
        $set: {
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            latitude: req.body.latitude,
            longitude: req.body.longitude

        }
    }, { new: true }, function (err, local) {
        if (err) return handleError(err);
        res.send(local);
    });

});

module.exports = router;