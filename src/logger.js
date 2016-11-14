onmessage = function(e) {
  console.log('Message received from main script');
  var workerResult = 'file: ' + (e.data);
  console.log('Posting message back to main script');
  postMessage("hello, I am a web worker", "*");
};
