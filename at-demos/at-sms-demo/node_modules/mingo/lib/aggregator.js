"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aggregator = void 0;
var core_1 = require("./core");
var lazy_1 = require("./lazy");
var util_1 = require("./util");
/**
 * Provides functionality for the mongoDB aggregation pipeline
 *
 * @param pipeline an Array of pipeline operators
 * @param options An optional Options to pass the aggregator
 * @constructor
 */
var Aggregator = /** @class */ (function () {
    function Aggregator(pipeline, options) {
        this.pipeline = pipeline;
        this.options = options;
        this.options = (0, core_1.initOptions)(options);
    }
    /**
     * Returns an `Lazy` iterator for processing results of pipeline
     *
     * @param {*} collection An array or iterator object
     * @param {Query} query the `Query` object to use as context
     * @returns {Iterator} an iterator object
     */
    Aggregator.prototype.stream = function (collection) {
        var iterator = (0, lazy_1.Lazy)(collection);
        var mode = this.options.processingMode;
        if (mode == core_1.ProcessingMode.CLONE_ALL ||
            mode == core_1.ProcessingMode.CLONE_INPUT) {
            iterator.map(util_1.cloneDeep);
        }
        var pipelineOperators = [];
        if (!(0, util_1.isEmpty)(this.pipeline)) {
            // run aggregation pipeline
            for (var _i = 0, _a = this.pipeline; _i < _a.length; _i++) {
                var operator = _a[_i];
                var operatorKeys = Object.keys(operator);
                var op = operatorKeys[0];
                var call = (0, core_1.getOperator)(core_1.OperatorType.PIPELINE, op);
                (0, util_1.assert)(operatorKeys.length === 1 && !!call, "invalid aggregation operator ".concat(op));
                pipelineOperators.push(op);
                iterator = call(iterator, operator[op], this.options);
            }
        }
        // operators that may share object graphs of inputs.
        // we only need to clone the output for these since the objects will already be distinct for other operators.
        if (mode == core_1.ProcessingMode.CLONE_OUTPUT ||
            (mode == core_1.ProcessingMode.CLONE_ALL &&
                !!(0, util_1.intersection)([["$group", "$unwind"], pipelineOperators]).length)) {
            iterator.map(util_1.cloneDeep);
        }
        return iterator;
    };
    /**
     * Return the results of the aggregation as an array.
     *
     * @param {*} collection
     * @param {*} query
     */
    Aggregator.prototype.run = function (collection) {
        return this.stream(collection).value();
    };
    return Aggregator;
}());
exports.Aggregator = Aggregator;
