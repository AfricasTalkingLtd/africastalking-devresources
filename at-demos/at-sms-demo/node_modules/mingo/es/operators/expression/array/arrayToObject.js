// Array Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#array-expression-operators
import { computeValue } from "../../../core";
import { assert, has, isArray, isObject } from "../../../util";
/**
 * Converts an array of key value pairs to a document.
 */
export function $arrayToObject(obj, expr, options) {
    const arr = computeValue(obj, expr, null, options);
    assert(isArray(arr), "$arrayToObject expression must resolve to an array");
    return arr.reduce((newObj, val) => {
        if (val instanceof Array && val.length == 2) {
            newObj[val[0]] = val[1];
        }
        else {
            const valObj = val;
            assert(isObject(valObj) && has(valObj, "k") && has(valObj, "v"), "$arrayToObject expression is invalid.");
            newObj[valObj.k] = valObj.v;
        }
        return newObj;
    }, {});
}
