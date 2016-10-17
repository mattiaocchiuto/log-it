import 'babel-polyfill';

import Catcher from './catcher';
import Logger from './logger';

// Default config values.
const defaultConfig = {
    scope: (typeof window !== 'undefined') ? window : {},
    loggingFunction: () => true,
    useWorker: true,
    errorBuffer: 5,
};

// Config used by the module.
let config = {};

const sendErrorToLogger = formattedError => formattedError;

export default function LogIt(userConfig = {}) {
    // TODO npm i --save-dev babel-preset-stage-2
    config = { ...defaultConfig, ...userConfig };

    return {
        ...Catcher,
    };
}
