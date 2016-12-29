// import Logger from './logger';

let LoggerWorker = null;
let config = {};

function initializeWorker(worker, config) {
    worker.postMessage({
        type: 'initialization',
        payload: config,
    });
}

if (window && window.Worker) {
    LoggerWorker = new Worker('/src/logger.js');

    LoggerWorker.onmessage = function (e) {
        console.log('Message received from worker', e.data);
    };
}

function funcExecutor(funcToCall, args, scope) {
    try {
        funcToCall.apply(scope, args);
    } catch (error) {
        config.loggingFunction(config.formatError(error));

        throw error;
    }
}

function attachGlobalHandler() {
    window.onerror = (...args) => {
        if (LoggerWorker) {
            LoggerWorker.postMessage({
                type: 'onerror',
                payload: JSON.stringify(config.formatError.call(undefined, args)),
            });
        }

        return true;
    };
}

export default function Catcher(mergedConfig) {
    config = mergedConfig;
    
    LoggerWorker.postMessage(
        // {
        // type: 'initialization',
        // payload: JSON.stringify(config),}
        config.loggingFunction,
    );

    return {
        attachGlobalHandler,
    };
}
