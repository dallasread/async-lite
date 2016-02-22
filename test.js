var NoAsync = require('./');

function arrEquals(a, b) {
    return a.toString() === b.toString();
}

NoAsync.series([
    function(next) { next(null, 1); },
    function(next) { next(null, 2); },
    function(next) { next(null, 3); }
], function(err, data) {
    if (!arrEquals(data, [1, 2, 3])) {
        throw new Error('Failed test #1;')
    }
});

NoAsync.parallel([
    function(next) { next(null, 1); },
    function(next) { next(null, 2); },
    function(next) { next(null, 3); }
], function(err, data) {
    if (!arrEquals(data, [1, 2, 3])) {
        throw new Error('Failed test #2;');
    }
});

NoAsync.eachSeries(
    [1, 2, 3],
    function(i, next) { next(null, i); },
    function(err, data) {
        if (!arrEquals(data, [1, 2, 3])) {
            throw new Error('Failed test #3;')
        }
    }
);

NoAsync.eachParallel(
    [1, 2, 3],
    function(i, next) { next(null, i); },
    function(err, data) {
        if (!arrEquals(data, [1, 2, 3])) {
            throw new Error('Failed test #4;')
        }
    }
);

console.log('All tests passed!');
