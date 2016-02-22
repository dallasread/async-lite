function parallel(funcs, done) {
    var responses = [],
        funcsCount = funcs.length - 1,
        funcsComplete = 0;

    for (var i = 0; i <= funcsCount; i++) {
        funcs[i](function nextStep(err, data) {
            responses.push(data);

            if (funcsComplete === funcsCount && typeof done === 'function') {
                done(err, responses);
            }

            funcsComplete++;
        });
    }
}

module.exports = parallel;
