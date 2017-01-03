import * as constants from './constants';
import ErrorQueue from './ErrorQueue.class';

let LoggerWorker = null;
let config = {};

function isObject(val) {
    return Object.getPrototypeOf(val) === Object.prototype;
}

function log(error) {
    if (LoggerWorker && config.useWorker) {
        LoggerWorker.postMessage({
            type: constants.ONERROR_ACTION,
            payload: isObject(error) ? JSON.stringify(error) : error,
        });
    } else {
        config.logErrorFunction(error);
    }
}

if (window && window.Worker) {
    LoggerWorker = new Worker('../src/logger_worker.js');
}

function attachGlobalHandler() {
    const errorQueue = new ErrorQueue(config.errorBuffer, log);

    window.onerror = (...error) => {
        errorQueue.addError(config.formatError.call(undefined, error));

        return true;
    };
}

export default function Catcher(mergedConfig) {
    config = mergedConfig;

    if (config.useWorker) {
        LoggerWorker.postMessage({
            type: constants.INITIALIZATION_ACTION,
            payload: JSON.stringify(config, (key, val) => (typeof val === 'function') ? (`${val}`) : val),
        });
    }

    return {
        attachGlobalHandler,
    };
}
