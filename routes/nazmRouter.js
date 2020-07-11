const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Nazms=require('../models/nazms');
const cors=require('./cors');
var authenticate = require('../authenticate');
const nazmRouter = express.Router();

nazmRouter.use(bodyParser.json());

nazmRouter.route('/')
.options(cors.corswithOptions,(req,res)=>{res.sendStatus(200);})
  .get(cors.cors,(req,res,next) => {
      Nazms.find(req.query)
      .then((nazms) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(nazms);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corswithOptions,authenticate.verifyUser,(req, res, next) => {
    Nazms.create(req.body)
    .then((nazm) => {
        console.log('Nazm Created ', nazm);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(nazm);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corswithOptions,authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /nazms');
})
.delete(cors.corswithOptions,authenticate.verifyUser,(req, res, next) => {
    Nazms.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

nazmRouter.route('/:nazmId')
.options(cors.corswithOptions,(req,res)=>{res.sendStatus(200);})
.get(cors.cors,(req,res,next) => {
    Nazms.findById(req.params.nazmId)
    .then((nazm) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(nazm);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /nazms/'+ req.params.nazmId);
})
.put(cors.corswithOptions,authenticate.verifyUser,(req, res, next) => {
    Nazms.findByIdAndUpdate(req.params.nazmId, {
        $set: req.body
    }, { new: true })
    .then((nazm) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(nazm);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corswithOptions,authenticate.verifyUser,(req, res, next) => {
    Nazms.findByIdAndRemove(req.params.nazmId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = nazmRouter;
      
