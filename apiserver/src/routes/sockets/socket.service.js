const db = require('_helpers/db');

module.exports = {
    getAll,
    getSocket,
    set,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Socket.findAll();
}


async function getByDevice(device) {
    const socket = await db.Socket.findOne({ where: { device } });
    if (!socket) throw 'Socket not found';
    return socket;
}

async function set(params) {
    if (await db.Socket.findByPk(params.id)) {
        update(params.id, params);
    } else {
        await db.Socket.create(params);
    }
}

async function update(id, params) {
    const socket = await getSocket(id);

    // copy params to socket and save
    Object.assign(socket, params);
    await socket.save();
}

async function _delete(id) {
    const socket = await getSocket(id);
    await socket.destroy();
}

// helper functions

async function getSocket(id) {
    const socket = await db.Socket.findByPk(id);
    if (!socket) throw 'Socket not found';
    return socket;
}
