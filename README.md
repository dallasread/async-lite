A 111-line, no-dependency package that offers `series(funcs, done)`, `parallel(funcs, done)`, `eachSeries(arrOrObj, func, done)`, and `eachParallel(arrOrObj, func, done)`.

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

If you pass in an object to the `each` function, the iterator function gives you `key`, `value`, and `next` arguments:
```
NoAsync.eachParallel(
    { 1: 'one', 2: 'two', 3: 'three' },
    function(key, value, next) { next(null, [key, value]); },
    function(arrayOfErrors, arrayOfResponses) {
        console.log(arrayOfResponses.toString() === [[1, 'one'], [2, 'two'], [3, 'three']].toString()); // true
    }
);

NoAsync.eachSeries(
    { 1: 'one', 2: 'two', 3: 'three' },
    function(key, value, next) { next(null, [key, value]); },
    function(err, arrayOfResponses) {
        console.log(arrayOfResponses.toString() === [[1, 'one'], [2, 'two'], [3, 'three']].toString()); // true
    }
);
```
