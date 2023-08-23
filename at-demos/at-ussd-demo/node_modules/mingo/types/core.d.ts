import { Iterator } from "./lazy";
import { AnyVal, Callback, HashFunction, Predicate, RawArray, RawObject } from "./types";
/**
 * Resolves the given string to a Collection.
 * This is useful for operators that require a second collection to use such as $lookup and $out.
 * The collection is not cached and will be resolved each time it is used.
 */
export type CollectionResolver = (name: string) => Array<RawObject>;
/** Specification for collation options */
export interface CollationSpec {
    readonly locale: string;
    readonly caseLevel?: boolean;
    readonly caseFirst?: string;
    readonly strength?: number;
    readonly numericOrdering?: boolean;
    readonly alternate?: string;
    readonly maxVariable?: string;
    readonly backwards?: boolean;
}
/**
 * JSON schema validator
 */
export type JsonSchemaValidator = (schema: RawObject) => Predicate<RawObject>;
/**
 * This controls how input and output documents are processed to meet different application needs.
 * Each mode has different trade offs for; immutability, reference sharing, and performance.
 */
export declare enum ProcessingMode {
    /**
     * Clone inputs prior to processing, and the outputs if some objects graphs may be shared.
     * Use this option to keep input collection immutable and to get distinct output objects.
     *
     * Note: This option is expensive and reduces performance.
     */
    CLONE_ALL = "CLONE_ALL",
    /**
     * Clones inputs prior to processing.
     * This option will return output objects with shared graphs in their path if specific operators are used.
     * Use this option to keep the input collection immutable.
     *
     */
    CLONE_INPUT = "CLONE_INPUT",
    /**
     * Clones the output to return distinct objects with no shared paths.
     * This option modifies the input collection and during processing.
     */
    CLONE_OUTPUT = "CLONE_OUTPUT",
    /**
     * Turn off cloning and modifies the input collection as needed.
     * This option will also return output objects with shared paths in their graph when specific operators are used.
     *
     * This option provides the greatest speedup for the biggest tradeoff. When using the aggregation pipeline, you can use
     * the "$out" operator to collect immutable intermediate results.
     *
     * @default
     */
    CLONE_OFF = "CLONE_OFF"
}
/**
 * Generic options interface passed down to all operators
 */
export interface Options {
    /** The key that is used to lookup the ID value of a document. @default "_id" */
    readonly idKey?: string;
    /** The collation specification for string sorting operations. */
    readonly collation?: CollationSpec;
    /** Determines how to treat inputs and outputs. @default ProcessingMode.CLONE_OFF */
    readonly processingMode?: ProcessingMode;
    /**
     * Enforces strict MongoDB compatibilty. See readme for differences. @default true.
     * When disabled, the $elemMatch projection operator returns all matching nested documents instead of only the first.
     */
    readonly useStrictMode?: boolean;
    /**
     * Enables or disables custom script execution.
     * When disabled, you cannot use operations that execute custom code, such as the $where, $accumulator, and $function.
     * @default true
     */
    readonly scriptEnabled?: boolean;
    /** Hash function to replace the somewhat weaker default implementation. */
    readonly hashFunction?: HashFunction;
    /** Function to resolve strings to arrays for use with operators that reference other collections such as; `$lookup`, `$out` and `$merge`. */
    readonly collectionResolver?: CollectionResolver;
    /** JSON schema validator to use with the '$jsonSchema' operator. This is required in order to use the operator. */
    readonly jsonSchemaValidator?: JsonSchemaValidator;
    /** Global variables. */
    readonly variables?: Readonly<RawObject>;
}
interface LocalData {
    /** The groupId computed for a group of documents. */
    readonly groupId?: AnyVal;
    /** Local user-defind variables. */
    readonly variables?: RawObject;
}
/** Custom type to facilitate type checking for global options */
export declare class ComputeOptions implements Options {
    readonly options?: Options;
    /** Reference to the root object when processing subgraphs of the object. */
    private _root?;
    private _local?;
    /** The current time in milliseconds. Remains the same throughout all stages of the aggregation pipeline. */
    readonly timestamp: number;
    private constructor();
    /**
     * Initialize new ComputeOptions. Returns the same object modified when the 'options' argument is a ComputeOptions.
     * @param options
     * @param root
     * @param local
     * @returns
     */
    static init(options?: Options, root?: AnyVal, local?: LocalData): ComputeOptions;
    /** Updates the internal mutable state. */
    update(root?: AnyVal, local?: LocalData): ComputeOptions;
    get root(): unknown;
    get local(): LocalData;
    get idKey(): string;
    get collation(): CollationSpec;
    get processingMode(): ProcessingMode;
    get useStrictMode(): boolean;
    get scriptEnabled(): boolean;
    get hashFunction(): HashFunction;
    get collectionResolver(): CollectionResolver;
    get jsonSchemaValidator(): JsonSchemaValidator;
    get variables(): Readonly<RawObject>;
}
/**
 * Creates an Option from another required keys are initialized
 * @param options Options
 */
export declare function initOptions(options?: Options): Options;
/**
 * The different groups of operators
 */
export declare enum OperatorType {
    ACCUMULATOR = "accumulator",
    EXPRESSION = "expression",
    PIPELINE = "pipeline",
    PROJECTION = "projection",
    QUERY = "query",
    WINDOW = "window"
}
export type AccumulatorOperator = (collection: RawArray, expr: AnyVal, options?: Options) => AnyVal;
export type ExpressionOperator = (obj: AnyVal, expr: AnyVal, options?: ComputeOptions) => AnyVal;
export type PipelineOperator = (collection: Iterator, expr: AnyVal, options?: Options) => Iterator;
export type ProjectionOperator = (obj: RawObject, expr: AnyVal, selector: string, options?: Options) => AnyVal;
export type QueryOperator = (selector: string, value: AnyVal, options?: Options) => (obj: RawObject) => boolean;
export type WindowOperator = (obj: RawObject, array: RawObject[], expr: {
    parentExpr: AnyVal;
    inputExpr: AnyVal;
    documentNumber: number;
    field: string;
}, options?: Options) => AnyVal;
type Operator = AccumulatorOperator | ExpressionOperator | PipelineOperator | ProjectionOperator | QueryOperator | WindowOperator;
/** Map of operator functions */
type OperatorMap = Record<string, Operator>;
/**
 * Register fully specified operators for the given operator class.
 *
 * @param type The operator type
 * @param operators Map of the operators
 */
export declare function useOperators(type: OperatorType, operators: OperatorMap): void;
/**
 * Returns the operator function or null if it is not found
 * @param type Type of operator
 * @param operator Name of the operator
 */
export declare function getOperator(type: OperatorType, operator: string): Callback<AnyVal> | null;
/**
 * Computes the value of the expression on the object for the given operator
 *
 * @param obj the current object from the collection
 * @param expr the expression for the given field
 * @param operator the operator to resolve the field with
 * @param options {Object} extra options
 * @returns {*}
 */
export declare function computeValue(obj: AnyVal, expr: AnyVal, operator?: string, options?: Options): AnyVal;
/**
 * Redact an object
 * @param  {Object} obj The object to redact
 * @param  {*} expr The redact expression
 * @param  {*} options  Options for value
 * @return {*} returns the result of the redacted object
 */
export declare function redact(obj: RawObject, expr: AnyVal, options: ComputeOptions): AnyVal;
export {};
