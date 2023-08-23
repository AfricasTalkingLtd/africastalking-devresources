"use strict";
/**
 * Utility constants and functions
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
exports.normalize = exports.isOperator = exports.removeValue = exports.setValue = exports.filterMissing = exports.resolveGraph = exports.resolve = exports.memoize = exports.into = exports.groupBy = exports.sortBy = exports.hashCode = exports.stringify = exports.unique = exports.isEqual = exports.flatten = exports.intersection = exports.merge = exports.objectMap = exports.has = exports.ensureArray = exports.isMissing = exports.isEmpty = exports.truthy = exports.notInArray = exports.inArray = exports.isNil = exports.isFunction = exports.isRegExp = exports.isDate = exports.isObjectLike = exports.isObject = exports.isArray = exports.isNumber = exports.isString = exports.isBoolean = exports.getType = exports.cloneDeep = exports.assert = exports.DEFAULT_COMPARATOR = exports.MIN_LONG = exports.MAX_LONG = exports.MIN_INT = exports.MAX_INT = void 0;
exports.MAX_INT = 2147483647;
exports.MIN_INT = -2147483648;
exports.MAX_LONG = Number.MAX_SAFE_INTEGER;
exports.MIN_LONG = Number.MIN_SAFE_INTEGER;
// special value to identify missing items. treated differently from undefined
var MISSING = Symbol("missing");
/**
 * Uses the simple hash method as described in Effective Java.
 * @see https://stackoverflow.com/a/113600/1370481
 * @param value The value to hash
 * @returns {number}
 */
var DEFAULT_HASH_FUNCTION = function (value) {
    var s = stringify(value);
    var hash = 0;
    var i = s.length;
    while (i)
        hash = ((hash << 5) - hash) ^ s.charCodeAt(--i);
    return hash >>> 0;
};
// no array, object, or function types
var JS_SIMPLE_TYPES = new Set([
    "null",
    "undefined",
    "boolean",
    "number",
    "string",
    "date",
    "regexp",
]);
/** MongoDB sort comparison order. https://www.mongodb.com/docs/manual/reference/bson-type-comparison-order */
var SORT_ORDER_BY_TYPE = {
    null: 0,
    undefined: 0,
    number: 1,
    string: 2,
    object: 3,
    array: 4,
    boolean: 5,
    date: 6,
    regexp: 7,
    function: 8,
};
/**
 * Compare function which adheres to MongoDB comparison order.
 *
 * @param a The first value
 * @param b The second value
 * @returns {Number}
 */
var DEFAULT_COMPARATOR = function (a, b) {
    if (a === MISSING)
        a = undefined;
    if (b === MISSING)
        b = undefined;
    var u = SORT_ORDER_BY_TYPE[getType(a).toLowerCase()];
    var v = SORT_ORDER_BY_TYPE[getType(b).toLowerCase()];
    if (u !== v)
        return u - v;
    if (a < b)
        return -1;
    if (a > b)
        return 1;
    return 0;
};
exports.DEFAULT_COMPARATOR = DEFAULT_COMPARATOR;
var OBJECT_PROTOTYPE = Object.getPrototypeOf({});
var OBJECT_TAG = "[object Object]";
var OBJECT_TYPE_RE = /^\[object ([a-zA-Z0-9]+)\]$/;
function assert(condition, message) {
    if (!condition)
        throw new Error(message);
}
exports.assert = assert;
/**
 * Deep clone an object
 */
function cloneDeep(obj) {
    if (obj instanceof Array)
        return obj.map(cloneDeep);
    if (obj instanceof Date)
        return new Date(obj);
    if (isObject(obj))
        return objectMap(obj, cloneDeep);
    return obj;
}
exports.cloneDeep = cloneDeep;
/**
 * Returns the name of type as specified in the tag returned by a call to Object.prototype.toString
 * @param v A value
 */
