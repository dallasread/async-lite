function eachParallel(arr, func, done) {
    var responses = [],
        errs = [],
        arrCount = arr.length - 1,
        arrComplete = 0;

    for (var i = 0; i <= arrCount; i++) {
        func(arr[i], function nextStep(err, data) {
            if (err) errs.push(err);

            responses.push(data);

            if (arrComplete === arrCount && typeof done === 'function') {
                done(errs, responses);
            }

            arrComplete++;
        });
    }
}

module.exports = eachParallel;
