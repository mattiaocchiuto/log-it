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
        errorName: errorName,
        file: file,
        line: line,
        col: col,
    };
}

function loggingFunction({ errorName }) {
    console.log(errorName);
}

// Default config values.
const defaultConfig = {
    loggingFunction: loggingFunction,
    formatError: formatError,
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