function getType(v) {
    return OBJECT_TYPE_RE.exec(Object.prototype.toString.call(v))[1];
}
exports.getType = getType;
function isBoolean(v) {
    return typeof v === "boolean";
}
exports.isBoolean = isBoolean;
function isString(v) {
    return typeof v === "string";
}
exports.isString = isString;
function isNumber(v) {
    return !isNaN(v) && typeof v === "number";
}
exports.isNumber = isNumber;
exports.isArray = Array.isArray;
function isObject(v) {
    if (!v)
        return false;
    var proto = Object.getPrototypeOf(v);
    return ((proto === OBJECT_PROTOTYPE || proto === null) &&
        OBJECT_TAG === Object.prototype.toString.call(v));
}
exports.isObject = isObject;
function isObjectLike(v) {
    return v === Object(v);
} // objects, arrays, functions, date, custom object
exports.isObjectLike = isObjectLike;
function isDate(v) {
    return v instanceof Date;
}
exports.isDate = isDate;
function isRegExp(v) {
    return v instanceof RegExp;
}
exports.isRegExp = isRegExp;
function isFunction(v) {
    return typeof v === "function";
}
exports.isFunction = isFunction;
function isNil(v) {
    return v === null || v === undefined;
}
exports.isNil = isNil;
function inArray(arr, item) {
    return arr.includes(item);
}
exports.inArray = inArray;
function notInArray(arr, item) {
    return !inArray(arr, item);
}
exports.notInArray = notInArray;
function truthy(arg) {
    return !!arg;
}
exports.truthy = truthy;
function isEmpty(x) {
    return (isNil(x) ||
        (isString(x) && !x) ||
        (x instanceof Array && x.length === 0) ||
        (isObject(x) && Object.keys(x).length === 0));
}
exports.isEmpty = isEmpty;
function isMissing(m) {
    return m === MISSING;
}
exports.isMissing = isMissing;
// ensure a value is an array or wrapped within one
function ensureArray(x) {
    return x instanceof Array ? x : [x];
}
exports.ensureArray = ensureArray;
function has(obj, prop) {
    return !!obj && Object.prototype.hasOwnProperty.call(obj, prop);
}
exports.has = has;
/**
 * Transform values in an object
 *
 * @param  {Object}   obj   An object whose values to transform
 * @param  {Function} fn The transform function
 * @return {Array|Object} Result object after applying the transform
 */
function objectMap(obj, fn) {
    var o = {};
    var objKeys = Object.keys(obj);
    for (var i = 0; i < objKeys.length; i++) {
        var k = objKeys[i];
        o[k] = fn(obj[k], k);
    }
    return o;
}
exports.objectMap = objectMap;
/**
 * Deep merge objects or arrays.
 * When the inputs have unmergeable types, the source value (right hand side) is returned.
 * If inputs are arrays of same length and all elements are mergable, elements in the same position are merged together.
 * If AnyVal of the elements are unmergeable, elements in the source are appended to the target.
 * @param target {Object|Array} the target to merge into
 * @param obj {Object|Array} the source object
 */
function merge(target, obj, options) {
    // take care of missing inputs
    if (isMissing(target))
        return obj;
    if (isMissing(obj))
        return target;
    var inputs = [target, obj];
    if (!(inputs.every(isObject) || inputs.every(exports.isArray))) {
        throw Error("mismatched types. must both be array or object");
    }
    // default options
    options = options || { flatten: false };
    if ((0, exports.isArray)(target)) {
        var result = target;
        var input = obj;
        if (options.flatten) {
            var i = 0;
            var j = 0;
            while (i < result.length && j < input.length) {
                result[i] = merge(result[i++], input[j++], options);
            }
            while (j < input.length) {
                result.push(obj[j++]);
            }
        }
        else {
            into(result, input);
        }
    }
    else {
        Object.keys(obj).forEach(function (k) {
            if (has(obj, k)) {
                if (has(target, k)) {
                    target[k] = merge(target[k], obj[k], options);
                }
                else {
                    target[k] = obj[k];
                }
            }
        });
    }
    return target;
}
exports.merge = merge;
function addIndex(root, key, index) {
    if (root.key < key) {
        if (root.right) {
            addIndex(root.right, key, index);
        }
        else {
            root.right = { key: key, indexes: [index] };
        }
    }
    else if (root.key > key) {
        if (root.left) {
            addIndex(root.left, key, index);
        }
        else {
            root.left = { key: key, indexes: [index] };
        }
    }
    else {
        root.indexes.push(index);
    }
}
function getIndexes(root, key) {
    if (root.key == key) {
        return root.indexes;
    }
    else if (root.key < key) {
        return root.right ? getIndexes(root.right, key) : undefined;
    }
    else if (root.key > key) {
        return root.left ? getIndexes(root.left, key) : undefined;
    }
    return undefined;
}
/**
 * Returns the intersection of multiple arrays.
 *
 * @param  {Array} a The first array
 * @param  {Array} b The second array
 * @param  {Function} hashFunction Custom function to hash values, default the hashCode method
 * @return {Array}    Result array
 */
