const express = require('express');
const bodyParser = require('body-parser');

const shyriRouter = express.Router();

shyriRouter.use(bodyParser.json());

shyriRouter.route('/')
.all( (req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
  })
  .get((req,res,next) => {
      res.end('Will send all the shyris to you!');
  })
  .post( (req, res, next) => {
   res.end('Will add the shyri: ' + req.body.name + ' with details: ' + req.body.description);
  })
  .put( (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /shyris');
  })
  .delete( (req, res, next) => {
      res.end('Deleting all shyris');
  });
  

module.exports = shyriRouter;