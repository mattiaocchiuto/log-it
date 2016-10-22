// @flow
import Logger from './logger';

const formatError = error => error;

let config: Object = {};

function funcExecutor(funcToCall: function, args: ?Array<mixed> = [], scope: ?Object): void {
    try {
        funcToCall.apply(scope, args);
    } catch (e) {
        // TODO trova modo per fare la compose nativa
        config.loggingFunction(formatError(e));

        throw e;
    }
};

function attachGlobalHandler(): void {
    config.scope.onerror = () => {
        // TODO trova modo per fare la compose nativa
        config.loggingFunction(formatError({ arguments }));

        return false;
    };
};

export default function Logger(mergedConfig: Object): Object {
    config = mergedConfig;

    return {
        funcExecutor,
        attachGlobalHandler,
    };
}
