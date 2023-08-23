"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.covariance = exports.stddev = void 0;
/**
 * Compute the standard deviation of the data set
 * @param {Array} array of numbers
 * @param {Boolean} if true calculates a sample standard deviation, otherwise calculates a population stddev
 * @return {Number}
 */
function stddev(data, sampled) {
    if (sampled === void 0) { sampled = true; }
    var sum = data.reduce(function (acc, n) { return acc + n; }, 0);
    var N = data.length || 1;
    var avg = sum / N;
    return Math.sqrt(data.reduce(function (acc, n) { return acc + Math.pow(n - avg, 2); }, 0) /
        (N - Number(sampled)));
}
exports.stddev = stddev;
function covariance(dataset, sampled) {
    if (sampled === void 0) { sampled = true; }
    if (!dataset)
        return null;
    if (dataset.length < 2)
        return sampled ? null : 0;
    var meanX = 0.0;
    var meanY = 0.0;
    for (var _i = 0, dataset_1 = dataset; _i < dataset_1.length; _i++) {
        var _a = dataset_1[_i], x = _a[0], y = _a[1];
        meanX += x;
        meanY += y;
    }
    meanX /= dataset.length;
    meanY /= dataset.length;
    var result = 0;
    for (var _b = 0, dataset_2 = dataset; _b < dataset_2.length; _b++) {
        var _c = dataset_2[_b], x = _c[0], y = _c[1];
        result += (x - meanX) * (y - meanY);
    }
    return result / (dataset.length - Number(sampled));
}
exports.covariance = covariance;
