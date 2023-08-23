import { Aggregator } from "../../aggregator";
import { ProcessingMode } from "../../core";
import { objectMap } from "../../util";
/**
 * Processes multiple aggregation pipelines within a single stage on the same set of input documents.
 * Enables the creation of multi-faceted aggregations capable of characterizing data across multiple dimensions, or facets, in a single stage.
 */
export function $facet(collection, expr, options) {
    return collection.transform((array) => {
        return [
            objectMap(expr, (pipeline) => new Aggregator(pipeline, {
                ...options,
                processingMode: ProcessingMode.CLONE_INPUT,
            }).run(array)),
        ];
    });
}
