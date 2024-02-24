var multer = require("multer");
function subirArchivosProd(){
    var storage=multer.diskStorage({
        destination: './web/imagesProd',
        filename: function (req, file, cb){
            var archivo=file.originalname;
            cb(null, archivo);
        }
    });
    var upload=multer({storage}).single('fotoProd');
    return upload;
}

module.exports=subirArchivosProd;