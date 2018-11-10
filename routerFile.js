const routerFile = require('express').Router();
const Busboy = require('busboy');
const fs = require('fs');
var multer = require('multer'); 


var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './uploads');
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now());
    }
  });

  var upload = multer({ storage: storage });

  routerFile.route('/upload1').post( upload.single('photos'), function (req, res, next) {
    console.log(req.files)

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
  

routerFile.route('/upload').post(function (req, res, next) {

    const element1 = req.body.element1;

    console.log(element1);
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('finish', function () {
        console.log('Upload finished');
        // Your files are stored in req.files. In this case,
        // you only have one and it's req.files.element2:
        // This returns:
        // {
        //    element2: {
        //      data: ...contents of the file...,
        //      name: 'Example.jpg',
        //      encoding: '7bit',
        //      mimetype: 'image/png',
        //      truncated: false,
        //      size: 959480
        //    }
        // }
        // Grabs your file object from the request.
        const file = req.files.element2;
        
        fs.writeFile('outputImage.png', file, 'binary', function (err) {
        
            if (err) {throw err}
            else {
                console.log('The file has been saved!');
                text = "The file has been saved!";
                res.json({ text });
            }
          });


    });
    req.pipe(busboy);


});


module.exports = routerFile;