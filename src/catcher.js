// import Logger from './logger';

let LoggerWorker = null;
let config = {};

function isObject(val) {
  return Object.getPrototypeOf(val) === Object.prototype;
}

if (window && window.Worker && config.useWorker) {
    LoggerWorker = new Worker('/dist/logger_worker.min.js');
}

function attachGlobalHandler() {
    window.onerror = (...args) => {
        const formattedError = config.formatError.call(undefined, args);
        const payload = isObject(formattedError) ? JSON.stringify(formattedError) : formattedError;

        if (LoggerWorker) {
            LoggerWorker.postMessage({
                type: 'onerror',
                payload: payload,
            });
        } else {
            config.loggingFunction(config.formatError.call(undefined, args));
        }

        return true;
    };
}

export default function Catcher(mergedConfig) {
    config = mergedConfig;

    if (LoggerWorker) {
        LoggerWorker.postMessage({
            type: 'initialization',
            payload: JSON.stringify(config, (key, val) => (typeof val === 'function') ? (`${val}`) : val),
        });
    }

    return {
        attachGlobalHandler,
    };
}
