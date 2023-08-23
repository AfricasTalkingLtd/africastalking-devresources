import { assert, has, into, isNil, isObject, isObjectLike, isOperator, isString, resolve, } from "./util";
/**
 * This controls how input and output documents are processed to meet different application needs.
 * Each mode has different trade offs for; immutability, reference sharing, and performance.
 */
export var ProcessingMode;
(function (ProcessingMode) {
    /**
     * Clone inputs prior to processing, and the outputs if some objects graphs may be shared.
     * Use this option to keep input collection immutable and to get distinct output objects.
     *
     * Note: This option is expensive and reduces performance.
     */
    ProcessingMode["CLONE_ALL"] = "CLONE_ALL";
    /**
     * Clones inputs prior to processing.
     * This option will return output objects with shared graphs in their path if specific operators are used.
     * Use this option to keep the input collection immutable.
     *
     */
    ProcessingMode["CLONE_INPUT"] = "CLONE_INPUT";
    /**
     * Clones the output to return distinct objects with no shared paths.
     * This option modifies the input collection and during processing.
     */
    ProcessingMode["CLONE_OUTPUT"] = "CLONE_OUTPUT";
    /**
     * Turn off cloning and modifies the input collection as needed.
     * This option will also return output objects with shared paths in their graph when specific operators are used.
     *
     * This option provides the greatest speedup for the biggest tradeoff. When using the aggregation pipeline, you can use
     * the "$out" operator to collect immutable intermediate results.
     *
     * @default
     */
    ProcessingMode["CLONE_OFF"] = "CLONE_OFF";
})(ProcessingMode || (ProcessingMode = {}));
/** Custom type to facilitate type checking for global options */
export class ComputeOptions {
    options;
    _root;
    _local;
    timestamp;
    constructor(options, 
    /** Reference to the root object when processing subgraphs of the object. */
    _root, _local, 
    /** The current time in milliseconds. Remains the same throughout all stages of the aggregation pipeline. */
    timestamp = Date.now()) {
        this.options = options;
        this._root = _root;
        this._local = _local;
        this.timestamp = timestamp;
        this.options = options;
        this.update(_root, _local);
    }
    /**
     * Initialize new ComputeOptions. Returns the same object modified when the 'options' argument is a ComputeOptions.
     * @param options
     * @param root
     * @param local
     * @returns
     */
    static init(options, root, local) {
        return options instanceof ComputeOptions
            ? options.update(
            // value can be '0' or 'false'
            isNil(options.root) ? root : options.root, Object.assign({}, options.local, local))
            : new ComputeOptions(options || initOptions(), root, local);
    }
    /** Updates the internal mutable state. */
    update(root, local) {
        // NOTE: this is done for efficiency to avoid creating too many intermediate options objects.
        this._root = root;
        this._local = local;
        return this;
    }
    get root() {
        return this._root;
    }
    get local() {
        return this._local;
    }
    get idKey() {
        return this.options?.idKey;
    }
    get collation() {
        return this.options?.collation;
    }
    get processingMode() {
        return this.options?.processingMode || ProcessingMode.CLONE_OFF;
    }
    get useStrictMode() {
        return this.options?.useStrictMode;
    }
    get scriptEnabled() {
        return this.options?.scriptEnabled;
    }
    get hashFunction() {
        return this.options?.hashFunction;
    }
    get collectionResolver() {
        return this.options?.collectionResolver;
    }
    get jsonSchemaValidator() {
        return this.options?.jsonSchemaValidator;
    }
    get variables() {
        return this.options?.variables;
    }
}
/**
 * Creates an Option from another required keys are initialized
 * @param options Options
 */
export function initOptions(options) {
    return Object.freeze({
        idKey: "_id",
        scriptEnabled: true,
        useStrictMode: true,
        processingMode: ProcessingMode.CLONE_OFF,
        ...options,
    });
}
/**
 * The different groups of operators
 */
export var OperatorType;
(function (OperatorType) {
    OperatorType["ACCUMULATOR"] = "accumulator";
    OperatorType["EXPRESSION"] = "expression";
    OperatorType["PIPELINE"] = "pipeline";
    OperatorType["PROJECTION"] = "projection";
    OperatorType["QUERY"] = "query";
    OperatorType["WINDOW"] = "window";
})(OperatorType || (OperatorType = {}));
// operator definitions
const OPERATORS = {
    [OperatorType.ACCUMULATOR]: {},
    [OperatorType.EXPRESSION]: {},
    [OperatorType.PIPELINE]: {},
    [OperatorType.PROJECTION]: {},
    [OperatorType.QUERY]: {},
    [OperatorType.WINDOW]: {},
};
/**
 * Register fully specified operators for the given operator class.
 *
 * @param type The operator type
 * @param operators Map of the operators
 */
export function useOperators(type, operators) {
    for (const [name, fn] of Object.entries(operators)) {
        assert(fn instanceof Function && isOperator(name), `'${name}' is not a valid operator`);
        const currentFn = getOperator(type, name);
        assert(!currentFn || fn === currentFn, `${name} already exists for '${type}' operators. Cannot change operator function once registered.`);
    }
    // toss the operator salad :)
    into(OPERATORS[type], operators);
}
/**
 * Returns the operator function or null if it is not found
 * @param type Type of operator
 * @param operator Name of the operator
 */
