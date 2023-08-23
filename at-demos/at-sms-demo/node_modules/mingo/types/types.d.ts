export type AnyVal = unknown;
export type RawObject = Record<string, AnyVal>;
export type RawArray = Array<AnyVal>;
export type ArrayOrObject = RawObject | RawArray;
export interface Callback<R = AnyVal, T = AnyVal> {
    (...args: T[]): R;
}
export interface Predicate<T> {
    (...args: T[]): boolean;
}
export interface Comparator<T> {
    (left: T, right: T): number;
}
/**
 * Custom function to hash values to improve faster comparaisons
 */
export type HashFunction = Callback<number>;
type CommonTypes = "null" | "undefined" | "string" | "date" | "array" | "object";
export type JsType = CommonTypes | "boolean" | "number" | "string" | "regexp" | "function";
export type BsonType = CommonTypes | "bool" | "int" | "long" | "double" | "decimal" | "regex";
export {};