function intersection(input, hashFunction) {
    if (hashFunction === void 0) { hashFunction = DEFAULT_HASH_FUNCTION; }
    // if any array is empty, there is no intersection
    if (input.some(function (arr) { return arr.length == 0; }))
        return [];
    // sort input arrays by size
    var sortedIndex = input.map(function (a, i) { return [i, a.length]; });
    sortedIndex.sort(function (a, b) { return a[1] - b[1]; });
    // matched items index of first array for all other arrays.
    var result = [];
    var smallestArray = input[sortedIndex[0][0]];
    var root = {
        key: hashCode(smallestArray[0], hashFunction),
        indexes: [0],
    };
    for (var i = 1; i < smallestArray.length; i++) {
        var val = smallestArray[i];
        var h = hashCode(val, hashFunction);
        addIndex(root, h, i);
    }
    var maxResultSize = sortedIndex[0][1];
    var orderedIndexes = [];
    var _loop_1 = function (i) {
        var arrayIndex = sortedIndex[i][0];
        var data = input[arrayIndex];
        // number of matched items
        var size = 0;
        var _loop_2 = function (j) {
            var h = hashCode(data[j], hashFunction);
            var indexes = getIndexes(root, h);
            // not included.
            if (!indexes)
                return "continue";
            // check items equality to mitigate hash collisions and select the matching index.
            var idx = indexes
                .map(function (n) { return smallestArray[n]; })
                .findIndex(function (v) { return isEqual(v, data[j]); });
            // not included
            if (idx == -1)
                return "continue";
            // item matched. ensure map exist for marking index
            if (result.length < i)
                result.push({});
            // map to index of the actual value and set position
            result[result.length - 1][indexes[idx]] = true;
            // if we have seen max result items we can stop.
            size = Object.keys(result[result.length - 1]).length;
            // ensure stabilty
            if (arrayIndex == 0) {
                if (orderedIndexes.indexOf(indexes[idx]) == -1) {
                    orderedIndexes.push(indexes[idx]);
                }
            }
        };
        for (var j = 0; j < data.length; j++) {
            _loop_2(j);
        }
        // no intersection if nothing found
        if (size == 0)
            return { value: [] };
        // new max result size
        maxResultSize = Math.min(maxResultSize, size);
    };
    for (var i = 1; i < sortedIndex.length; i++) {
        var state_1 = _loop_1(i);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    var freq = {};
    // count occurrences
    result.forEach(function (m) {
        Object.keys(m).forEach(function (k) {
            var n = parseFloat(k);
            freq[n] = freq[n] || 0;
            freq[n]++;
        });
    });
    var keys = orderedIndexes;
    if (keys.length == 0) {
        // note: cannot use parseInt due to second argument for radix.
        keys.push.apply(keys, Object.keys(freq).map(parseFloat));
        keys.sort();
    }
    return keys
        .filter(function (n) { return freq[n] == input.length - 1; })
        .map(function (n) { return smallestArray[n]; });
}
exports.intersection = intersection;
/**
 * Flatten the array
 *
 * @param  {Array} xs The array to flatten
 * @param {Number} depth The number of nested lists to iterate
 */
function flatten(xs, depth) {
    var arr = [];
    function flatten2(ys, n) {
        for (var i = 0, len = ys.length; i < len; i++) {
            if ((0, exports.isArray)(ys[i]) && (n > 0 || n < 0)) {
                flatten2(ys[i], Math.max(-1, n - 1));
            }
            else {
                arr.push(ys[i]);
            }
        }
    }
    flatten2(xs, depth);
    return arr;
}
exports.flatten = flatten;
/**
 * Determine whether two values are the same or strictly equivalent
 *
 * @param  {*}  a The first value
 * @param  {*}  b The second value
 * @return {Boolean}   Result of comparison
 */
function isEqual(a, b) {
    var lhs = [a];
    var rhs = [b];
    while (lhs.length > 0) {
        a = lhs.pop();
        b = rhs.pop();
        // strictly equal must be equal.
        if (a === b)
            continue;
        // unequal types and functions cannot be equal.
        var nativeType = getType(a).toLowerCase();
        if (nativeType !== getType(b).toLowerCase() || nativeType === "function") {
            return false;
        }
        // leverage toString for Date and RegExp types
        if (nativeType === "array") {
            var xs = a;
            var ys = b;
            if (xs.length !== ys.length)
                return false;
            if (xs.length === ys.length && xs.length === 0)
                continue;
            into(lhs, xs);
            into(rhs, ys);
        }
        else if (nativeType === "object") {
            // deep compare objects
            var aKeys = Object.keys(a);
            var bKeys = Object.keys(b);
            // check length of keys early
            if (aKeys.length !== bKeys.length)
                return false;
            // compare keys
            for (var i = 0, len = aKeys.length; i < len; i++) {
                var k = aKeys[i];
                // not found
                if (!has(b, k))
                    return false;
                // key found
                lhs.push(a[k]);
                rhs.push(b[k]);
            }
        }
        else {
            // compare encoded values
            if (stringify(a) !== stringify(b))
                return false;
        }
    }
    return lhs.length === 0;
}
exports.isEqual = isEqual;
/**
 * Return a new unique version of the collection
 * @param  {Array} xs The input collection
 * @return {Array}
 */
function unique(xs, hashFunction) {
    if (hashFunction === void 0) { hashFunction = DEFAULT_HASH_FUNCTION; }
    if (xs.length == 0)
        return [];
    var root = {
        key: hashCode(xs[0], hashFunction),
        indexes: [0],
    };
    // hash items on to tree to track collisions
    for (var i = 1; i < xs.length; i++) {
        addIndex(root, hashCode(xs[i], hashFunction), i);
    }
    var result = [];
    // walk tree and remove duplicates
    var stack = [root];
    while (stack.length > 0) {
        var node = stack.pop();
        if (node.indexes.length == 1) {
            result.push(node.indexes[0]);
        }
        else {
            // handle collisions by matching all items
            var arr = node.indexes;
            // we start by search from the back so we maintain the smaller index when there is a duplicate.
            while (arr.length > 0) {
                for (var j = 1; j < arr.length; j++) {
                    // if last item matches any remove the last item.
                    if (isEqual(xs[arr[arr.length - 1]], xs[arr[arr.length - 1 - j]])) {
                        // remove last item
                        arr.pop();
                        // reset position
                        j = 0;
                    }
                }
                // add the unique item
                result.push(arr.pop());
            }
        }
        // add children
        if (node.left)
            stack.push(node.left);
        if (node.right)
            stack.push(node.right);
    }
    // sort indexes for stability
    result.sort();
    // return the unique items
    return result.map(function (i) { return xs[i]; });
}
exports.unique = unique;
/**
 * Encode value to string using a simple non-colliding stable scheme.
 *
 * @param value
 * @returns {*}
 */
function stringify(value) {
    var type = getType(value).toLowerCase();
    switch (type) {
        case "boolean":
        case "number":
        case "regexp":
            return value.toString();
        case "string":
            return JSON.stringify(value);
        case "date":
            return value.toISOString();
        case "null":
        case "undefined":
            return type;
        case "array":
            return "[" + value.map(stringify).join(",") + "]";
        default:
            break;
    }
    // default case
    var prefix = type === "object" ? "" : "".concat(getType(value));
    var objKeys = Object.keys(value);
    objKeys.sort();
    return ("".concat(prefix, "{") +
        objKeys.map(function (k) { return "".concat(stringify(k), ":").concat(stringify(value[k])); }).join(",") +
        "}");
}
exports.stringify = stringify;
/**
 * Generate hash code
 * This selected function is the result of benchmarking various hash functions.
 * This version performs well and can hash 10^6 documents in ~3s with on average 100 collisions.
 *
 * @param value
 * @returns {number|null}
 */
function hashCode(value, hashFunction) {
    if (hashFunction === void 0) { hashFunction = DEFAULT_HASH_FUNCTION; }
    if (isNil(value))
        return null;
    return hashFunction(value).toString();
}
exports.hashCode = hashCode;
/**
 * Returns a (stably) sorted copy of list, ranked in ascending order by the results of running each value through iteratee
 *
 * This implementation treats null/undefined sort keys as less than every other type
 *
 * @param {Array}   collection
 * @param {Function} keyFn The sort key function used to resolve sort keys
 * @param {Function} comparator The comparator function to use for comparing keys. Defaults to standard comparison via `compare(...)`
 * @return {Array} Returns a new sorted array by the given key and comparator function
 */
function sortBy(collection, keyFn, comparator) {
    if (comparator === void 0) { comparator = exports.DEFAULT_COMPARATOR; }
    var sorted = [];
    var result = [];
    if (isEmpty(collection))
        return collection;
    for (var i = 0; i < collection.length; i++) {
        var obj = collection[i];
        var key = keyFn(obj, i);
        if (isNil(key)) {
            result.push(obj);
        }
        else {
            sorted.push([key, obj]);
        }
    }
    // use native array sorting but enforce stableness
    sorted.sort(function (a, b) { return comparator(a[0], b[0]); });
    result.push.apply(result, sorted.map(function (o) { return o[1]; }));
    return result;
}
exports.sortBy = sortBy;
/**
 * Groups the collection into sets by the returned key
 *
 * @param collection
 * @param keyFn {Function} to compute the group key of an item in the collection
 * @returns {{keys: Array, groups: Array}}
 */
function groupBy(collection, keyFn, hashFunction) {
    if (hashFunction === void 0) { hashFunction = DEFAULT_HASH_FUNCTION; }
    var result = {
        keys: new Array(),
        groups: new Array(),
    };
    var lookup = {};
    for (var i = 0; i < collection.length; i++) {
        var obj = collection[i];
        var key = keyFn(obj, i);
        var hash = hashCode(key, hashFunction);
        var index = -1;
        if (lookup[hash] === undefined) {
            index = result.keys.length;
            lookup[hash] = index;
            result.keys.push(key);
            result.groups.push([]);
        }
        index = lookup[hash];
        result.groups[index].push(obj);
    }
    return result;
}
exports.groupBy = groupBy;
// max elements to push.
// See argument limit https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
var MAX_ARRAY_PUSH = 50000;
/**
 * Merge elements into the dest
 *
 * @param {*} target The target object
 * @param {*} rest The array of elements to merge into dest
 */
function into(target) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    if (target instanceof Array) {
        return rest.reduce(function (acc, arr) {
            // push arrary in batches to handle large inputs
            var i = Math.ceil(arr.length / MAX_ARRAY_PUSH);
            var begin = 0;
            while (i-- > 0) {
                Array.prototype.push.apply(acc, arr.slice(begin, begin + MAX_ARRAY_PUSH));
                begin += MAX_ARRAY_PUSH;
            }
            return acc;
        }, target);
    }
    else {
        // merge objects. same behaviour as Object.assign
        return rest.filter(isObjectLike).reduce(function (acc, item) {
            Object.assign(acc, item);
            return acc;
        }, target);
    }
}
exports.into = into;
/**
 * This is a generic memoization function
 *
 * This implementation uses a cache independent of the function being memoized
 * to allow old values to be garbage collected when the memoized function goes out of scope.
 *
 * @param {*} fn The function object to memoize
 */
