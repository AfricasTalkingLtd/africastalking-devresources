"use strict";
/**
 * Predicates used for Query and Expression operators.
 */
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.$type = exports.$elemMatch = exports.$size = exports.$all = exports.$exists = exports.$regex = exports.$mod = exports.$gte = exports.$gt = exports.$lte = exports.$lt = exports.$nin = exports.$in = exports.$ne = exports.$eq = exports.createExpressionOperator = exports.createQueryOperator = void 0;
var core_1 = require("../core");
var query_1 = require("../query");
var util_1 = require("../util");
/**
 * Returns a query operator created from the predicate
 *
 * @param predicate Predicate function
 */
function createQueryOperator(predicate) {
    return function (selector, value, options) {
        var opts = { unwrapArray: true };
        var depth = Math.max(1, selector.split(".").length - 1);
        return function (obj) {
            // value of field must be fully resolved.
            var lhs = (0, util_1.resolve)(obj, selector, opts);
            return predicate(lhs, value, __assign(__assign({}, options), { depth: depth }));
        };
    };
}
exports.createQueryOperator = createQueryOperator;
/**
 * Returns an expression operator created from the predicate
 *
 * @param predicate Predicate function
 */
function createExpressionOperator(predicate) {
    return function (obj, expr, options) {
        var args = (0, core_1.computeValue)(obj, expr, null, options);
        return predicate.apply(void 0, args);
    };
}
exports.createExpressionOperator = createExpressionOperator;
/**
 * Checks that two values are equal.
 *
 * @param a         The lhs operand as resolved from the object by the given selector
 * @param b         The rhs operand provided by the user
 * @returns {*}
 */
function $eq(a, b, options) {
    // start with simple equality check
    if ((0, util_1.isEqual)(a, b))
        return true;
    // https://docs.mongodb.com/manual/tutorial/query-for-null-fields/
    if ((0, util_1.isNil)(a) && (0, util_1.isNil)(b))
        return true;
    // check
    if (a instanceof Array) {
        var eq = util_1.isEqual.bind(null, b);
        return a.some(eq) || (0, util_1.flatten)(a, options === null || options === void 0 ? void 0 : options.depth).some(eq);
    }
    return false;
}
exports.$eq = $eq;
/**
 * Matches all values that are not equal to the value specified in the query.
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
function $ne(a, b, options) {
    return !$eq(a, b, options);
}
exports.$ne = $ne;
/**
 * Matches any of the values that exist in an array specified in the query.
 *
 * @param a
 * @param b
 * @returns {*}
 */
function $in(a, b, options) {
    // queries for null should be able to find undefined fields
    if ((0, util_1.isNil)(a))
        return b.some(function (v) { return v === null; });
    return (0, util_1.intersection)([(0, util_1.ensureArray)(a), b], options === null || options === void 0 ? void 0 : options.hashFunction).length > 0;
}
exports.$in = $in;
/**
 * Matches values that do not exist in an array specified to the query.
 *
 * @param a
 * @param b
 * @returns {*|boolean}
 */
function $nin(a, b, options) {
    return !$in(a, b, options);
}
exports.$nin = $nin;
/**
 * Matches values that are less than the value specified in the query.
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
function $lt(a, b, options) {
    return compare(a, b, function (x, y) { return x < y; });
}
exports.$lt = $lt;
/**
 * Matches values that are less than or equal to the value specified in the query.
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
function $lte(a, b, options) {
    return compare(a, b, function (x, y) { return x <= y; });
}
exports.$lte = $lte;
/**
 * Matches values that are greater than the value specified in the query.
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
function $gt(a, b, options) {
    return compare(a, b, function (x, y) { return x > y; });
}
exports.$gt = $gt;
/**
 * Matches values that are greater than or equal to the value specified in the query.
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
function $gte(a, b, options) {
    return compare(a, b, function (x, y) { return x >= y; });
}
exports.$gte = $gte;
/**
 * Performs a modulo operation on the value of a field and selects documents with a specified result.
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
function $mod(a, b, options) {
    return (0, util_1.ensureArray)(a).some(function (x) { return b.length === 2 && x % b[0] === b[1]; });
}
exports.$mod = $mod;
/**
 * Selects documents where values match a specified regular expression.
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
function $regex(a, b, options) {
    var lhs = (0, util_1.ensureArray)(a);
    var match = function (x) { return (0, util_1.isString)(x) && !!b.exec(x); };
    return lhs.some(match) || (0, util_1.flatten)(lhs, 1).some(match);
}
exports.$regex = $regex;
/**
 * Matches documents that have the specified field.
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
function $exists(a, b, options) {
    return (((b === false || b === 0) && a === undefined) ||
        ((b === true || b === 1) && a !== undefined));
}
exports.$exists = $exists;
/**
 * Matches arrays that contain all elements specified in the query.
 *
 * @param values
 * @param queries
 * @returns boolean
 */
