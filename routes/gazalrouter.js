const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Gazals=require('../models/gazals');
const gazalRouter = express.Router();

gazalRouter.use(bodyParser.json());

gazalRouter.route('/')
  .get((req,res,next) => {
      Gazals.find({})
      .then((gazals) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(gazals);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Gazals.create(req.body)
    .then((gazal) => {
        console.log('Gazal Created ', gazal);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(gazal);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /gazals');
})
.delete((req, res, next) => {
    Gazals.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

gazalRouter.route('/:gazalId')
.get((req,res,next) => {
    Gazals.findById(req.params.gazalId)
    .then((gazal) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(gazal);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /gazals/'+ req.params.gazalId);
})
.put((req, res, next) => {
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
.delete((req, res, next) => {
    Gazals.findByIdAndRemove(req.params.gazalId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = gazalRouter;
      
