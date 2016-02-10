function parallel(funcs, done) {
    var responses = [],
        funcCount = funcs.length - 1;

    for (var i = 0; i <= funcCount; i++) {
        if (typeof funcs[i] !== 'function') throw new Error(funcs[i] + ' is not a function.');

        funcs[i](function nextStep(err, data) {
            responses.push(data);

            if (i === funcCount && typeof done === 'function') {
                done(err, responses);
            }
        });
    }
}

function series(funcs, done) {
    function performNextFunc(i, data) {
        var func = funcs[i];

        if (typeof func === 'function') {
            func(function(err, newData) {
                if (err) return done(err, responses);

                performNextFunc(i + 1, newData);
            });
        } else {
            done(null, data);
        }
    }

    performNextFunc(0);
}

module.exports = {
    parallel: parallel,
    series: series
};
