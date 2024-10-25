import multer from "multer";
import path from "path"


//configure multer storage
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

//set the file filter for images only

const fileFilter = (req,file,cb)=>{
    const alloweTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if(alloweTypes.includes(file.mimetype)){
        cb(null,true)
    }else{
        cb(new Error('only images are allowed'),false);
    }
};

//initialise multer with storage and file filter 
const upload = multer({
    storage,
    fileFilter,
    limits:{
        fileSize:1024 * 1024 * 5, //limit file size to 5 mb
    }
});

//export the upload middleware

export default upload;