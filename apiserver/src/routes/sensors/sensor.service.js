const db = require('../../_helpers/db');

module.exports = {
    getAll,
    getByName,
    set,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Sensor.findAll();
}


async function getByName(name) {
    const sensor = await db.Sensor.findOne({ where: { name } });
    if (!sensor) throw 'Sensor not found';
    return sensor;
}

async function set(params) {
    if (await db.Sensor.findOne({ where: { name: params.name } })) {
        update(params.name, params);
    } else {
        await db.Sensor.create(params);
    }
}

async function update(name, params) {
    const sensor = await getSensor(name);

    // copy params to sensor and save
    Object.assign(sensor, params);
    await sensor.save();
}

async function _delete(name) {
    const sensor = await getSensor(name);
    await sensor.destroy();
}

// helper functions

async function getSensor(name) {
    const sensor = await db.Sensor.findByPk(name);
    if (!sensor) throw 'Sensor not found';
    return sensor;
}
