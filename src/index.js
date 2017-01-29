import Catcher from './catcher';

function formatErrorFunction(e) {
    const [errorName, file, line, col, errorObj] = [...e];

    return {
        errorName: errorName,
        file: file,
        line: line,
        col: col,
        stack: errorObj ? errorObj.stack : null,
    };
}

function logErrorFunction(errors) {
    console.log(errors);
}

// Default config values.
const defaultConfig = {
    logErrorFunction: logErrorFunction,
    formatErrorFunction: formatErrorFunction,
    useWorker: true,
    errorBuffer: 1,
    preventExceptionBubbling: false,
};

// Config used by the module.
let config = {};

export function LogIt(userConfig) {
    userConfig = userConfig || {};

    return {
        ...Catcher({ ...defaultConfig, ...userConfig }),
    };
}
