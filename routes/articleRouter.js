const express = require('express');
const bodyParser = require('body-parser');

const articleRouter = express.Router();

articleRouter.use(bodyParser.json());

articleRouter.route('/')
.all( (req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
  })
  .get((req,res,next) => {
      res.end('Will send all the articles to you!');
  })
  .post( (req, res, next) => {
   res.end('Will add the article: ' + req.body.name + ' with details: ' + req.body.description);
  })
  .put( (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /articles');
  })
  .delete( (req, res, next) => {
      res.end('Deleting all articles');
  });
  

module.exports = articleRouter;