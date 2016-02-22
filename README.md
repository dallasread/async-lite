*Note: In 1.1.0, the second argument of `series()` now returns `arrayOfResponses` instead of `lastResponse`.*

A 57-line, no-dependencies package that offers `series(funcs, done)`, `parallel(funcs, done)`, `eachSeries(arr, func, done)`, and `eachParallel(arr, func, done)`.

```
var NoAsync = require('no-async');

NoAsync.series([
    function(next) { next(null); },
    function(next) { next(null); },
    function(next) { next(null, 789); }
], function seriesComplete(err, arrayOfResponses) {
    // Handle complete
});

NoAsync.parallel([
    function(next) { next(null, 123); },
    function(next) { next(null, 456); },
    function(next) { next(null, 789); }
], function parallelComplete(err, arrayOfResponses) {
    // Handle complete
});

NoAsync.eachSeries(
    [1, 2, 3, 4, 5], // Array of items
    function(i, next) { next(null, i); }, // Repeat Function
    function(err, arrayOfResponses) {
        // Handle complete
        console.log(arrayOfResponses === [1, 2, 3, 4, 5]); // true
    }
);

NoAsync.eachParallel(
    [1, 2, 3, 4, 5], // Array of items
    function(i, next) { next(null, i); }, // Repeat Function
    function(err, arrayOfResponses) {
        console.log(arrayOfResponses === [1, 2, 3, 4, 5]); // true
    }
);
```
