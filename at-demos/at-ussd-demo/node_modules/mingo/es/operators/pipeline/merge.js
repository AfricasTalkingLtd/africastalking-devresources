import { Aggregator } from "../../aggregator";
import { ComputeOptions, computeValue } from "../../core";
import { assert, hashCode, isArray, isString, resolve } from "../../util";
import { $mergeObjects } from "../accumulator";
/**
 * Writes the resulting documents of the aggregation pipeline to a collection.
 *
 * The stage can incorporate (insert new documents, merge documents, replace documents,
 * keep existing documents, fail the operation, process documents with a custom update pipeline)
 * the results into an output collection. To use the $merge stage, it must be the last stage in the pipeline.
 *
 * Note: Object are deep cloned for outputing regardless of the ProcessingMode.
 *
 * @param collection
 * @param expr
 * @param options
 * @returns {*}
 */
export function $merge(collection, expr, options) {
    const output = isString(expr.into)
        ? options?.collectionResolver(expr.into)
        : expr.into;
    assert(output instanceof Array, `$merge: option 'into' must resolve to an array`);
    const onField = expr.on || options.idKey;
    const getHash = (o) => {
        const val = isString(onField)
            ? resolve(o, onField)
            : onField.map((s) => resolve(o, s));
        return hashCode(val, options.hashFunction);
    };
    const hash = {};
    // we assuming the lookup expressions are unique
    for (let i = 0; i < output.length; i++) {
        const obj = output[i];
        const k = getHash(obj);
        assert(!hash[k], "$merge: 'into' collection must have unique entries for the 'on' field.");
        hash[k] = [obj, i];
    }
    const copts = ComputeOptions.init(options);
    return collection.map((o) => {
        const k = getHash(o);
        if (hash[k]) {
            const [target, i] = hash[k];
            // compute variables
            const variables = computeValue(target, expr.let || { new: "$$ROOT" }, null, 
            // 'root' is the item from the iteration.
            copts.update(o));
            if (isArray(expr.whenMatched)) {
                const aggregator = new Aggregator(expr.whenMatched, {
                    ...copts.options,
                    variables,
                });
                output[i] = aggregator.run([target])[0];
            }
            else {
                switch (expr.whenMatched) {
                    case "replace":
                        output[i] = o;
                        break;
                    case "fail":
                        throw new Error("$merge: failed due to matching as specified by 'whenMatched' option.");
                    case "keepExisting":
                        break;
                    case "merge":
                    default:
                        output[i] = $mergeObjects(target, [target, o], 
                        // 'root' is the item from the iteration.
                        copts.update(o, { variables }));
                        break;
                }
            }
        }
        else {
            switch (expr.whenNotMatched) {
                case "discard":
                    break;
                case "fail":
                    throw new Error("$merge: failed due to matching as specified by 'whenMatched' option.");
                case "insert":
                default:
                    output.push(o);
                    break;
            }
        }
        return o; // passthrough
    });
}
