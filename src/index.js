import Catcher from './catcher';

// Config interface.
// type LogConfig = {
//   scope: Object,
//   loggingFunction: Function,
//   formatError: Function,
//   useWorker: boolean,
//   errorBuffer: number,
// };

function formatError(e) {
    const [errorName, file, line, col] = [...e];

    return {
        errorName,
        file,
        line,
        col,
    };
}

function loggingFunction({ errorName }) {
    console.log(errorName);
}

// Default config values.
const defaultConfig = {
    // scope: (typeof window !== 'undefined') ? window : {},
    loggingFunction,
    formatError,
    useWorker: true,
    errorBuffer: 5,
};

// Config used by the module.
let config = {};

export function LogIt(userConfig) {
    userConfig = userConfig || {};

    return {
        ...Catcher({ ...defaultConfig, ...userConfig }),
    };
}
