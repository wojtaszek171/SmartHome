const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../../_middleware/validate-request');
const authorize = require('../../_middleware/authorize')
const sensorService = require('./sensor.service');

// routes
router.post('/set', authorize(), setSchema, set);
router.get('/', getAll);
router.get('/:name', getByName);
router.put('/:name', authorize(), updateSchema, update);
router.delete('/:name', authorize(), _delete);

module.exports = router;

function setSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        value: Joi.number().required(),
        dateUpdated: Joi.date()
    });
    validateRequest(req, next, schema);
}

function set(req, res, next) {
    sensorService.create(req.body)
        .then(() => res.json({ message: 'Successfully added sensor value' }))
        .catch(next);
}

function getAll(req, res, next) {
    sensorService.getAll()
        .then(sensors => res.json(sensors))
        .catch(next);
}

function getByName(req, res, next) {
    sensorService.getByName(req.params.name)
        .then(sensor => res.json(sensor))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().empty(''),
        value: Joi.number(),
        dateUpdated: Joi.date()
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    sensorService.update(req.params.name, req.body)
        .then(sensor => res.json(sensor))
        .catch(next);
}

function _delete(req, res, next) {
    sensorService.delete(req.params.name)
        .then(() => res.json({ message: 'Sensor deleted successfully' }))
        .catch(next);
}