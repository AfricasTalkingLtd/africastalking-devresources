"use strict";
// $setWindowFields -  https://docs.mongodb.com/manual/reference/operator/aggregation/setWindowFields/
Object.defineProperty(exports, "__esModule", { value: true });
exports.$setWindowFields = void 0;
var core_1 = require("../../core");
var lazy_1 = require("../../lazy");
var util_1 = require("../../util");
var dateAdd_1 = require("../expression/date/dateAdd");
var addFields_1 = require("./addFields");
var group_1 = require("./group");
var sort_1 = require("./sort");
/**
 * Randomly selects the specified number of documents from its input. The given iterator must have finite values
 *
 * @param  {Iterator} collection
 * @param  {Object} expr
 * @param  {Options} options
 * @return {*}
 */
function $setWindowFields(collection, expr, options) {
    // validate inputs early since this can be an expensive operation.
    for (var _i = 0, _a = Object.values(expr.output); _i < _a.length; _i++) {
        var outputExpr = _a[_i];
        var keys = Object.keys(outputExpr);
        var op = keys.find(util_1.isOperator);
        (0, util_1.assert)(!!(0, core_1.getOperator)(core_1.OperatorType.WINDOW, op) ||
            !!(0, core_1.getOperator)(core_1.OperatorType.ACCUMULATOR, op), "".concat(op, " is not a valid window operator"));
        (0, util_1.assert)(keys.length > 0 &&
            keys.length <= 2 &&
            (keys.length == 1 || keys.includes("window")), "$setWindowFields 'output' values should have a single window operator.");
        if (outputExpr === null || outputExpr === void 0 ? void 0 : outputExpr.window) {
            var _b = outputExpr.window, documents = _b.documents, range = _b.range;
            (0, util_1.assert)((!!documents && !range) ||
                (!documents && !!range) ||
                (!documents && !range), "$setWindowFields 'output.window' option supports only one of 'documents' or 'range'.");
        }
    }
    // we sort first if required
    if (expr.sortBy) {
        collection = (0, sort_1.$sort)(collection, expr.sortBy, options);
    }
    // then partition collection
    if (expr.partitionBy) {
        collection = (0, group_1.$group)(collection, {
            _id: expr.partitionBy,
            items: { $push: "$$CURRENT" },
        }, options);
    }
    else {
        // single partition so we can keep the code uniform
        collection = (0, lazy_1.Lazy)([
            {
                _id: 0,
                items: collection.value(),
            },
        ]);
    }
    // transform values
    return collection.transform(function (partitions) {
        // let iteratorIndex = 0;
        var iterators = [];
        var outputConfig = [];
        for (var _i = 0, _a = Object.entries(expr.output); _i < _a.length; _i++) {
            var _b = _a[_i], field = _b[0], outputExpr = _b[1];
            var operatorName = Object.keys(outputExpr).find(util_1.isOperator);
            outputConfig.push({
                operatorName: operatorName,
                func: {
                    left: (0, core_1.getOperator)(core_1.OperatorType.ACCUMULATOR, operatorName),
                    right: (0, core_1.getOperator)(core_1.OperatorType.WINDOW, operatorName),
                },
                args: outputExpr[operatorName],
                field: field,
                window: outputExpr.window,
            });
        }
        // each parition maintains its own closure to process the documents in the window.
        partitions.forEach(function (group) {
            // get the items to process
            var items = group.items;
            // create an iterator per group.
            // we need the index of each document so we track it using a special field.
            var iterator = (0, lazy_1.Lazy)(items);
            // results map
            var windowResultMap = {};
            var _loop_1 = function (config) {
                var _a;
                var func = config.func, args = config.args, field = config.field, window_1 = config.window;
                var makeResultFunc = function (getItemsFn) {
                    // closure for object index within the partition
                    var index = -1;
                    return function (obj) {
                        ++index;
                        // process accumulator function
                        if (func.left) {
                            return func.left(getItemsFn(obj, index), args, options);
                        }
                        // OR process 'window' function
                        return func.right(obj, getItemsFn(obj, index), {
                            parentExpr: expr,
                            inputExpr: args,
                            documentNumber: index + 1,
                            field: field,
                        }, 
                        // must use raw options only since it operates over a collection.
                        options);
                    };
                };
                if (window_1) {
                    var documents_1 = window_1.documents, range = window_1.range, unit_1 = window_1.unit;
                    var boundary_1 = documents_1 || range;
                    var begin_1 = boundary_1[0];
                    var end_1 = boundary_1[1];
                    if (boundary_1 && (begin_1 != "unbounded" || end_1 != "unbounded")) {
                        var toBeginIndex_1 = function (currentIndex) {
                            if (begin_1 == "current")
                                return currentIndex;
                            if (begin_1 == "unbounded")
                                return 0;
                            return Math.max(begin_1 + currentIndex, 0);
                        };
                        var toEndIndex_1 = function (currentIndex) {
                            if (end_1 == "current")
                                return currentIndex + 1;
                            if (end_1 == "unbounded")
                                return items.length;
                            return end_1 + currentIndex + 1;
                        };
                        var getItems = function (current, index) {
                            // handle string boundaries or documents
                            if (!!documents_1 || boundary_1.every(util_1.isString)) {
                                return items.slice(toBeginIndex_1(index), toEndIndex_1(index));
                            }
                            // handle range with numeric boundary values
                            var sortKey = Object.keys(expr.sortBy)[0];
                            var lower;
                            var upper;
                            if (unit_1) {
                                // we are dealing with datetimes
                                var getTime = function (amount) {
                                    return (0, dateAdd_1.$dateAdd)(current, {
                                        startDate: new Date(current[sortKey]),
                                        unit: unit_1,
                                        amount: amount,
                                    }).getTime();
                                };
                                lower = (0, util_1.isNumber)(begin_1) ? getTime(begin_1) : -Infinity;
                                upper = (0, util_1.isNumber)(end_1) ? getTime(end_1) : Infinity;
                            }
                            else {
                                var currentValue = current[sortKey];
                                lower = (0, util_1.isNumber)(begin_1) ? currentValue + begin_1 : -Infinity;
                                upper = (0, util_1.isNumber)(end_1) ? currentValue + end_1 : Infinity;
                            }
                            var array = items;
                            if (begin_1 == "current")
                                array = items.slice(index);
                            if (end_1 == "current")
                                array = items.slice(0, index + 1);
                            // look within the boundary and filter down
                            return array.filter(function (o) {
                                var value = o[sortKey];
                                var n = +value;
                                return n >= lower && n <= upper;
                            });
                        };
                        windowResultMap[field] = makeResultFunc(getItems);
                    }
                }
                // default action is to utilize the entire set of items
                if (!windowResultMap[field]) {
                    windowResultMap[field] = makeResultFunc(function (_) { return items; });
                }
                // invoke add fields to get the desired behaviour using a custom function.
                iterator = (0, addFields_1.$addFields)(iterator, (_a = {},
                    _a[field] = {
                        $function: {
                            body: function (obj) { return windowResultMap[field](obj); },
                            args: ["$$CURRENT"],
                        },
                    },
                    _a), options);
            };
            for (var _i = 0, outputConfig_1 = outputConfig; _i < outputConfig_1.length; _i++) {
                var config = outputConfig_1[_i];
                _loop_1(config);
            }
            // add to iterator list
            iterators.push(iterator);
        });
        return lazy_1.compose.apply(void 0, iterators);
    });
}
exports.$setWindowFields = $setWindowFields;
