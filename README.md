A 57-line, no-dependencies package that offers `series(funcs, done)`, `parallel(funcs, done)`, `eachSeries(arr, func, done)`, and `eachParallel(arr, func, done)`.

```
var NoAsync = require('no-async');

NoAsync.series([
    function(next) { next(null, 1); },
    function(next) { next(null, 2); },
    function(next) { next(null, 3); }
], function seriesComplete(err, arrayOfResponses) {
    console.log(arrayOfResponses.toString() === [1, 2, 3].toString()); // true
});

NoAsync.parallel([
    function(next) { next(null, 1); },
    function(next) { next(null, 2); },
    function(next) { next(null, 3); }
], function parallelComplete(arrayOfErrors, arrayOfResponses) {
    console.log(arrayOfResponses.toString() === [1, 2, 3].toString()); // true
});

NoAsync.eachSeries(
    [1, 2, 3], // Array of items
    function(item, next) { next(null, item); }, // Repeat Function
    function(err, arrayOfResponses) {
        console.log(arrayOfResponses.toString() === [1, 2, 3].toString()); // true
    }
);

NoAsync.eachParallel(
    [1, 2, 3], // Array of items
    function(item, next) { next(null, item); }, // Repeat Function
    function(arrayOfErrors, arrayOfResponses) {
        console.log(arrayOfResponses.toString() === [1, 2, 3].toString()); // true
    }
);
```
