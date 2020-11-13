const db = require('_helpers/db');

module.exports = {
    getAll,
    getByName,
    set,
    update
};

async function getAll() {
    return await db.Weather.findAll();
}

async function getByName(name) {
    const weather = await db.Weather.findOne({ where: { name } });
    if (!weather) throw 'Weather not found';
    return weather;
}

async function set(params) {
    if (await db.Weather.findOne({ where: { name: params.name } })) {
        update(params.name, params);
    } else {
        await db.Weather.create(params);
    }
}

async function update(name, params) {
    const weather = await getWeather(name);

    // copy params to weather and save
    Object.assign(weather, params);
    await weather.save();
}

// helper functions

async function getWeather(name) {
    const weather = await db.Weather.findByPk(name);
    if (!weather) throw 'Weather not found';
    return weather;
}