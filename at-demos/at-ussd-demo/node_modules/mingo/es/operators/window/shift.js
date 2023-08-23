import { computeValue } from "../../core";
/**
 * Returns the value from an expression applied to a document in a specified
 * position relative to the current document in the $setWindowFields stage partition.
 */
export function $shift(obj, collection, expr, options) {
    const input = expr.inputExpr;
    const shiftedIndex = expr.documentNumber - 1 + input.by;
    if (shiftedIndex < 0 || shiftedIndex > collection.length - 1) {
        return input.default
            ? computeValue(obj, input.default, null, options)
            : null;
    }
    return computeValue(collection[shiftedIndex], input.output, null, options);
}
