var NoAsync = require('./');

function arrEquals(a, b) {
    return a.toString() === b.toString();
}

NoAsync.series([
    function(next) { next(null, 1); },
    function(next) { next(null, 2); },
    function(next) { next(null, 3); }
], function seriesComplete(err, arrayOfResponses) {
    if (arrayOfResponses.toString() !== [1, 2, 3].toString()) {
        throw new Error('Test #1 Failed.');
    }
});

NoAsync.parallel([
    function(next) { next(null, 1); },
    function(next) { next(null, 2); },
    function(next) { next(null, 3); }
], function parallelComplete(err, arrayOfResponses) {
    if (arrayOfResponses.toString() !== [1, 2, 3].toString()) {
        throw new Error('Test #2 Failed.');
    }
});

NoAsync.eachSeries(
    [1, 2, 3],
    function(i, next) { next(null, i); },
    function(err, arrayOfResponses) {
        if (arrayOfResponses.toString() !== [1, 2, 3].toString()) {
            throw new Error('Test #3 Failed.');
        }
    }
);

NoAsync.eachParallel(
    [1, 2, 3],
    function(i, next) { next(null, i); },
    function(err, arrayOfResponses) {
        if (arrayOfResponses.toString() !== [1, 2, 3].toString()) {
            throw new Error('Test #4 Failed.');
        }
    }
);

console.log('All tests passed!');
