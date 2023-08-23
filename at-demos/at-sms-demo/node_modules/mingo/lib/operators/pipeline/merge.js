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
exports.$merge = void 0;
var aggregator_1 = require("../../aggregator");
var core_1 = require("../../core");
var util_1 = require("../../util");
var accumulator_1 = require("../accumulator");
/**
 * Writes the resulting documents of the aggregation pipeline to a collection.
 *
 * The stage can incorporate (insert new documents, merge documents, replace documents,
 * keep existing documents, fail the operation, process documents with a custom update pipeline)
 * the results into an output collection. To use the $merge stage, it must be the last stage in the pipeline.
 *
 * Note: Object are deep cloned for outputing regardless of the ProcessingMode.
 *
 * @param collection
 * @param expr
 * @param options
 * @returns {*}
 */
function $merge(collection, expr, options) {
    var output = (0, util_1.isString)(expr.into)
        ? options === null || options === void 0 ? void 0 : options.collectionResolver(expr.into)
        : expr.into;
    (0, util_1.assert)(output instanceof Array, "$merge: option 'into' must resolve to an array");
    var onField = expr.on || options.idKey;
    var getHash = function (o) {
        var val = (0, util_1.isString)(onField)
            ? (0, util_1.resolve)(o, onField)
            : onField.map(function (s) { return (0, util_1.resolve)(o, s); });
        return (0, util_1.hashCode)(val, options.hashFunction);
    };
    var hash = {};
    // we assuming the lookup expressions are unique
    for (var i = 0; i < output.length; i++) {
        var obj = output[i];
        var k = getHash(obj);
        (0, util_1.assert)(!hash[k], "$merge: 'into' collection must have unique entries for the 'on' field.");
        hash[k] = [obj, i];
    }
    var copts = core_1.ComputeOptions.init(options);
    return collection.map(function (o) {
        var k = getHash(o);
        if (hash[k]) {
            var _a = hash[k], target = _a[0], i = _a[1];
            // compute variables
            var variables = (0, core_1.computeValue)(target, expr.let || { new: "$$ROOT" }, null, 
            // 'root' is the item from the iteration.
            copts.update(o));
            if ((0, util_1.isArray)(expr.whenMatched)) {
                var aggregator = new aggregator_1.Aggregator(expr.whenMatched, __assign(__assign({}, copts.options), { variables: variables }));
                output[i] = aggregator.run([target])[0];
            }
            else {
                switch (expr.whenMatched) {
                    case "replace":
                        output[i] = o;
                        break;
                    case "fail":
                        throw new Error("$merge: failed due to matching as specified by 'whenMatched' option.");
                    case "keepExisting":
                        break;
                    case "merge":
                    default:
                        output[i] = (0, accumulator_1.$mergeObjects)(target, [target, o], 
                        // 'root' is the item from the iteration.
                        copts.update(o, { variables: variables }));
                        break;
                }
            }
        }
        else {
            switch (expr.whenNotMatched) {
                case "discard":
                    break;
                case "fail":
                    throw new Error("$merge: failed due to matching as specified by 'whenMatched' option.");
                case "insert":
                default:
                    output.push(o);
                    break;
            }
        }
        return o; // passthrough
    });
}
exports.$merge = $merge;
