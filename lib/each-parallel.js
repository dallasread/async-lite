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
            arrComplete = 0,
            i;

        for (i = 0; i <= arrCount; i++) {
            func(arr[i], function complete(err, data) {
                nextStep(err, data, errs, responses, arrComplete === arrCount, done);
                arrComplete++;
            });
        }
    } else {
        var objKeys = Object.keys(arr || {}),
            objLength = objKeys.length,
            countdown = objLength,
            lastKey = objKeys[objLength - 1],
            key;

        if (!objLength) return done([], []);

        for (key in arr) {
            func(key, arr[key], function complete(err, data) {
                countdown--;
                nextStep(err, data, errs, responses, countdown === 0, done);
            });
        }
    }
}

module.exports = eachParallel;
