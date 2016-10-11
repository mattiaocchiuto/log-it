import 'babel-polyfill';

// Default config values.
const defaultConfig = {
    loggingFunction: () => true,
};

// Config used by the module.
const config = {};

// Private function.
const formatError = (error = {}) => {
    return error;
};

const formatAndLogError = (error) => {

};

// Public function.
const funcExecutor = (funcToCall, args = [], scope = undefined) => {
    try {
        funcToCall.apply(scope, ...args);
    } catch (e) {
        config.loggingFunction();

        throw e;
    }
};

const attachGlobalHandler = (scope = window) => {
    scope.onerror = function myErrorHandler() {
        const formattedError = formatError({ ...arguments });
        const 

        return false;
    };
};

export default function LogIt(userConfig = defaultConfig) {
    Object.assign(config, userConfig);

    return {
        funcExecutor,
        attachGlobalHandler,
    };
}