function $all(values, queries, options) {
    if (!(0, util_1.isArray)(values) ||
        !(0, util_1.isArray)(queries) ||
        !values.length ||
        !queries.length) {
        return false;
    }
    var matched = true;
    var _loop_1 = function (query) {
        // no need to check all the queries.
        if (!matched)
            return "break";
        if ((0, util_1.isObject)(query) && (0, util_1.inArray)(Object.keys(query), "$elemMatch")) {
            matched = $elemMatch(values, query["$elemMatch"], options);
        }
        else if (query instanceof RegExp) {
            matched = values.some(function (s) { return typeof s === "string" && query.test(s); });
        }
        else {
            matched = values.some(function (v) { return (0, util_1.isEqual)(query, v); });
        }
    };
    for (var _i = 0, queries_1 = queries; _i < queries_1.length; _i++) {
        var query = queries_1[_i];
        var state_1 = _loop_1(query);
        if (state_1 === "break")
            break;
    }
    return matched;
}
exports.$all = $all;
/**
 * Selects documents if the array field is a specified size.
 *
 * @param a
 * @param b
 * @returns {*|boolean}
 */
function $size(a, b, options) {
    return a.length === b;
}
exports.$size = $size;
function isNonBooleanOperator(name) {
    return (0, util_1.isOperator)(name) && ["$and", "$or", "$nor"].indexOf(name) === -1;
}
/**
 * Selects documents if element in the array field matches all the specified $elemMatch condition.
 *
 * @param a {Array} element to match against
 * @param b {Object} subquery
 */
function $elemMatch(a, b, options) {
    // should return false for non-matching input
    if ((0, util_1.isArray)(a) && !(0, util_1.isEmpty)(a)) {
        var format = function (x) { return x; };
        var criteria = b;
        // If we find a boolean operator in the subquery, we fake a field to point to it. This is an
        // attempt to ensure that it is a valid criteria. We cannot make this substitution for operators
        // like $and/$or/$nor; as otherwise, this faking will break our query.
        if (Object.keys(b).every(isNonBooleanOperator)) {
            criteria = { temp: b };
            format = function (x) { return ({ temp: x }); };
        }
        var query = new query_1.Query(criteria, options);
        for (var i = 0, len = a.length; i < len; i++) {
            if (query.test(format(a[i]))) {
                return true;
            }
        }
    }
    return false;
}
exports.$elemMatch = $elemMatch;
// helper functions
var isNull = function (a) { return a === null; };
var isInt = function (a) {
    return (0, util_1.isNumber)(a) &&
        a >= util_1.MIN_INT &&
        a <= util_1.MAX_INT &&
        a.toString().indexOf(".") === -1;
};
var isLong = function (a) {
    return (0, util_1.isNumber)(a) &&
        a >= util_1.MIN_LONG &&
        a <= util_1.MAX_LONG &&
        a.toString().indexOf(".") === -1;
};
/** Mapping of type to predicate */
var compareFuncs = {
    array: util_1.isArray,
    bool: util_1.isBoolean,
    boolean: util_1.isBoolean,
    date: util_1.isDate,
    decimal: util_1.isNumber,
    double: util_1.isNumber,
    int: isInt,
    long: isLong,
    number: util_1.isNumber,
    null: isNull,
    object: util_1.isObject,
    regex: util_1.isRegExp,
    regexp: util_1.isRegExp,
    string: util_1.isString,
    // added for completeness
    undefined: util_1.isNil,
    function: function (_) {
        throw new Error("unsupported type key `function`.");
    },
    // Mongo identifiers
    1: util_1.isNumber,
    2: util_1.isString,
    3: util_1.isObject,
    4: util_1.isArray,
    6: util_1.isNil,
    8: util_1.isBoolean,
    9: util_1.isDate,
    10: isNull,
    11: util_1.isRegExp,
    16: isInt,
    18: isLong,
    19: util_1.isNumber, //decimal
};
/**
 * Selects documents if a field is of the specified type.
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
function compareType(a, b, _) {
    var f = compareFuncs[b];
    return f ? f(a) : false;
}
/**
 * Selects documents if a field is of the specified type.
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
function $type(a, b, options) {
    return Array.isArray(b)
        ? b.findIndex(function (t) { return compareType(a, t, options); }) >= 0
        : compareType(a, b, options);
}
exports.$type = $type;
function compare(a, b, f) {
    return (0, util_1.ensureArray)(a).some(function (x) { return (0, util_1.getType)(x) === (0, util_1.getType)(b) && f(x, b); });
}
