import Logger from './logger';

const formatError = error => error;

export function funcExecutor(funcToCall, args = [], scope = undefined) {
    try {
        funcToCall.apply(scope, ...args);
    } catch (e) {
        // TODO trova modo per fare la compose nativa
        config.loggingFunction(formatError(e));

        throw e;
    }
};

export function attachGlobalHandler() {
    config.scope.onerror = () => {
        // TODO trova modo per fare la compose nativa
        config.loggingFunction(formatError({ arguments }));

        return false;
    };
};
