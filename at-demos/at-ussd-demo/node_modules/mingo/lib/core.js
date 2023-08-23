"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.redact = exports.computeValue = exports.getOperator = exports.useOperators = exports.OperatorType = exports.initOptions = exports.ComputeOptions = exports.ProcessingMode = void 0;
var util_1 = require("./util");
/**
 * This controls how input and output documents are processed to meet different application needs.
 * Each mode has different trade offs for; immutability, reference sharing, and performance.
 */
var ProcessingMode;
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
})(ProcessingMode = exports.ProcessingMode || (exports.ProcessingMode = {}));
/** Custom type to facilitate type checking for global options */
var ComputeOptions = /** @class */ (function () {
    function ComputeOptions(options, 
    /** Reference to the root object when processing subgraphs of the object. */
    _root, _local, 
    /** The current time in milliseconds. Remains the same throughout all stages of the aggregation pipeline. */
    timestamp) {
        if (timestamp === void 0) { timestamp = Date.now(); }
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
    ComputeOptions.init = function (options, root, local) {
        return options instanceof ComputeOptions
            ? options.update(
            // value can be '0' or 'false'
            (0, util_1.isNil)(options.root) ? root : options.root, Object.assign({}, options.local, local))
            : new ComputeOptions(options || initOptions(), root, local);
    };
    /** Updates the internal mutable state. */
    ComputeOptions.prototype.update = function (root, local) {
        // NOTE: this is done for efficiency to avoid creating too many intermediate options objects.
        this._root = root;
        this._local = local;
        return this;
    };
    Object.defineProperty(ComputeOptions.prototype, "root", {
        get: function () {
            return this._root;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ComputeOptions.prototype, "local", {
        get: function () {
            return this._local;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ComputeOptions.prototype, "idKey", {
        get: function () {
            var _a;
            return (_a = this.options) === null || _a === void 0 ? void 0 : _a.idKey;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ComputeOptions.prototype, "collation", {
        get: function () {
            var _a;
            return (_a = this.options) === null || _a === void 0 ? void 0 : _a.collation;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ComputeOptions.prototype, "processingMode", {
        get: function () {
            var _a;
            return ((_a = this.options) === null || _a === void 0 ? void 0 : _a.processingMode) || ProcessingMode.CLONE_OFF;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ComputeOptions.prototype, "useStrictMode", {
        get: function () {
            var _a;
            return (_a = this.options) === null || _a === void 0 ? void 0 : _a.useStrictMode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ComputeOptions.prototype, "scriptEnabled", {
        get: function () {
            var _a;
            return (_a = this.options) === null || _a === void 0 ? void 0 : _a.scriptEnabled;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ComputeOptions.prototype, "hashFunction", {
        get: function () {
            var _a;
            return (_a = this.options) === null || _a === void 0 ? void 0 : _a.hashFunction;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ComputeOptions.prototype, "collectionResolver", {
        get: function () {
            var _a;
            return (_a = this.options) === null || _a === void 0 ? void 0 : _a.collectionResolver;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ComputeOptions.prototype, "jsonSchemaValidator", {
        get: function () {
            var _a;
            return (_a = this.options) === null || _a === void 0 ? void 0 : _a.jsonSchemaValidator;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ComputeOptions.prototype, "variables", {
        get: function () {
            var _a;
            return (_a = this.options) === null || _a === void 0 ? void 0 : _a.variables;
        },
        enumerable: false,
        configurable: true
    });
    return ComputeOptions;
}());
exports.ComputeOptions = ComputeOptions;
/**
 * Creates an Option from another required keys are initialized
 * @param options Options
 */
function initOptions(options) {
    return Object.freeze(__assign({ idKey: "_id", scriptEnabled: true, useStrictMode: true, processingMode: ProcessingMode.CLONE_OFF }, options));
}
exports.initOptions = initOptions;
/**
 * The different groups of operators
 */
var OperatorType;
(function (OperatorType) {
    OperatorType["ACCUMULATOR"] = "accumulator";
    OperatorType["EXPRESSION"] = "expression";
    OperatorType["PIPELINE"] = "pipeline";
    OperatorType["PROJECTION"] = "projection";
    OperatorType["QUERY"] = "query";
    OperatorType["WINDOW"] = "window";
})(OperatorType = exports.OperatorType || (exports.OperatorType = {}));
// operator definitions
var OPERATORS = (_a = {},
    _a[OperatorType.ACCUMULATOR] = {},
    _a[OperatorType.EXPRESSION] = {},
    _a[OperatorType.PIPELINE] = {},
    _a[OperatorType.PROJECTION] = {},
    _a[OperatorType.QUERY] = {},
    _a[OperatorType.WINDOW] = {},
    _a);
/**
 * Register fully specified operators for the given operator class.
 *
 * @param type The operator type
 * @param operators Map of the operators
 */
function useOperators(type, operators) {
    for (var _i = 0, _a = Object.entries(operators); _i < _a.length; _i++) {
        var _b = _a[_i], name_1 = _b[0], fn = _b[1];
        (0, util_1.assert)(fn instanceof Function && (0, util_1.isOperator)(name_1), "'".concat(name_1, "' is not a valid operator"));
        var currentFn = getOperator(type, name_1);
        (0, util_1.assert)(!currentFn || fn === currentFn, "".concat(name_1, " already exists for '").concat(type, "' operators. Cannot change operator function once registered."));
    }
    // toss the operator salad :)
    (0, util_1.into)(OPERATORS[type], operators);
}
exports.useOperators = useOperators;
/**
 * Returns the operator function or null if it is not found
 * @param type Type of operator
 * @param operator Name of the operator
 */
function getOperator(type, operator) {
    return OPERATORS[type][operator];
}
exports.getOperator = getOperator;
/* eslint-disable unused-imports/no-unused-vars-ts */
/**
 * Implementation of system variables
 * @type {Object}
 */
var systemVariables = {
    $$ROOT: function (obj, expr, options) {
        return options.root;
    },
    $$CURRENT: function (obj, expr, options) {
        return obj;
    },
    $$REMOVE: function (obj, expr, options) {
        return undefined;
    },
    $$NOW: function (obj, expr, options) {
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
var redactVariables = {
    $$KEEP: function (obj, expr, options) {
        return obj;
    },
    $$PRUNE: function (obj, expr, options) {
        return undefined;
    },
    $$DESCEND: function (obj, expr, options) {
        // traverse nested documents iff there is a $cond
        if (!(0, util_1.has)(expr, "$cond"))
            return obj;
        var result;
        for (var _i = 0, _a = Object.entries(obj); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], current = _b[1];
            if ((0, util_1.isObjectLike)(current)) {
                if (current instanceof Array) {
                    var array = [];
                    for (var _c = 0, current_1 = current; _c < current_1.length; _c++) {
                        var elem = current_1[_c];
                        if ((0, util_1.isObject)(elem)) {
                            elem = redact(elem, expr, options.update(elem));
                        }
                        if (!(0, util_1.isNil)(elem)) {
                            array.push(elem);
                        }
                    }
                    result = array;
                }
                else {
                    result = redact(current, expr, options.update(current));
                }
                if ((0, util_1.isNil)(result)) {
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
function computeValue(obj, expr, operator, options) {
    var _a;
    // ensure valid options exist on first invocation
    var copts = ComputeOptions.init(options, obj);
    if ((0, util_1.isOperator)(operator)) {
        // if the field of the object is a valid operator
        var callExpression = getOperator(OperatorType.EXPRESSION, operator);
        if (callExpression)
            return callExpression(obj, expr, copts);
        // we also handle $group accumulator operators
        var callAccumulator = getOperator(OperatorType.ACCUMULATOR, operator);
        if (callAccumulator) {
            // if object is not an array, first try to compute using the expression
            if (!(obj instanceof Array)) {
                obj = computeValue(obj, expr, null, copts);
                expr = null;
            }
            // validate that we have an array
            (0, util_1.assert)(obj instanceof Array, "'".concat(operator, "' target must be an array."));
            // for accumulators, we use the global options since the root is specific to each element within array.
            return callAccumulator(obj, expr, 
            // reset the root object for accumulators.
            copts.update(null, copts.local));
        }
        // operator was not found
        throw new Error("operator '".concat(operator, "' is not registered"));
    }
    // if expr is a string and begins with "$$", then we have a variable.
    //  this can be one of; redact variable, system variable, user-defined variable.
    //  we check and process them in that order.
    //
    // if expr begins only a single "$", then it is a path to a field on the object.
    if ((0, util_1.isString)(expr) && expr.length > 0 && expr[0] === "$") {
        // we return redact variables as literals
        if ((0, util_1.has)(redactVariables, expr)) {
            return expr;
        }
        // default to root for resolving path.
        var context = copts.root;
        // handle selectors with explicit prefix
        var arr = expr.split(".");
        if ((0, util_1.has)(systemVariables, arr[0])) {
            // set 'root' only the first time it is required to be used for all subsequent calls
            // if it already available on the options, it will be used
            context = systemVariables[arr[0]](obj, null, copts);
            expr = expr.slice(arr[0].length + 1); //  +1 for '.'
        }
        else if (arr[0].slice(0, 2) === "$$") {
            // handle user-defined variables
            context = Object.assign({}, copts.variables, // global vars
            // current item is added before local variables because the binding may be changed.
            { this: obj }, (_a = copts.local) === null || _a === void 0 ? void 0 : _a.variables // local vars
            );
            var prefix = arr[0].slice(2);
            (0, util_1.assert)((0, util_1.has)(context, prefix), "Use of undefined variable: ".concat(prefix));
            expr = expr.slice(2);
        }
        else {
            // 'expr' is a path to a field on the object.
            expr = expr.slice(1);
        }
        if (expr === "")
            return context;
        return (0, util_1.resolve)(context, expr);
    }
    // check and return value if already in a resolved state
    if (expr instanceof Array) {
        return expr.map(function (item) {
            return computeValue(obj, item, null, copts);
        });
    }
    else if ((0, util_1.isObject)(expr)) {
        var result = {};
        var _loop_1 = function (key, val) {
            result[key] = computeValue(obj, val, key, copts);
            // must run ONLY one aggregate operator per expression
            // if so, return result of the computed value
            if ([OperatorType.EXPRESSION, OperatorType.ACCUMULATOR].some(function (c) {
                return (0, util_1.has)(OPERATORS[c], key);
            })) {
                // there should be only one operator
                (0, util_1.assert)(Object.keys(expr).length === 1, "Invalid aggregation expression '" + JSON.stringify(expr) + "'");
                return { value: result[key] };
            }
        };
        for (var _i = 0, _b = Object.entries(expr); _i < _b.length; _i++) {
            var _c = _b[_i], key = _c[0], val = _c[1];
            var state_1 = _loop_1(key, val);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        return result;
    }
    return expr;
}
exports.computeValue = computeValue;
/**
 * Redact an object
 * @param  {Object} obj The object to redact
 * @param  {*} expr The redact expression
 * @param  {*} options  Options for value
 * @return {*} returns the result of the redacted object
 */
function redact(obj, expr, options) {
    var result = computeValue(obj, expr, null, options);
    return (0, util_1.has)(redactVariables, result)
        ? redactVariables[result](obj, expr, options)
        : result;
}
exports.redact = redact;
