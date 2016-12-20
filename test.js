var NoAsync = require('./');

function testEquals(name, a, b) {
    if (a.toString() === b.toString()) {
        console.log('√ – ' + name);
    } else {
        console.error('x – ' + name);
    }
}

NoAsync.series([
    function(next) { next(null, 1); },
    function(next) { next(null, 2); },
    function(next) { next(null, 3); }
], function seriesComplete(err, arrayOfResponses) {
    testEquals('series', arrayOfResponses, [1, 2, 3]);
});

NoAsync.parallel([
    function(next) { next(null, 1); },
    function(next) { next(null, 2); },
    function(next) { next(null, 3); }
], function parallelComplete(arrayOfErrors, arrayOfResponses) {
    testEquals('parallel', arrayOfResponses, [1, 2, 3]);
});

NoAsync.eachSeries(
    [1, 2, 3],
    function(i, next) { next(null, i); },
    function eachSeriesComplete(err, arrayOfResponses) {
        testEquals('eachSeries', arrayOfResponses, [1, 2, 3]);
    }
);

NoAsync.eachParallel(
    [1, 2, 3],
    function(i, next) { next(null, i); },
    function eachParallelComplete(arrayOfErrors, arrayOfResponses) {
        testEquals('eachParallel', arrayOfResponses, [1, 2, 3]);
    }
);

NoAsync.eachSeries(
    { 1: 'one', 2: 'two', 3: 'three' },
    function(key, value, next) { next(null, [key, value]); },
    function eachObjectSeriesComplete(arrayOfErrors, arrayOfResponses) {
        testEquals('eachObjectSeries', arrayOfResponses, [[1, 'one'], [2, 'two'], [3, 'three']]);
    }
);

NoAsync.eachParallel(
    { 1: 'one', 2: 'two', 3: 'three' },
    function(key, value, next) { next(null, [key, value]); },
    function eachObjectParallelComplete(arrayOfErrors, arrayOfResponses) {
        testEquals('eachObjectParallel', arrayOfResponses, [[1, 'one'], [2, 'two'], [3, 'three']]);
    }
);
