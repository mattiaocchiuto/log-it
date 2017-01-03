# log-it
Run from the main directory ```npm install```

then

```html
<script src="../dist/index.min.js" ></script>

<script>
var config = {
  // logErrorFunction <function>, default console.log
  // formatErrorFunction <function>, default extract all param
  // useWorker: <boolean>, default true
  // errorBuffer: <number>, default 5
};
LogIt.LogIt(config).attachGlobalHandler()

function rompiTutto() {
  throw new Error('dai');
}
setTimeout(rompiTutto, 5000);
setTimeout(rompiTutto, 5010);
setTimeout(rompiTutto, 5020);
setTimeout(rompiTutto, 5030);
setTimeout(rompiTutto, 5040);
</script>```
