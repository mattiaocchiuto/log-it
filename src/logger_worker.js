import * as constants from './constants';

let config = {};

function initializeConfig(customConfig) {
  config = customConfig;
}

onmessage = function onmessage(msg) {
  const response = 'hello, I am a web worker';

  switch (msg.data.type) {
    case constants.INITIALIZATION_ACTION: {
      initializeConfig(JSON.parse(msg.data.payload));

      break;
    }
    case constants.ONERROR_ACTION: {
      let payload = null;

      try {
        payload = JSON.parse(msg.data.payload);
      } catch (e) {
        payload = msg.data.payload;
      }

      if (config.loggingFunction) {
        eval(config.loggingFunction);

        loggingFunction(payload);
      }

      break;
    }
    default:
      break;
  }

  postMessage(response);
};