function memoize(fn, hashFunction) {
    var _this = this;
    if (hashFunction === void 0) { hashFunction = DEFAULT_HASH_FUNCTION; }
    return (function (memo) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var key = hashCode(args, hashFunction);
            if (!has(memo, key)) {
                memo[key] = fn.apply(_this, args);
            }
            return memo[key];
        };
    })({
    /* storage */
    });
}
exports.memoize = memoize;
// mingo internal
/**
 * Retrieve the value of a given key on an object
 * @param obj
 * @param key
 * @returns {*}
 * @private
 */
function getValue(obj, key) {
    return isObjectLike(obj) ? obj[key] : undefined;
}
/**
 * Unwrap a single element array to specified depth
 * @param {Array} arr
 * @param {Number} depth
 */
function unwrap(arr, depth) {
    if (depth < 1)
        return arr;
    while (depth-- && arr.length === 1)
        arr = arr[0];
    return arr;
}
/**
 * Resolve the value of the field (dot separated) on the given object
 * @param obj {Object} the object context
 * @param selector {String} dot separated path to field
 * @returns {*}
 */
function resolve(obj, selector, options) {
    var depth = 0;
    function resolve2(o, path) {
        var value = o;
        var _loop_3 = function (i) {
            var field = path[i];
            var isText = /^\d+$/.exec(field) === null;
            // using instanceof to aid typescript compiler
            if (isText && value instanceof Array) {
                // On the first iteration, we check if we received a stop flag.
                // If so, we stop to prevent iterating over a nested array value
                // on consecutive object keys in the selector.
                if (i === 0 && depth > 0)
                    return "break";
                depth += 1;
                // only look at the rest of the path
                var subpath_1 = path.slice(i);
                value = value.reduce(function (acc, item) {
                    var v = resolve2(item, subpath_1);
                    if (v !== undefined)
                        acc.push(v);
                    return acc;
                }, []);
                return "break";
            }
            else {
                value = getValue(value, field);
            }
            if (value === undefined)
                return "break";
        };
        for (var i = 0; i < path.length; i++) {
            var state_2 = _loop_3(i);
            if (state_2 === "break")
                break;
        }
        return value;
    }
    var result = JS_SIMPLE_TYPES.has(getType(obj).toLowerCase())
        ? obj
        : resolve2(obj, selector.split("."));
    return result instanceof Array && (options === null || options === void 0 ? void 0 : options.unwrapArray)
        ? unwrap(result, depth)
        : result;
}
exports.resolve = resolve;
/**
 * Returns the full object to the resolved value given by the selector.
 * This function excludes empty values as they aren't practically useful.
 *
 * @param obj {Object} the object context
 * @param selector {String} dot separated path to field
 */
