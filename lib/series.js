function series(funcs, done) {
    var funcsLength = funcs.length;
    if (!funcsLength) return done(null, []);
    nextSeriesFunc(funcs, funcsLength, 0, done, []);
}

function nextSeriesFunc(funcs, funcsLength, i, done, responses) {
    funcs[i++](function seriesCallback(err, newData) {
        responses.push(newData);
        if (err || i === funcsLength) return done(err, responses);
        nextSeriesFunc(funcs, funcsLength, i, done, responses);
    });
}

module.exports = series;
