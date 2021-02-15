const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const socketService = require('./socket.service');

// routes
router.post('/set', authorize(), setSchema, set);
router.get('/', getAll);
router.get('/:name', getByKey);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function setSchema(req, res, next) {
    const schema = Joi.object({
        key: Joi.string(),
        enabled: Joi.bool(),
        start: Joi.string().allow(''),
        stop: Joi.string().allow(''),
        dateUpdated: Joi.date()
    });
    validateRequest(req, next, schema);
}

function set(req, res, next) {
    socketService.set(req.body)
        .then(() => res.json({ message: 'Successfully added socket value' }))
        .catch(next);
}

function getAll(req, res, next) {
    socketService.getAll()
        .then(sockets => res.json(sockets))
        .catch(next);
}

function getByKey(req, res, next) {
    socketService.getByKey(req.params.key)
        .then(socket => res.json(socket))
        .catch(next);
}

function _delete(req, res, next) {
    socketService.delete(req.params.name)
        .then(() => res.json({ message: 'Sensor deleted successfully' }))
        .catch(next);
}