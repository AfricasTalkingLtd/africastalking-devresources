/**
 * Predicates used for Query and Expression operators.
 */
import { ExpressionOperator, Options, QueryOperator } from "../core";
import { AnyVal, BsonType, JsType, Predicate, RawArray, RawObject } from "../types";
type PredicateOptions = Options & {
    depth: number;
};
type ConversionType = number | JsType | BsonType;
/**
 * Returns a query operator created from the predicate
 *
 * @param predicate Predicate function
 */
export declare function createQueryOperator(predicate: Predicate<AnyVal>): QueryOperator;
/**
 * Returns an expression operator created from the predicate
 *
 * @param predicate Predicate function
 */
export declare function createExpressionOperator(predicate: Predicate<AnyVal>): ExpressionOperator;
/**
 * Checks that two values are equal.
 *
 * @param a         The lhs operand as resolved from the object by the given selector
 * @param b         The rhs operand provided by the user
 * @returns {*}
 */
export declare function $eq(a: AnyVal, b: AnyVal, options?: PredicateOptions): boolean;
/**
 * Matches all values that are not equal to the value specified in the query.
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
export declare function $ne(a: AnyVal, b: AnyVal, options?: PredicateOptions): boolean;
/**
 * Matches any of the values that exist in an array specified in the query.
 *
 * @param a
 * @param b
 * @returns {*}
 */
export declare function $in(a: RawArray, b: RawArray, options?: PredicateOptions): boolean;
/**
 * Matches values that do not exist in an array specified to the query.
 *
 * @param a
 * @param b
 * @returns {*|boolean}
 */
export declare function $nin(a: RawArray, b: RawArray, options?: PredicateOptions): boolean;
/**
 * Matches values that are less than the value specified in the query.
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
export declare function $lt(a: AnyVal, b: AnyVal, options?: PredicateOptions): boolean;
/**
 * Matches values that are less than or equal to the value specified in the query.
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
export declare function $lte(a: AnyVal, b: AnyVal, options?: PredicateOptions): boolean;
/**
 * Matches values that are greater than the value specified in the query.
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
export declare function $gt(a: AnyVal, b: AnyVal, options?: PredicateOptions): boolean;
/**
 * Matches values that are greater than or equal to the value specified in the query.
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
export declare function $gte(a: AnyVal, b: AnyVal, options?: PredicateOptions): boolean;
/**
 * Performs a modulo operation on the value of a field and selects documents with a specified result.
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
export declare function $mod(a: AnyVal, b: number[], options?: PredicateOptions): boolean;
/**
 * Selects documents where values match a specified regular expression.
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
export declare function $regex(a: AnyVal, b: RegExp, options?: PredicateOptions): boolean;
/**
 * Matches documents that have the specified field.
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
export declare function $exists(a: AnyVal, b: AnyVal, options?: PredicateOptions): boolean;
/**
 * Matches arrays that contain all elements specified in the query.
 *
 * @param values
 * @param queries
 * @returns boolean
 */
export declare function $all(values: RawArray, queries: Array<RawObject>, options?: PredicateOptions): boolean;
/**
 * Selects documents if the array field is a specified size.
 *
 * @param a
 * @param b
 * @returns {*|boolean}
 */
export declare function $size(a: RawArray, b: number, options?: PredicateOptions): boolean;
/**
 * Selects documents if element in the array field matches all the specified $elemMatch condition.
 *
 * @param a {Array} element to match against
 * @param b {Object} subquery
 */
export declare function $elemMatch(a: RawArray, b: RawObject, options?: PredicateOptions): boolean;
/**
 * Selects documents if a field is of the specified type.
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
export declare function $type(a: AnyVal, b: ConversionType | Array<ConversionType>, options?: PredicateOptions): boolean;
export {};
