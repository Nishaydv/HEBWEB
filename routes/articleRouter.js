const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const cors=require('./cors');
const Articles=require('../models/articles');
const articleRouter = express.Router();

articleRouter.use(bodyParser.json());

articleRouter.route('/')
.options(cors.corswithOptions,(req,res)=>{res.sendStatus(200);})
  .get(cors.cors,(req,res,next) => {
      Articles.find({})
      .then((articles) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(articles);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corswithOptions,authenticate.verifyUser,(req, res, next) => {
    Articles.create(req.body)
    .then((article) => {
        console.log('Article Created ', article);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(article);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corswithOptions,authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /articles');
})
.delete(cors.corswithOptions,authenticate.verifyUser,(req, res, next) => {
    Articles.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

articleRouter.route('/:articleId')
.options(cors.corswithOptions,(req,res)=>{res.sendStatus(200);})
.get(cors.cors,(req,res,next) => {
    Articles.findById(req.params.articleId)
    .then((article) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(article);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corswithOptions,authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /articles/'+ req.params.articleId);
})
.put(cors.corswithOptions,authenticate.verifyUser,(req, res, next) => {
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
.delete(cors.corswithOptions,authenticate.verifyUser,(req, res, next) => {
    Articles.findByIdAndRemove(req.params.articleId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = articleRouter;
      