function resolveGraph(obj, selector, options) {
    var names = selector.split(".");
    var key = names[0];
    // get the next part of the selector
    var next = names.slice(1).join(".");
    var isIndex = /^\d+$/.exec(key) !== null;
    var hasNext = names.length > 1;
    var result;
    var value;
    if (obj instanceof Array) {
        if (isIndex) {
            result = getValue(obj, Number(key));
            if (hasNext) {
                result = resolveGraph(result, next, options);
            }
            result = [result];
        }
        else {
            result = [];
            for (var _i = 0, obj_1 = obj; _i < obj_1.length; _i++) {
                var item = obj_1[_i];
                value = resolveGraph(item, selector, options);
                if (options === null || options === void 0 ? void 0 : options.preserveMissing) {
                    if (value === undefined) {
                        value = MISSING;
                    }
                    result.push(value);
                }
                else if (value !== undefined) {
                    result.push(value);
                }
            }
        }
    }
    else {
        value = getValue(obj, key);
        if (hasNext) {
            value = resolveGraph(value, next, options);
        }
        if (value === undefined)
            return undefined;
        result = (options === null || options === void 0 ? void 0 : options.preserveKeys) ? __assign({}, obj) : {};
        result[key] = value;
    }
    return result;
}
exports.resolveGraph = resolveGraph;
/**
 * Filter out all MISSING values from the object in-place
 *
 * @param obj The object to filter
 */
