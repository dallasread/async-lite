function eachParallel(arr, func, done) {
    var responses = [],
        arrCount = arr.length - 1,
        arrComplete = 0;

    for (var i = 0; i <= arrCount; i++) {
        func(arr[i], function nextStep(err, data) {
            responses.push(data);

            if (arrComplete === arrCount && typeof done === 'function') {
                done(err, responses);
            }

            arrComplete++;
        });
    }
}

module.exports = eachParallel;
