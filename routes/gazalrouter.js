const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const cors=require('./cors');
const Gazals=require('../models/gazals');

const gazalRouter = express.Router();

gazalRouter.use(bodyParser.json());

gazalRouter.route('/')
.options(cors.corswithOptions,(req,res)=>{res.sendStatus(200);})
  .get(cors.cors,(req,res,next) => {
      Gazals.find({})
      .then((gazals) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(gazals);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corswithOptions,authenticate.verifyUser,(req, res, next) => {
    Gazals.create(req.body)
    .then((gazal) => {
        console.log('Gazal Created ', gazal);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(gazal);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corswithOptions,authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /gazals');
})
.delete(cors.corswithOptions,authenticate.verifyUser,(req, res, next) => {
    Gazals.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

gazalRouter.route('/:gazalId')
.options(cors.corswithOptions,(req,res)=>{res.sendStatus(200);})
.get(cors.cors,(req,res,next) => {
    Gazals.findById(req.params.gazalId)
    .then((gazal) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(gazal);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corswithOptions,authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /gazals/'+ req.params.gazalId);
})
.put(cors.corswithOptions,authenticate.verifyUser,(req, res, next) => {
    Gazals.findByIdAndUpdate(req.params.gazalId, {
        $set: req.body
    }, { new: true })
    .then((gazal) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(gazal);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corswithOptions,authenticate.verifyUser,(req, res, next) => {
    Gazals.findByIdAndRemove(req.params.gazalId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = gazalRouter;
      
