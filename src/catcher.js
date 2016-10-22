// @flow
import Logger from './logger';

const formatError = error => error;

let config: Object = {};

function funcExecutor(funcToCall: Function, args: ?Array<any> = [], scope: ?Object): void {
    try {
        funcToCall.apply(scope, args);
    } catch (e) {
        config.loggingFunction(formatError(e));

        throw e;
    }
};

function attachGlobalHandler(): void {
    config.scope.onerror = () => {
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
