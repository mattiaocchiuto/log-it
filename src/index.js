import 'babel-polyfill';

const window = (typeof window !== 'undefined') ? window : {};

// Default config values.
const defaultConfig = {
    loggingFunction: () => true,
    loadInWorker: true, // FIXME cambia il nome
};

// Config used by the module.
const config = {};

// ***** Private functions *****
const formatError = (error = {}) => error;

// Public function.
const funcExecutor = (funcToCall, args = [], scope = undefined) => {
    try {
        funcToCall.apply(scope, ...args);
    } catch (e) {
        // TODO trova modo per fare la compose nativa
        config.loggingFunction(formatError(e));

        throw e;
    }
};

// FIXME capire se è permesso avere la window come default
const attachGlobalHandler = (scope = window) => {
    scope.onerror = () => {
        // TODO trova modo per fare la compose nativa
        config.loggingFunction(formatError({ ...arguments }));

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
