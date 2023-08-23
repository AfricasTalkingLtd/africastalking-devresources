"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$sort = void 0;
var util_1 = require("../../util");
/**
 * Takes all input documents and returns them in a stream of sorted documents.
 *
 * @param collection
 * @param sortKeys
 * @param  {Object} options
 * @returns {*}
 */
function $sort(collection, sortKeys, options) {
    if ((0, util_1.isEmpty)(sortKeys) || !(0, util_1.isObject)(sortKeys))
        return collection;
    var cmp = util_1.DEFAULT_COMPARATOR;
    // check for collation spec on the options
    var collationSpec = options.collation;
    // use collation comparator if provided
    if ((0, util_1.isObject)(collationSpec) && (0, util_1.isString)(collationSpec.locale)) {
        cmp = collationComparator(collationSpec);
    }
    return collection.transform(function (coll) {
        var modifiers = Object.keys(sortKeys);
        var _loop_1 = function (key) {
            var grouped = (0, util_1.groupBy)(coll, function (obj) { return (0, util_1.resolve)(obj, key); }, options === null || options === void 0 ? void 0 : options.hashFunction);
            var sortedIndex = {};
            var indexKeys = (0, util_1.sortBy)(grouped.keys, function (k, i) {
                sortedIndex[k] = i;
                return k;
            }, cmp);
            if (sortKeys[key] === -1)
                indexKeys.reverse();
            coll = [];
            for (var _b = 0, indexKeys_1 = indexKeys; _b < indexKeys_1.length; _b++) {
                var k = indexKeys_1[_b];
                (0, util_1.into)(coll, grouped.groups[sortedIndex[k]]);
            }
        };
        for (var _i = 0, _a = modifiers.reverse(); _i < _a.length; _i++) {
            var key = _a[_i];
            _loop_1(key);
        }
        return coll;
    });
}
exports.$sort = $sort;
// MongoDB collation strength to JS localeCompare sensitivity mapping.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
var COLLATION_STRENGTH = {
    // Only strings that differ in base letters compare as unequal. Examples: a ≠ b, a = á, a = A.
    1: "base",
    //  Only strings that differ in base letters or accents and other diacritic marks compare as unequal.
    // Examples: a ≠ b, a ≠ á, a = A.
    2: "accent",
    // Strings that differ in base letters, accents and other diacritic marks, or case compare as unequal.
    // Other differences may also be taken into consideration. Examples: a ≠ b, a ≠ á, a ≠ A
    3: "variant",
    // case - Only strings that differ in base letters or case compare as unequal. Examples: a ≠ b, a = á, a ≠ A.
};
/**
 * Creates a comparator function for the given collation spec. See https://docs.mongodb.com/manual/reference/collation/
 *
 * @param spec {Object} The MongoDB collation spec.
 * {
 *   locale: string,
 *   caseLevel: boolean,
 *   caseFirst: string,
 *   strength: int,
 *   numericOrdering: boolean,
 *   alternate: string,
 *   maxVariable: string, // unsupported
 *   backwards: boolean // unsupported
 * }
 */
function collationComparator(spec) {
    var localeOpt = {
        sensitivity: COLLATION_STRENGTH[spec.strength || 3],
        caseFirst: spec.caseFirst === "off" ? "false" : spec.caseFirst || "false",
        numeric: spec.numericOrdering || false,
        ignorePunctuation: spec.alternate === "shifted",
    };
    // when caseLevel is true for strength  1:base and 2:accent, bump sensitivity to the nearest that supports case comparison
    if ((spec.caseLevel || false) === true) {
        if (localeOpt.sensitivity === "base")
            localeOpt.sensitivity = "case";
        if (localeOpt.sensitivity === "accent")
            localeOpt.sensitivity = "variant";
    }
    var collator = new Intl.Collator(spec.locale, localeOpt);
    return function (a, b) {
        // non strings
        if (!(0, util_1.isString)(a) || !(0, util_1.isString)(b))
            return (0, util_1.DEFAULT_COMPARATOR)(a, b);
        // only for strings
        var i = collator.compare(a, b);
        if (i < 0)
            return -1;
        if (i > 0)
            return 1;
        return 0;
    };
}