function filterMissing(obj) {
    if (obj instanceof Array) {
        for (var i = obj.length - 1; i >= 0; i--) {
            if (obj[i] === MISSING) {
                obj.splice(i, 1);
            }
            else {
                filterMissing(obj[i]);
            }
        }
    }
    else if (isObject(obj)) {
        for (var k in obj) {
            if (has(obj, k)) {
                filterMissing(obj[k]);
            }
        }
    }
}
exports.filterMissing = filterMissing;
/**
 * Walk the object graph and execute the given transform function
 *
 * @param  {Object|Array} obj   The object to traverse
 * @param  {String} selector    The selector
 * @param  {Function} fn Function to execute for value at the end the traversal
 * @return {*}
 */
function walk(obj, selector, fn, options) {
    if (isNil(obj))
        return;
    var names = selector.split(".");
    var key = names[0];
    var next = names.slice(1).join(".");
    if (names.length === 1) {
        fn(obj, key);
    }
    else {
        // force the rest of the graph while traversing
        if ((options === null || options === void 0 ? void 0 : options.buildGraph) && isNil(obj[key])) {
            obj[key] = {};
        }
        // get the next item
        var item = obj[key];
        // we peek to see if next key is an array index.
        var isNextArrayIndex = !!(names.length > 1 && names[1].match(/^\d+$/));
        // if we have an array value but the next key is not an index and the 'descendArray' option is set,
        // we walk each item in the array separately. This allows for handling traversing keys for objects
        // nested within an array.
        //
        // Eg: Given { array: [ {k:1}, {k:2}, {k:3} ] }
        //  - individual objecs can be traversed with "array.k"
        //  - a specific object can be traversed with "array.1"
        if (item instanceof Array && (options === null || options === void 0 ? void 0 : options.descendArray) && !isNextArrayIndex) {
            item.forEach(function (e) { return walk(e, next, fn, options); });
        }
        else {
            walk(item, next, fn, options);
        }
    }
}
/**
 * Set the value of the given object field
 *
 * @param obj {Object|Array} the object context
 * @param selector {String} path to field
 * @param value {*} the value to set
 */
