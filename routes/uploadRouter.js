const express = require('express');
const bodyParser = require('body-parser');

var authenticate = require('../authenticate');
const cors=require('./cors');
const multer=require('multer');

var storage=multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,'public/images');
    },


    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
});

const imageFileFilter=(req,file,cb)=>{
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        return cb(new Error('you can upload only image files!'),false);
    }
    cb(null,true);
};
const upload=multer({ storage:storage,fileFilter:imageFileFilter});
const uploadRouter = express.Router();

uploadRouter.use(bodyParser.json());

uploadRouter.route('/')
.options(cors.corswithOptions,(req,res)=>{res.sendStatus(200);})
.get(cors.cors,authenticate.verifyUser,
    (req, res, next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /imageUpload');
})
.post(cors.corswithOptions,authenticate.verifyUser,
upload.single('pic'),(req, res) => {
 res.statusCode=200;
 res.setHeader('Content-Type','application/json');
 res.json(req.file);
})
.put(cors.corswithOptions,authenticate.verifyUser,
    (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /imageUpload');
})
.delete(cors.corswithOptions,authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /imageUpload');
});

uploadRouter.route('/posts')
.options(cors.corswithOptions,(req,res)=>{res.sendStatus(200);})
.get(cors.cors,authenticate.verifyUser,
    (req, res, next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /imageUpload');
})
.post(cors.corswithOptions,authenticate.verifyUser,
upload.array('pics'),(req, res) => {
 res.statusCode=200;
 res.setHeader('Content-Type','application/json');
 res.json(req.files);
})
.put(cors.corswithOptions,authenticate.verifyUser,
    (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /imageUpload');
})
.delete(cors.corswithOptions,authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /imageUpload');
});
 

module.exports=uploadRouter;