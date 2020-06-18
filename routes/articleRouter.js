const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Articles=require('../models/articles');
const articleRouter = express.Router();

articleRouter.use(bodyParser.json());

articleRouter.route('/')
  .get((req,res,next) => {
      Articles.find({})
      .then((articles) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(articles);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Articles.create(req.body)
    .then((article) => {
        console.log('Article Created ', article);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(article);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /articles');
})
.delete((req, res, next) => {
    Articles.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

articleRouter.route('/:articleId')
.get((req,res,next) => {
    Articles.findById(req.params.articleId)
    .then((article) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(article);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /articles/'+ req.params.articleId);
})
.put((req, res, next) => {
    Articles.findByIdAndUpdate(req.params.articleId, {
        $set: req.body
    }, { new: true })
    .then((article) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(article);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Articles.findByIdAndRemove(req.params.articleId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = articleRouter;
      
