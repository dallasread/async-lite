function eachSeries(arr, func, done) {
    if (!arr.length) return done(null, []);
    if (typeof func !== 'function') throw new Error(func + ' is not a function.');
    nextSeriesFunc(arr, func, 0, done, []);
}

function nextSeriesFunc(arr, func, i, done, responses) {
    func(arr[i++], function(err, newData) {
        responses.push(newData);
        if (err || i === arr.length) return done(err, responses);
        nextSeriesFunc(arr, func, i, done, responses);
    });
}

module.exports = eachSeries;
