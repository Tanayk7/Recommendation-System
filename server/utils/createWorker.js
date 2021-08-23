const { Worker } = require('worker_threads');

function createWorker({ path, onMessage, onError, onExit }) {
    const worker = new Worker(path);

    worker.on('message', onMessage);
    worker.on("error", onError);
    worker.on('exit', onExit);
}

module.exports = { createWorker };