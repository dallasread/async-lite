function series(funcs, done) {
    nextSeriesFunc(funcs, 0, done, []);
}

function nextSeriesFunc(funcs, i, done, responses) {
    funcs[i++](function seriesCallback(err, newData) {
        responses.push(newData);
        if (err || i === funcs.length) return done(err, responses);
        nextSeriesFunc(funcs, i, done, responses);
    });
}

module.exports = series;
