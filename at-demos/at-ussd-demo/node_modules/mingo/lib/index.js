"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aggregate = exports.remove = exports.find = exports.Query = exports.Aggregator = void 0;
// loads basic operators
require("./init/basic");
var aggregator_1 = require("./aggregator");
var query_1 = require("./query");
var aggregator_2 = require("./aggregator");
Object.defineProperty(exports, "Aggregator", { enumerable: true, get: function () { return aggregator_2.Aggregator; } });
var query_2 = require("./query");
Object.defineProperty(exports, "Query", { enumerable: true, get: function () { return query_2.Query; } });
/**
 * Performs a query on a collection and returns a cursor object.
 * Shorthand for `Query(criteria).find(collection, projection)`
 *
 * @param collection Array of objects
 * @param criteria Query criteria
 * @param projection Projection criteria
 * @param options
 * @returns {Cursor} A cursor of results
 */
function find(collection, criteria, projection, options) {
    return new query_1.Query(criteria, options).find(collection, projection);
}
exports.find = find;
/**
 * Returns a new array without objects which match the criteria
 *
 * @param collection Array of objects
 * @param criteria Query criteria of objects to remove
 * @param options
 * @returns {Array} New filtered array
 */
function remove(collection, criteria, options) {
    return new query_1.Query(criteria, options).remove(collection);
}
exports.remove = remove;
/**
 * Return the result collection after running the aggregation pipeline for the given collection.
 * Shorthand for `(new Aggregator(pipeline, options)).run(collection)`
 *
 * @param collection array or stream of objects
 * @param pipeline The pipeline operators to use
 * @param options
 * @returns {Array} New array of results
 */
function aggregate(collection, pipeline, options) {
    return new aggregator_1.Aggregator(pipeline, options).run(collection);
}
exports.aggregate = aggregate;
// default interface
exports.default = {
    Aggregator: aggregator_1.Aggregator,
    Query: query_1.Query,
    aggregate: aggregate,
    find: find,
    remove: remove,
};
