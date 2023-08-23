/** Returns the position of a document in the $setWindowFields stage partition. */
export function $documentNumber(obj, collection, expr, options) {
    return expr.documentNumber;
}
