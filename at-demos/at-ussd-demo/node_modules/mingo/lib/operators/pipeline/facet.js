"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.$facet = void 0;
var aggregator_1 = require("../../aggregator");
var core_1 = require("../../core");
var util_1 = require("../../util");
/**
 * Processes multiple aggregation pipelines within a single stage on the same set of input documents.
 * Enables the creation of multi-faceted aggregations capable of characterizing data across multiple dimensions, or facets, in a single stage.
 */
function $facet(collection, expr, options) {
    return collection.transform(function (array) {
        return [
            (0, util_1.objectMap)(expr, function (pipeline) {
                return new aggregator_1.Aggregator(pipeline, __assign(__assign({}, options), { processingMode: core_1.ProcessingMode.CLONE_INPUT })).run(array);
            }),
        ];
    });
}
exports.$facet = $facet;
