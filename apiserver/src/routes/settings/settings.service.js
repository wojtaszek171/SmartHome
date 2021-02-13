const db = require('_helpers/db');

module.exports = {
    getAll,
    getByName,
    set,
    update
};

async function getAll() {
    return await db.Settings.findAll();
}

async function getByName(name) {
    const settings = await db.Settings.findOne({ where: { name } });
    if (!settings) throw 'Settings not found';
    return settings;
}

async function set(params) {
    if (await db.Settings.findOne({ where: { name: params.name } })) {
        update(params.name, params);
    } else {
        await db.Settings.create(params);
    }
}

async function update(name, params) {
    const settings = await getSetting(name);

    // copy params to settings and save
    Object.assign(settings, params);
    await settings.save();
}

// helper functions

async function getSetting(name) {
    const settings = await db.Settings.findByPk(name);
    if (!settings) throw 'Settings not found';
    return settings;
}