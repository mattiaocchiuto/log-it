# LogIt
LogIt is a library that give the capability to track the client side exceptions in a easy and programmatically way.

This library works by adding a global error handler that will catch all exceptions that will occurs in your application and track it using the configured functions.log-it

The library API provide a single function ```attachGlobalHandler``` which will take as input a configuration object and attach a global error handler.

##Configuration Object
The library get a configuration object over wich you can overwrite the default behaviour.

###Configuration Object descriptions
* ```logErrorFunction``` _\<Function\>_: function called when an error occur, it will receive the formatted error
* ```formatErrorFunction``` _\<Function\>_: function which take as input the raw Error Object catched by the global error handler and give you the ability to format it, the output of this function will be passed to the logErrorFunction
* ```useWorker``` _\<boolean\>_: if true the logErrorFunction will be called from a separate web worker this has be done with the aim of move the computation away from the main thread
* ```errorBuffer``` _\<number\>_: you can chooce to execute the logErrorFunction not for every Error triggered but only after a certain amount of it occur, with this parameter you can choose the buffer dimension
* ```preventExceptionBubbling``` _\<boolean\>_: if is true the Exception occurred will be bubbled up to the console and not blocked in the global error handler

###Configuration Object default values
```javascript
const defaultConfig = {
  logErrorFunction: (error) => {
    const [errorName, file, line, col, errorObj] = [...error];

    return {
        errorName: errorName,
        file: file,
        line: line,
        col: col,
        stack: errorObj ? errorObj.stack : null,
    };
  },
  formatErrorFunction: () => console.log,
  useWorker: true,
  errorBuffer: 1,
  preventExceptionBubbling: false,
};
```

##Installation 
Run  ```npm install```

##Build
Run  ```npm run build```

##Example of use

```html
<script src="../dist/index.min.js" ></script>

<script>
  LogIt.LogIt().attachGlobalHandler()

  function brokeIt() {
    throw new Error('Fake error');
  }

  setTimeout(brokeIt, 5000);
</script>
```

## License
This project is licensed under the terms of MIT License. See the LICENSE file for more info.

