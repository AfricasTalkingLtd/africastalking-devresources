"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$covarianceSamp = void 0;
var _internal_1 = require("./_internal");
var push_1 = require("./push");
/**
 * Returns the sample covariance of two numeric expressions.
 * @param  {Array} collection
 * @param  {Object} expr
 * @return {Number|null}
 */
function $covarianceSamp(collection, expr, options) {
    return (0, _internal_1.covariance)((0, push_1.$push)(collection, expr, options), true);
}
exports.$covarianceSamp = $covarianceSamp;
