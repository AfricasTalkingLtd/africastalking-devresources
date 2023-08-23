/**
 * Type Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#type-expression-operators
 */
import { Options } from "../../../core";
import { AnyVal, RawObject } from "../../../types";
export declare function $toString(obj: RawObject, expr: AnyVal, options?: Options): string | null;
