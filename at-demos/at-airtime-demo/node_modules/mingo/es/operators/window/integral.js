import { $push } from "../accumulator";
import { MILLIS_PER_UNIT } from "./_internal";
/**
 * Returns the approximation of the area under a curve.
 */
export function $integral(obj, collection, expr, options) {
    const { input, unit } = expr.inputExpr;
    const sortKey = "$" + Object.keys(expr.parentExpr.sortBy)[0];
    const y = $push(collection, input, options);
    // ensure values are represented as numbers for dates
    const x = $push(collection, sortKey, options).map((n) => +n);
    let result = 0;
    const size = collection.length;
    for (let k = 1; k < size; k++) {
        // convert from millis to the unit.
        const deltaX = (x[k] - x[k - 1]) / (MILLIS_PER_UNIT[unit] || 1);
        result += 0.5 * (y[k - 1] + y[k]) * deltaX;
    }
    return result;
}
