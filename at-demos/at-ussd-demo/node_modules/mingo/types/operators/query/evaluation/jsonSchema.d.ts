import { Options } from "../../../core";
import { AnyVal, Predicate } from "../../../types";
/**
 * Validate documents against the given JSON Schema.
 *
 * @param selector
 * @param schema
 * @returns {Function}
 */
export declare function $jsonSchema(selector: string, schema: AnyVal, options?: Options): Predicate<AnyVal>;
