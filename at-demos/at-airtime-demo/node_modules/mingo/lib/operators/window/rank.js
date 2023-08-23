"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$rank = void 0;
var _internal_1 = require("./_internal");
/** Returns the position of a document in the $setWindowFields stage partition. */
function $rank(obj, collection, expr, options) {
    return (0, _internal_1.rank)(obj, collection, expr, options, false /*dense*/);
}
exports.$rank = $rank;
