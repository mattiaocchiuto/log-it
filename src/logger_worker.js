// import * as constants from './constants';

let config = {};

function initializeConfig(customConfig) {
  config = customConfig;

  return config;
}

onmessage = function onmessage(msg) {
  const response = 'hello, I am a web worker';

  switch (msg.data.type) {
    case 'initialization': {
      initializeConfig(JSON.parse(msg.data.payload));

      break;
    }
    case 'onerror': {
      let payload = null;

      try {
        payload = JSON.parse(msg.data.payload);
      } catch (e) {
        payload = msg.data.payload;
      }

      if (typeof loggingFunction === 'undefined' && config.loggingFunction) {
        eval(config.loggingFunction);
      }

      if (loggingFunction) {
        loggingFunction(payload);
      }

      break;
    }
    default:
      break;
  }

  postMessage(response);
};
