import { ensureArray } from "../../util";
import { $project } from "./project";
/**
 * Removes/excludes fields from documents.
 *
 * @param collection
 * @param expr
 * @param options
 * @returns {Iterator}
 */
export function $unset(collection, expr, options) {
    expr = ensureArray(expr);
    const doc = {};
    for (const k of expr)
        doc[k] = 0;
    return $project(collection, doc, options);
}
