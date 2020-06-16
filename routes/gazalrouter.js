const express = require('express');
const bodyParser = require('body-parser');

const gazalRouter = express.Router();

gazalRouter.use(bodyParser.json());

gazalRouter.route('/')
.all( (req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
  })
  .get((req,res,next) => {
      res.end('Will send all the gazals to you!');
  })
  .post( (req, res, next) => {
   res.end('Will add the gazal: ' + req.body.name + ' with details: ' + req.body.description);
  })
  .put( (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /gazals');
  })
  .delete( (req, res, next) => {
      res.end('Deleting all gazals');
  });
  

module.exports = gazalRouter;