const routerFile = require('express').Router();
//const Busboy = require('busboy');
//const fs = require('fs');
var multer = require('multer'); 


var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, 'uploads');
    },
    filename: function (req, file, callback) {
        callback(null, `${file.fieldname}-${Date.now()}.${file.originalname}`);
    }
  });

  var upload = multer({ storage: storage });

  routerFile.post('/upload1', upload.single('photos'), function (req, res, next) {
    console.log('file');
    console.log(req.file);
    console.log('files');
    console.log(req.files);

    return res.end("File is uploaded");
    if(err) {
        return res.end("Error uploading file.");
    }
    

    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any

  });


  routerFile.route('/uploads').post( upload.array('photos', 12), function (req, res, next) {
    console.log(req.files)
    req.files.forEach(element => {
        console.log(element);
        //console.log(req.body);
    });
    return res.end("File is uploaded");
    if(err) {
        return res.end("Error uploading file.");
    }
    

    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any

  });
  


module.exports = routerFile;