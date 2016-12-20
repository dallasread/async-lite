function nextStep(err, data, errs, responses, last, done) {
    if (err) errs.push(err);

    responses.push(data);

    if (last && typeof done === 'function') {
        done(errs, responses);
    }
}

function parallel(funcs, done) {
    if (!funcs.length) return done([], []);

    var responses = [],
        errs = [],
        funcsCount = funcs.length - 1,
        funcsComplete = 0,
        i;

    for (i = 0; i <= funcsCount; i++) {
        funcs[i](function complete(err, data) {
            nextStep(err, data, errs, responses, funcsComplete === funcsCount, done);
            funcsComplete++;
        });
    }
}

module.exports = parallel;
