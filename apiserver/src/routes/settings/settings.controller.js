const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const settingsService = require('./settings.service');

// routes
router.post('/set', authorize(), setSchema, set);
router.get('/', getAll);
router.get('/:name', getByName);
router.put('/:id', authorize(), updateSchema, update);

module.exports = router;

function setSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        value: Joi.string().required(),
        dateUpdated: Joi.date()
    });
    validateRequest(req, next, schema);
}

function set(req, res, next) {
    settingsService.set(req.body)
        .then(() => res.json({ message: 'Successfully added settings value' }))
        .catch(next);
}

function getAll(req, res, next) {
    settingsService.getAll()
        .then(settings => res.json(settings))
        .catch(next);
}

function getByName(req, res, next) {
    settingsService.getByName(req.params.name)
        .then(settings => res.json(settings))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().empty(''),
        value: Joi.string(),
        dateUpdated: Joi.date()
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    settingsService.update(req.params.name, req.body)
        .then(settings => res.json(settings))
        .catch(next);
}
