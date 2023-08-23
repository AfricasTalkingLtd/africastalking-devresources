"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
var core_1 = require("./core");
var cursor_1 = require("./cursor");
var util_1 = require("./util");
/**
 * An object used to filter input documents
 *
 * @param {Object} criteria The criteria for constructing predicates
 * @param {Options} options Options for use by operators
 * @constructor
 */
var Query = /** @class */ (function () {
    function Query(criteria, options) {
        this.criteria = criteria;
        this.options = options;
        this.options = (0, core_1.initOptions)(options);
        this.compiled = [];
        this.compile();
    }
    Query.prototype.compile = function () {
        (0, util_1.assert)((0, util_1.isObject)(this.criteria), "query criteria must be an object");
        var whereOperator;
        for (var _i = 0, _a = Object.entries(this.criteria); _i < _a.length; _i++) {
            var _b = _a[_i], field = _b[0], expr = _b[1];
            if ("$where" === field) {
                whereOperator = { field: field, expr: expr };
            }
            else if ((0, util_1.inArray)(["$and", "$or", "$nor", "$expr", "$jsonSchema"], field)) {
                this.processOperator(field, field, expr);
            }
            else {
                // normalize expression
                (0, util_1.assert)(!(0, util_1.isOperator)(field), "unknown top level operator: ".concat(field));
                for (var _c = 0, _d = Object.entries((0, util_1.normalize)(expr)); _c < _d.length; _c++) {
                    var _e = _d[_c], operator = _e[0], val = _e[1];
                    this.processOperator(field, operator, val);
                }
            }
            if ((0, util_1.isObject)(whereOperator)) {
                this.processOperator(whereOperator.field, whereOperator.field, whereOperator.expr);
            }
        }
    };
    Query.prototype.processOperator = function (field, operator, value) {
        var call = (0, core_1.getOperator)(core_1.OperatorType.QUERY, operator);
        (0, util_1.assert)(!!call, "unknown operator ".concat(operator));
        var fn = call(field, value, this.options);
        this.compiled.push(fn);
    };
    /**
     * Checks if the object passes the query criteria. Returns true if so, false otherwise.
     *
     * @param obj The object to test
     * @returns {boolean} True or false
     */
    Query.prototype.test = function (obj) {
        for (var i = 0, len = this.compiled.length; i < len; i++) {
            if (!this.compiled[i](obj)) {
                return false;
            }
        }
        return true;
    };
    /**
     * Returns a cursor to select matching documents from the input source.
     *
     * @param source A source providing a sequence of documents
     * @param projection An optional projection criteria
     * @returns {Cursor} A Cursor for iterating over the results
     */
    Query.prototype.find = function (collection, projection) {
        var _this = this;
        return new cursor_1.Cursor(collection, function (x) { return _this.test(x); }, projection || {}, this.options);
    };
    /**
     * Remove matched documents from the collection returning the remainder
     *
     * @param collection An array of documents
     * @returns {Array} A new array with matching elements removed
     */
    Query.prototype.remove = function (collection) {
        var _this = this;
        return collection.reduce(function (acc, obj) {
            if (!_this.test(obj))
                acc.push(obj);
            return acc;
        }, []);
    };
    return Query;
}());
exports.Query = Query;
