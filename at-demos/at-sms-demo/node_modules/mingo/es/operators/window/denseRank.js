import { rank } from "./_internal";
/** Returns the document position relative to other documents in the $setWindowFields stage partition. */
export function $denseRank(obj, collection, expr, options) {
    return rank(obj, collection, expr, options, true /*dense*/);
}
