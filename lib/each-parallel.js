function nextStep(err, data, errs, responses, last, done) {
    if (err) errs.push(err);

    responses.push(data);

    if (last && typeof done === 'function') {
        done(errs, responses);
    }
}

function eachParallel(arr, func, done) {
    if (!arr) return done([], []);

    var responses = [],
        errs = [],
        args = [];

    if (arr instanceof Array) {
        if (!arr.length) return done([], []);

        var arrCount = arr.length - 1,
            arrComplete = 0;

        for (var i = 0; i <= arrCount; i++) {
            func(arr[i], function complete(err, data) {
                nextStep(err, data, errs, responses, arrComplete === arrCount, done);
                arrComplete++;
            });
        }
    } else {
        var objKeys = Object.keys(arr || {}),
            lastKey = objKeys[objKeys.length - 1];

        if (!objKeys || !objKeys.length) return done([], []);

        for (var key in arr) {
            func(key, arr[key], function complete(err, data) {
                nextStep(err, data, errs, responses, lastKey === key, done);
            });
        }
    }
}

module.exports = eachParallel;
