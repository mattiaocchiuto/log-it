let config = {};

function initializeConfig(customConfig) {
  config = customConfig;
}

onmessage = function (msg) {
  const response = 'hello, I am a web worker';

  switch (msg.data.type) {
    case 'initialization': {
      initializeConfig(JSON.parse(msg.data.payload));

      break;
    }
    case 'onerror': {
      console.log(config);
      if (config.loggingFunction) {
        config.loggingFunction(JSON.parse(msg.data.payload));
      }
    }
    default:
      break;
  }

  postMessage(response);
};
