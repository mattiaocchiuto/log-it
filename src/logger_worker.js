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

      if (typeof logErrorFunction === 'undefined' && config.logErrorFunction) {
        eval(config.logErrorFunction);
      }

      if (logErrorFunction) {
        logErrorFunction(payload);
      }

      break;
    }
    default:
      break;
  }

  postMessage(response);
};
