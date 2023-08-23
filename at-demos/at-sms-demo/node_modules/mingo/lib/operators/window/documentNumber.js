"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$documentNumber = void 0;
/** Returns the position of a document in the $setWindowFields stage partition. */
function $documentNumber(obj, collection, expr, options) {
    return expr.documentNumber;
}
exports.$documentNumber = $documentNumber;
