/**
 * Type Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#type-expression-operators
 */
import { Options } from "../../../core";
import { AnyVal, BsonType, RawObject } from "../../../types";
export declare function $type(obj: RawObject, expr: AnyVal, options?: Options): BsonType;
