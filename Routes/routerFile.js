const routerFile = require('express').Router();
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


  });


  routerFile.route('/uploads').post( upload.array('photos', 12), function (req, res, next) {
    console.log(req.files)
    req.files.forEach(element => {
        console.log(element);
        //console.log(req.body);
    });
    return res.end("File is uploaded");
  });
  


module.exports = routerFile;