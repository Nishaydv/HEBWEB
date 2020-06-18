const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Carousels=require('../models/carousels');
const carouselRouter = express.Router();

carouselRouter.use(bodyParser.json());

carouselRouter.route('/')
  .get((req,res,next) => {
      Carousels.find({})
      .then((carousels) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(carousels);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Carousels.create(req.body)
    .then((carousel) => {
        console.log('Carousel Created ', carousel);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(carousel);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /carousels');
})
.delete((req, res, next) => {
    Carousels.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

carouselRouter.route('/:carouselId')
.get((req,res,next) => {
    Carousels.findById(req.params.carouselId)
    .then((gazal) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(gazal);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /carousels/'+ req.params.carouselId);
})
.put((req, res, next) => {
    Carousels.findByIdAndUpdate(req.params.carouselId, {
        $set: req.body
    }, { new: true })
    .then((carousel) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(carousel);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Carousels.findByIdAndRemove(req.params.carouselId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = carouselRouter;
      