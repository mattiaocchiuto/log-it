// @flow
// import Logger from './logger';

let LoggerWorker = null;

if (window && window.Worker) {
    LoggerWorker = new Worker('logger.js');

    LoggerWorker.onmessage = function (e) {
        console.log('Message received from worker', e.data);
    }
}

let config: Object = {};

function funcExecutor(funcToCall: Function, args: ?Array<any> = [], scope: ?Object): void {
    try {
        funcToCall.apply(scope, args);
    } catch (error) {
        config.loggingFunction(config.formatError(error));

    throw e;
    }
};

function attachGlobalHandler(): void {
    console.log(LoggerWorker);
    setTimeout(function() {
        LoggerWorker.postMessage('prova', '*');
    }, 1000);

    config.scope.onerror = (...args) => {
        LoggerWorker && (LoggerWorker.postMessage('prova'));
        //config.loggingFunction(config.formatError.call(undefined, args));

        return false;
    };
};

export default function Catcher(mergedConfig: Object): Object {
        config = mergedConfig;

    return {
        // funcExecutor,
        attachGlobalHandler,
    };
}