function setValue(obj, selector, value) {
    walk(obj, selector, function (item, key) {
        item[key] = value;
    }, { buildGraph: true });
}
exports.setValue = setValue;
/**
 * Removes an element from the container.
 * If the selector resolves to an array and the leaf is a non-numeric key,
 * the remove operation will be performed on objects of the array.
 *
 * @param obj {ArrayOrObject} object or array
 * @param selector {String} dot separated path to element to remove
 */
function removeValue(obj, selector, options) {
    walk(obj, selector, function (item, key) {
        if (item instanceof Array) {
            if (/^\d+$/.test(key)) {
                item.splice(parseInt(key), 1);
            }
            else if (options && options.descendArray) {
                for (var _i = 0, item_1 = item; _i < item_1.length; _i++) {
                    var elem = item_1[_i];
                    if (isObject(elem)) {
                        delete elem[key];
                    }
                }
            }
        }
        else if (isObject(item)) {
            delete item[key];
        }
    }, options);
}
exports.removeValue = removeValue;
var OPERATOR_NAME_PATTERN = /^\$[a-zA-Z0-9_]+$/;
/**
 * Check whether the given name passes for an operator. We assume AnyVal field name starting with '$' is an operator.
 * This is cheap and safe to do since keys beginning with '$' should be reserved for internal use.
 * @param {String} name
 */
function isOperator(name) {
    return OPERATOR_NAME_PATTERN.test(name);
}
exports.isOperator = isOperator;
/**
 * Simplify expression for easy evaluation with query operators map
 * @param expr
 * @returns {*}
 */
function normalize(expr) {
    // normalized primitives
    if (JS_SIMPLE_TYPES.has(getType(expr).toLowerCase())) {
        return isRegExp(expr) ? { $regex: expr } : { $eq: expr };
    }
    // normalize object expression. using ObjectLike handles custom types
    if (isObjectLike(expr)) {
        // no valid query operator found, so we do simple comparison
        if (!Object.keys(expr).some(isOperator)) {
            return { $eq: expr };
        }
        // ensure valid regex
        if (has(expr, "$regex")) {
            return {
                $regex: new RegExp(expr["$regex"], expr["$options"]),
            };
        }
    }
    return expr;
}
exports.normalize = normalize;
