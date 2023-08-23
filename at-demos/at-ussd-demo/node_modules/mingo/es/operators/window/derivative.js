import { $first, $last } from "../accumulator";
import { MILLIS_PER_UNIT } from "./_internal";
/**
 * Returns the average rate of change within the specified window
 */
export function $derivative(obj, collection, expr, options) {
    const { input, unit } = expr.inputExpr;
    const sortKey = "$" + Object.keys(expr.parentExpr.sortBy)[0];
    const y1 = $first(collection, input, options);
    const y2 = $last(collection, input, options);
    // ensure values are represented as numbers for dates
    const x1 = +$first(collection, sortKey, options);
    const x2 = +$last(collection, sortKey, options);
    // convert from millis to the unit.
    const deltaX = (x2 - x1) / (MILLIS_PER_UNIT[unit] || 1);
    return (y2 - y1) / deltaX;
}
