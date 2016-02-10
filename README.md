A 39-line, no-dependencies package that offers `series()` and `parallel()`.

var AsyncLite = require('async-lite');

AsyncLite.series([
    function(next) { next(null, 123); },
    function(next) { next(null, 456); },
    function(next) { next(null, 789); }
], function(err, data) {
    if (data !== 789) {
        throw new Error('Failed test #1;')
    }
});

AsyncLite.parallel([
    function(next) { next(null, 123); },
    function(next) { next(null, 456); },
    function(next) { next(null, 789); }
], function(err, data) {
    if (data.length !== 3) {
        throw new Error('Failed test #2;');
    }
});
