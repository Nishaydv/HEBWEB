const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Nazms=require('../models/nazms');
const nazmRouter = express.Router();

nazmRouter.use(bodyParser.json());

nazmRouter.route('/')
  .get((req,res,next) => {
      Nazms.find({})
      .then((nazms) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(nazms);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Nazms.create(req.body)
    .then((nazm) => {
        console.log('Nazm Created ', nazm);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(nazm);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /nazms');
})
.delete((req, res, next) => {
    Nazms.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

nazmRouter.route('/:nazmId')
.get((req,res,next) => {
    Nazms.findById(req.params.nazmId)
    .then((nazm) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(nazm);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /nazms/'+ req.params.nazmId);
})
.put((req, res, next) => {
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
.delete((req, res, next) => {
    Nazms.findByIdAndRemove(req.params.nazmId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = nazmRouter;
      
