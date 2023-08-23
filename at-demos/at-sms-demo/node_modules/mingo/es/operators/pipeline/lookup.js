import { assert, hashCode, into, isString, resolve } from "../../util";
/**
 * Performs a left outer join to another collection in the same database to filter in documents from the “joined” collection for processing.
 *
 * @param collection
 * @param expr
 * @param opt
 */
export function $lookup(collection, expr, options) {
    const joinColl = isString(expr.from)
        ? options?.collectionResolver(expr.from)
        : expr.from;
    assert(joinColl instanceof Array, `'from' field must resolve to an array`);
    const hash = {};
    for (const obj of joinColl) {
        const k = hashCode(resolve(obj, expr.foreignField), options?.hashFunction);
        hash[k] = hash[k] || [];
        hash[k].push(obj);
    }
    return collection.map((obj) => {
        const k = hashCode(resolve(obj, expr.localField), options?.hashFunction);
        const newObj = into({}, obj);
        newObj[expr.as] = hash[k] || [];
        return newObj;
    });
}
