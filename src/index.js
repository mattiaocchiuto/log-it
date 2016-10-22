// @flow
import 'babel-polyfill';

import Catcher from './catcher';
import Logger from './logger';

type LogConfig = {
  scope: Object,
  loggingFunction: Function,
  useWorker: boolean,
  errorBuffer: number,
};

// Default config values.
const defaultConfig: LogConfig = {
    scope: (typeof window !== 'undefined') ? window : {},
    loggingFunction: () => true,
    useWorker: true,
    errorBuffer: 5,
};

// Config used by the module.
let config = {};

export default function LogIt(userConfig: ?Object = {}): Object {
    config = { ...defaultConfig, ...userConfig };

    return {
        ...Catcher(config),
    };
}
