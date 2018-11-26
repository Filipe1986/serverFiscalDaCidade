var router = require('express').Router();
localizacao = require('../models/localizacao');

var multer = require('multer');


var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads');
    },
    filename: function (req, file, callback) {
        callback(null, `${file.fieldname}-${Date.now()}.${file.originalname}`);
    }
});

var upload = multer({ storage: storage });

router.get('/', function (req, res) {
    var busca = req.body._id;
    localizacao.find({ "_id": busca }).lean().exec(function (err, local) {
        res.json({ local });
    });
});

router.get('/todos', function (req, res) {
    localizacao.find({}).exec(function (err, result) {
        if (err) throw err;
        res.json({ localizacoes: result });
    });
});

router.post('/novalocalidade', upload.array('photos', 12), function (req, res, next) {

    console.log(req.body);
    var local = new localizacao();

    local.titulo = req.body.titulo;
    local.descricao = req.body.descricao;
    local.latitude = req.body.latitude;
    local.longitude = req.body.longitude;
    console.log(req.files.length);
    for (var i = 0; i < req.files.length; i++) {
        local.pathImages[i] = req.files[i].path;
    }
    local.idUsuario = req.body.idUsuario;
    local.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            console.log('test' + JSON.stringify(local));
            var dateobj = local.createdAt;
            function pad(n) { return n < 10 ? "0" + n : n; }
            var dataC = pad(dateobj.getDate()) + "/" + pad(dateobj.getMonth() + 1) + "/" + dateobj.getFullYear();

            var dateobj = local.updatedAt;
            function pad(n) { return n < 10 ? "0" + n : n; }
            var dataA = pad(dateobj.getDate()) + "/" + pad(dateobj.getMonth() + 1) + "/" + dateobj.getFullYear();

            res.json({
                message: 'localidade criada!',


                dataCriacao: dataC,
                dataAtualizacao: dataA,
            });
        }
    });

});

router.route('/deletarlocalidade').delete(function (req, res) {
    var busca = req.body._id;

    localizacao.deleteOne({ "_id": busca }).exec(function (err, local) {
        //Adicionar remoção de imagens na pasta
        console.log(local);
        if (err) {
            res.json({ err });
        } else {
            text = "Localidade  Deletada";
            res.json({ text });
        }
    });
});
router.route('/atualizarlocalidade').post(function (req, res) {
    var id = req.body._id;
    console.log(JSON.stringify(req.body))
    localizacao.findOneAndUpdate(id, {
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