export function getOperator(type, operator) {
    return OPERATORS[type][operator];
}
/* eslint-disable unused-imports/no-unused-vars-ts */
/**
 * Implementation of system variables
 * @type {Object}
 */
const systemVariables = {
    $$ROOT(obj, expr, options) {
        return options.root;
    },
    $$CURRENT(obj, expr, options) {
        return obj;
    },
    $$REMOVE(obj, expr, options) {
        return undefined;
    },
    $$NOW(obj, expr, options) {
        return new Date(options.timestamp);
    },
};
/**
 * Implementation of $redact variables
 *
 * Each function accepts 3 arguments (obj, expr, options)
 *
 * @type {Object}
 */
const redactVariables = {
    $$KEEP(obj, expr, options) {
        return obj;
    },
    $$PRUNE(obj, expr, options) {
        return undefined;
    },
    $$DESCEND(obj, expr, options) {
        // traverse nested documents iff there is a $cond
        if (!has(expr, "$cond"))
            return obj;
        let result;
        for (const [key, current] of Object.entries(obj)) {
            if (isObjectLike(current)) {
                if (current instanceof Array) {
                    const array = [];
                    for (let elem of current) {
                        if (isObject(elem)) {
                            elem = redact(elem, expr, options.update(elem));
                        }
                        if (!isNil(elem)) {
                            array.push(elem);
                        }
                    }
                    result = array;
                }
                else {
                    result = redact(current, expr, options.update(current));
                }
                if (isNil(result)) {
                    delete obj[key]; // pruned result
                }
                else {
                    obj[key] = result;
                }
            }
        }
        return obj;
    },
};
/* eslint-enable unused-imports/no-unused-vars-ts */
/**
 * Computes the value of the expression on the object for the given operator
 *
 * @param obj the current object from the collection
 * @param expr the expression for the given field
 * @param operator the operator to resolve the field with
 * @param options {Object} extra options
 * @returns {*}
 */
export function computeValue(obj, expr, operator, options) {
    // ensure valid options exist on first invocation
    const copts = ComputeOptions.init(options, obj);
    if (isOperator(operator)) {
        // if the field of the object is a valid operator
        const callExpression = getOperator(OperatorType.EXPRESSION, operator);
        if (callExpression)
            return callExpression(obj, expr, copts);
        // we also handle $group accumulator operators
        const callAccumulator = getOperator(OperatorType.ACCUMULATOR, operator);
        if (callAccumulator) {
            // if object is not an array, first try to compute using the expression
            if (!(obj instanceof Array)) {
                obj = computeValue(obj, expr, null, copts);
                expr = null;
            }
            // validate that we have an array
            assert(obj instanceof Array, `'${operator}' target must be an array.`);
            // for accumulators, we use the global options since the root is specific to each element within array.
            return callAccumulator(obj, expr, 
            // reset the root object for accumulators.
            copts.update(null, copts.local));
        }
        // operator was not found
        throw new Error(`operator '${operator}' is not registered`);
    }
    // if expr is a string and begins with "$$", then we have a variable.
    //  this can be one of; redact variable, system variable, user-defined variable.
    //  we check and process them in that order.
    //
    // if expr begins only a single "$", then it is a path to a field on the object.
    if (isString(expr) && expr.length > 0 && expr[0] === "$") {
        // we return redact variables as literals
        if (has(redactVariables, expr)) {
            return expr;
        }
        // default to root for resolving path.
        let context = copts.root;
        // handle selectors with explicit prefix
        const arr = expr.split(".");
        if (has(systemVariables, arr[0])) {
            // set 'root' only the first time it is required to be used for all subsequent calls
            // if it already available on the options, it will be used
            context = systemVariables[arr[0]](obj, null, copts);
            expr = expr.slice(arr[0].length + 1); //  +1 for '.'
        }
        else if (arr[0].slice(0, 2) === "$$") {
            // handle user-defined variables
            context = Object.assign({}, copts.variables, // global vars
            // current item is added before local variables because the binding may be changed.
            { this: obj }, copts.local?.variables // local vars
            );
            const prefix = arr[0].slice(2);
            assert(has(context, prefix), `Use of undefined variable: ${prefix}`);
            expr = expr.slice(2);
        }
        else {
            // 'expr' is a path to a field on the object.
            expr = expr.slice(1);
        }
        if (expr === "")
            return context;
        return resolve(context, expr);
    }
    // check and return value if already in a resolved state
    if (expr instanceof Array) {
        return expr.map((item) => computeValue(obj, item, null, copts));
    }
    else if (isObject(expr)) {
        const result = {};
        for (const [key, val] of Object.entries(expr)) {
            result[key] = computeValue(obj, val, key, copts);
            // must run ONLY one aggregate operator per expression
            // if so, return result of the computed value
            if ([OperatorType.EXPRESSION, OperatorType.ACCUMULATOR].some((c) => has(OPERATORS[c], key))) {
                // there should be only one operator
                assert(Object.keys(expr).length === 1, "Invalid aggregation expression '" + JSON.stringify(expr) + "'");
                return result[key];
            }
        }
        return result;
    }
    return expr;
}
/**
 * Redact an object
 * @param  {Object} obj The object to redact
 * @param  {*} expr The redact expression
 * @param  {*} options  Options for value
 * @return {*} returns the result of the redacted object
 */
export function redact(obj, expr, options) {
    const result = computeValue(obj, expr, null, options);
    return has(redactVariables, result)
        ? redactVariables[result](obj, expr, options)
        : result;
}
