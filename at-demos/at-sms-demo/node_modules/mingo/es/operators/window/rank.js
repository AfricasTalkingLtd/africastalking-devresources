import { rank } from "./_internal";
/** Returns the position of a document in the $setWindowFields stage partition. */
export function $rank(obj, collection, expr, options) {
    return rank(obj, collection, expr, options, false /*dense*/);
}
