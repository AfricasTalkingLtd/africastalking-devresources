"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$denseRank = void 0;
var _internal_1 = require("./_internal");
/** Returns the document position relative to other documents in the $setWindowFields stage partition. */
function $denseRank(obj, collection, expr, options) {
    return (0, _internal_1.rank)(obj, collection, expr, options, true /*dense*/);
}
exports.$denseRank = $denseRank;
