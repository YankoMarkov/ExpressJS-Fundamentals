const fs = require('fs');
let storage = {};

let put = (key, value) => {
    if (typeof (key) !== 'string') {
        throw new Error('key must be string');
    }
    if (storage.hasOwnProperty(key)) {
        throw new Error('key alredy exist');
    }
    storage[key] = value;
};

let get = (key) => {
    if (typeof (key) !== 'string') {
        throw new Error('key must be string');
    }
    if (!storage.hasOwnProperty(key)) {
        throw new Error('key do not exist');
    }
    return storage[key];
};

let getAll = () => {
    if (Object.keys(storage).length === 0) {
        throw new Error('storage is empty');
    }
    return storage;
};

let update = (key, newValue) => {
    if (typeof (key) !== 'string') {
        throw new Error('key must be string');
    }
    if (!storage.hasOwnProperty(key)) {
        throw new Error('key do not exist');
    }
    storage[key] = newValue;
};

let deleteItem = (key) => {
    if (typeof (key) !== 'string') {
        throw new Error('key must be string');
    }
    if (!storage.hasOwnProperty(key)) {
        throw new Error('key do not exist');
    }
    delete storage[key];
};

let clear = () => {
    storage = {};
};

let save = () => {
    fs.writeFileSync('./data.json', JSON.stringify(storage), 'utf8');
};

let load = () => {
    try {
        storage = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
    } catch (err) {
    } finally {
    }
};

module.exports = {
    put: put,
    get: get,
    getAll: getAll,
    update: update,
    delete: deleteItem,
    clear: clear,
    save: save,
    load: load
};