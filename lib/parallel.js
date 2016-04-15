function parallel(funcs, done) {
    var responses = [],
        errs = [],
        funcsCount = funcs.length - 1,
        funcsComplete = 0;

    for (var i = 0; i <= funcsCount; i++) {
        funcs[i](function nextStep(err, data) {
            if (err) errs.push(err);

            responses.push(data);

            if (funcsComplete === funcsCount && typeof done === 'function') {
                done(errs, responses);
            }

            funcsComplete++;
        });
    }
}

module.exports = parallel;
