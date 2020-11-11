const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    getByName,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Sensor.findAll();
}

async function getById(id) {
    return await getSensor(id);
}

async function getByName(name) {
    const sensor = await db.Sensor.findOne({ where: { name } });
    if (!sensor) throw 'Sensor not found';
    return sensor;
}

async function create(params) {
    // validate
    if (await db.Sensor.findOne({ where: { id: params.id } })) {
        throw 'Sensor "' + params.id + '" already exists';
    }

    // save sensor
    await db.Sensor.create(params);
}

async function update(id, params) {
    const sensor = await getSensor(id);

    // copy params to sensor and save
    Object.assign(sensor, params);
    await sensor.save();
}

async function _delete(id) {
    const sensor = await getSensor(id);
    await sensor.destroy();
}

// helper functions

async function getSensor(id) {
    const sensor = await db.Sensor.findByPk(id);
    if (!sensor) throw 'Sensor not found';
    return sensor;
}
