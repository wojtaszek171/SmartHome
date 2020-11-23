const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const socketService = require('./socket.service');

// routes
router.post('/set', authorize(), setSchema, set);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function setSchema(req, res, next) {
    const schema = Joi.object({
        id: Joi.number().required(),
        device: Joi.string(),
        enabled: Joi.bool(),
        dateUpdated: Joi.date()
    });
    validateRequest(req, next, schema);
}

function set(req, res, next) {
    socketService.create(req.body)
        .then(() => res.json({ message: 'Successfully added socket value' }))
        .catch(next);
}

function getAll(req, res, next) {
    socketService.getAll()
        .then(sockets => res.json(sockets))
        .catch(next);
}

function getById(req, res, next) {
    socketService.getSocket(req.params.id)
        .then(socket => res.json(socket))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        id: Joi.number(),
        device: Joi.string(),
        enabled: Joi.bool(),
        dateUpdated: Joi.date()
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    socketService.update(req.params.name, req.body)
        .then(socket => res.json(socket))
        .catch(next);
}

function _delete(req, res, next) {
    socketService.delete(req.params.name)
        .then(() => res.json({ message: 'Sensor deleted successfully' }))
        .catch(next);
}