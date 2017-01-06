function eachSeries(arr, func, done) {
    if (!arr) return done(undefined, []);
    if (typeof func !== 'function') throw new Error(func + ' is not a function.');

    if (arr instanceof Array) {
        if (!arr.length) return done(undefined, []);
        nextSeriesArrayFunc(arr, func, 0, [], done);
    } else {
        var keys = Object.keys(arr),
            keysLength = keys.length,
            lastKey = keys[keysLength - 1];

        if (!keys.length) return done(undefined, []);
        nextSeriesObjectFunc(arr, keys, keysLength, lastKey, keys[0], func, [], done);
    }
}

function nextSeriesArrayFunc(arr, func, i, responses, done) {
    func(arr[i++], function(err, newData) {
        responses.push(newData);
        if (err || i === arr.length) return done(err, responses);
        nextSeriesArrayFunc(arr, func, i, responses, done);
    });
}

function nextSeriesObjectFunc(obj, keys, keysLength, lastKey, key, func, responses, done) {
    func(key, obj[key], function(err, newData) {
        responses.push(newData);
        if (err || lastKey === key) return done(err, responses);
        nextSeriesObjectFunc(obj, keys, keysLength, lastKey, keys[keys.indexOf(key) + 1], func, responses, done);
    });
}

module.exports = eachSeries;
