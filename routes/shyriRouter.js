const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Shyris=require('../models/shyris');
const cors=require('./cors');
var authenticate = require('../authenticate');
const shyriRouter = express.Router();

shyriRouter.use(bodyParser.json());

shyriRouter.route('/')
.options(cors.corswithOptions,(req,res)=>{res.sendStatus(200);})
  .get(cors.cors,(req,res,next) => {
      Shyris.find(req.query)
      .then((shyris) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(shyris);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corswithOptions,authenticate.verifyUser,(req, res, next) => {
    Shyris.create(req.body)
    .then((shyri) => {
        console.log('Shyri Created ', shyri);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(shyri);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corswithOptions,authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /shyris');
})
.delete(cors.corswithOptions,authenticate.verifyUser,(req, res, next) => {
    Shyris.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

shyriRouter.route('/:shyriId')
.options(cors.corswithOptions,(req,res)=>{res.sendStatus(200);})
.get(cors.cors,(req,res,next) => {
    Shyris.findById(req.params.shyriId)
    .then((shyri) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(shyri);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corswithOptions,authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /shyris/'+ req.params.shyriId);
})
.put(cors.corswithOptions,authenticate.verifyUser,(req, res, next) => {
    Shyris.findByIdAndUpdate(req.params.shyriId, {
        $set: req.body
    }, { new: true })
    .then((shyri) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(shyri);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corswithOptions,authenticate.verifyUser,(req, res, next) => {
    Shyris.findByIdAndRemove(req.params.shyriId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = shyriRouter;
      
