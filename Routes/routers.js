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

router.post('/', function (req, res) {
    console.log(req.body._id)
    var busca = req.body._id;
    localizacao.findOne({ "_id": busca }).lean().exec(function (err, local) {
        var voted;
        console.log(local.vote.positive.length)
        local.vote.positive.forEach(element =>{
            if(element.idUsuario == req.body._id){
                 voted = "upvoted";

            }
        })
        local.vote.negative.forEach(element =>{
            if(element.idUsuario == req.body._id){
                 voted = "downvoted";
            }
        })

        res.json({local,        
                  upvote : local.vote.positive.length,
                  downvote: local.vote.negative.length,  
                  voted : voted
                })
    });
});

router.get('/todos', function (req, res) {
    localizacao.find({}).exec(function (err, result) {
        if (err) throw err;
        result.forEach(element => {
            element.upvote = element.upvotes(),
            element.downvote = element.downvotes()
            element.save()
        });
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

            res.json({
                message: 'localidade criada!',
                createdAt: local.createdAt,
                updatedAt: local.updatedAt,
                _id: local._id,
            });
        }
    });

});

router.route('/deletarlocalidade').delete(function (req, res) {
    var busca = req.body._id;

    localizacao.deleteOne({ "_id": busca }).exec(function (err, local) {
        //Fazer remoção de imagens na pasta
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

router.route('/votar').post(function (req, res) {

    var busca = req.body._id;
    //var count = 0;

    localizacao.findOne({ "_id": busca } ).exec(function (err, local) {
        var votante = req.body.votante;
        var posicionamento = req.body.posicionamento;
        console.log("p " + posicionamento);
        console.log("votante "+votante);
        var notvalida = (posicionamento == undefined && votante  == undefined && posicionamento);
        console.log("not valida "+notvalida);
        if (err || !local || notvalida) {
            res.json({ message: "Erro, voto não computado" })
        }
        else if(posicionamento ){
            console.log("upvote");
            console.log(local);
            if(votante){

                local.upvote(votante);
                local.save();
            }
            console.log(local);
            

            res.json({
                local,
                upvote : local.upvotes(),
                downvote: local.downvotes(),
                voted : "upvoted"

            })
        }else if( !posicionamento) {
            console.log("downvoted")
            local.downvote(votante);
            local.save();

            res.json({
                local,
                upvote : local.upvotes(),
                downvote: local.downvotes(),
                voted : "downvoted"

            })

        }
    });
});

module.exports = router;