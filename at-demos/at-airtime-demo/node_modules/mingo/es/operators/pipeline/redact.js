import { ComputeOptions, redact } from "../../core";
/**
 * Restricts the contents of the documents based on information stored in the documents themselves.
 *
 * https://docs.mongodb.com/manual/reference/operator/aggregation/redact/
 */
export function $redact(collection, expr, options) {
    const copts = ComputeOptions.init(options);
    return collection.map((obj) => redact(obj, expr, copts.update(obj)));
}
