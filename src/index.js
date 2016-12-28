// @flow
import 'babel-polyfill';

import Catcher from './catcher';
import Logger from './logger';

// Config interface.
type LogConfig = {
  scope: Object,
  loggingFunction: Function,
  formatError: Function,
  useWorker: boolean,
  errorBuffer: number,
};

function formatError(e) {
    let errorName, file, line, col;

    [errorName, file, line, col] = [...e];
    
    return {
      errorName,
      file,
      line,
      col,
    };
  }

function loggingFunction({ errorName }: Object): any {
    console.log(errorName);
}

// Default config values.
const defaultConfig: LogConfig = {
    scope: (typeof window !== 'undefined') ? window : {},
    loggingFunction,
    formatError,
    useWorker: true,
    errorBuffer: 5,
};

// Config used by the module.
let config = {};

export default function LogIt(userConfig: ?Object = {}): Object {
    config = { ...defaultConfig, ...userConfig };

    console.log(Catcher);

    return {
        ...Catcher(config),
    };
}
