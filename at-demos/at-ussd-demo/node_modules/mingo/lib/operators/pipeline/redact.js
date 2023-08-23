"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$redact = void 0;
var core_1 = require("../../core");
/**
 * Restricts the contents of the documents based on information stored in the documents themselves.
 *
 * https://docs.mongodb.com/manual/reference/operator/aggregation/redact/
 */
function $redact(collection, expr, options) {
    var copts = core_1.ComputeOptions.init(options);
    return collection.map(function (obj) {
        return (0, core_1.redact)(obj, expr, copts.update(obj));
    });
}
exports.$redact = $redact;
