A 39-line, no-dependencies package that offers `series(funcs, done)` and `parallel(funcs, done)`.

```
var NoAsync = require('no-async');

NoAsync.series([
    function(next) { next(null); },
    function(next) { next(null); },
    function(next) { next(null, 789); }
], function seriesComplete(err, lastResponse) {
    // Handle complete
});

NoAsync.parallel([
    function(next) { next(null, 123); },
    function(next) { next(null, 456); },
    function(next) { next(null, 789); }
], function parallelComplete(err, arrayofResponses) {
    // Handle complete
});
```
