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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cursor = void 0;
var aggregator_1 = require("./aggregator");
var lazy_1 = require("./lazy");
var util_1 = require("./util");
/**
 * Cursor to iterate and perform filtering on matched objects.
 * This object must not be used directly. A cursor may be obtaine from calling `find()` on an instance of `Query`.
 *
 * @param collection The input source of the collection
 * @param predicate A predicate function to test documents
 * @param projection A projection criteria
 * @param options Options
 * @constructor
 */
var Cursor = /** @class */ (function () {
    function Cursor(source, predicate, projection, options) {
        this.source = source;
        this.predicate = predicate;
        this.projection = projection;
        this.options = options;
        this.operators = [];
        this.result = null;
        this.buffer = [];
    }
    /** Returns the iterator from running the query */
    Cursor.prototype.fetch = function () {
        if (this.result)
            return this.result;
        // add projection operator
        if ((0, util_1.isObject)(this.projection)) {
            this.operators.push({ $project: this.projection });
        }
        // filter collection
        this.result = (0, lazy_1.Lazy)(this.source).filter(this.predicate);
        if (this.operators.length > 0) {
            this.result = new aggregator_1.Aggregator(this.operators, this.options).stream(this.result);
        }
        return this.result;
    };
    /** Returns an iterator with the buffered data included */
    Cursor.prototype.fetchAll = function () {
        var buffered = (0, lazy_1.Lazy)(__spreadArray([], this.buffer, true));
        this.buffer = [];
        return (0, lazy_1.compose)(buffered, this.fetch());
    };
    /**
     * Return remaining objects in the cursor as an array. This method exhausts the cursor
     * @returns {Array}
     */
    Cursor.prototype.all = function () {
        return this.fetchAll().value();
    };
    /**
     * Returns the number of objects return in the cursor. This method exhausts the cursor
     * @returns {Number}
     */
    Cursor.prototype.count = function () {
        return this.all().length;
    };
    /**
     * Returns a cursor that begins returning results only after passing or skipping a number of documents.
     * @param {Number} n the number of results to skip.
     * @return {Cursor} Returns the cursor, so you can chain this call.
     */
    Cursor.prototype.skip = function (n) {
        this.operators.push({ $skip: n });
        return this;
    };
    /**
     * Constrains the size of a cursor's result set.
     * @param {Number} n the number of results to limit to.
     * @return {Cursor} Returns the cursor, so you can chain this call.
     */
    Cursor.prototype.limit = function (n) {
        this.operators.push({ $limit: n });
        return this;
    };
    /**
     * Returns results ordered according to a sort specification.
     * @param {Object} modifier an object of key and values specifying the sort order. 1 for ascending and -1 for descending
     * @return {Cursor} Returns the cursor, so you can chain this call.
     */
    Cursor.prototype.sort = function (modifier) {
        this.operators.push({ $sort: modifier });
        return this;
    };
    /**
     * Specifies the collation for the cursor returned by the `mingo.Query.find`
     * @param {*} spec
     */
    Cursor.prototype.collation = function (spec) {
        this.options = __assign(__assign({}, this.options), { collation: spec });
        return this;
    };
    /**
     * Returns the next document in a cursor.
     * @returns {Object | Boolean}
     */
    Cursor.prototype.next = function () {
        // yield value obtains in hasNext()
        if (this.buffer.length > 0) {
            return this.buffer.pop();
        }
        var o = this.fetch().next();
        if (o.done)
            return;
        return o.value;
    };
    /**
     * Returns true if the cursor has documents and can be iterated.
     * @returns {boolean}
     */
    Cursor.prototype.hasNext = function () {
        // there is a value in the buffer
        if (this.buffer.length > 0)
            return true;
        var o = this.fetch().next();
        if (o.done)
            return false;
        this.buffer.push(o.value);
        return true;
    };
    /**
     * Applies a function to each document in a cursor and collects the return values in an array.
     * @param callback
     * @returns {Array}
     */
    Cursor.prototype.map = function (callback) {
        return this.all().map(callback);
    };
    /**
     * Applies a JavaScript function for every document in a cursor.
     * @param callback
     */
    Cursor.prototype.forEach = function (callback) {
        this.all().forEach(callback);
    };
    Cursor.prototype[Symbol.iterator] = function () {
        return this.fetchAll();
    };
    return Cursor;
}());
exports.Cursor = Cursor;
