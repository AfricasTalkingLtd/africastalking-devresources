"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Iterator = exports.compose = exports.Lazy = void 0;
/**
 * Returns an iterator
 * @param {*} source An iterable source (Array, Function, Generator, or Iterator)
 */
function Lazy(source) {
    return source instanceof Iterator ? source : new Iterator(source);
}
exports.Lazy = Lazy;
function compose() {
    var iterators = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        iterators[_i] = arguments[_i];
    }
    var index = 0;
    return Lazy(function () {
        while (index < iterators.length) {
            var o = iterators[index].next();
            if (!o.done)
                return o;
            index++;
        }
        return { done: true };
    });
}
exports.compose = compose;
/**
 * Checks whether the given object is compatible with a generator i.e Object{next:Function}
 * @param {*} o An object
 */
function isGenerator(o) {
    return (!!o && typeof o === "object" && (o === null || o === void 0 ? void 0 : o.next) instanceof Function);
}
function dropItem(array, i) {
    var rest = array.slice(i + 1);
    array.splice(i);
    Array.prototype.push.apply(array, rest);
}
// stop iteration error
var DONE = new Error();
// Lazy function actions
var Action;
(function (Action) {
    Action[Action["MAP"] = 0] = "MAP";
    Action[Action["FILTER"] = 1] = "FILTER";
    Action[Action["TAKE"] = 2] = "TAKE";
    Action[Action["DROP"] = 3] = "DROP";
})(Action || (Action = {}));
function createCallback(nextFn, iteratees, buffer) {
    var done = false;
    var index = -1;
    var bufferIndex = 0; // index for the buffer
    return function (storeResult) {
        // special hack to collect all values into buffer
        try {
            outer: while (!done) {
                var o = nextFn();
                index++;
                var i = -1;
                var size = iteratees.length;
                var innerDone = false;
                while (++i < size) {
                    var r = iteratees[i];
                    switch (r.action) {
                        case Action.MAP:
                            o = r.func(o, index);
                            break;
                        case Action.FILTER:
                            if (!r.func(o, index))
                                continue outer;
                            break;
                        case Action.TAKE:
                            --r.count;
                            if (!r.count)
                                innerDone = true;
                            break;
                        case Action.DROP:
                            --r.count;
                            if (!r.count)
                                dropItem(iteratees, i);
                            continue outer;
                        default:
                            break outer;
                    }
                }
                done = innerDone;
                if (storeResult) {
                    buffer[bufferIndex++] = o;
                }
                else {
                    return { value: o, done: false };
                }
            }
        }
        catch (e) {
            if (e !== DONE)
                throw e;
        }
        done = true;
        return { done: done };
    };
}
/**
 * A lazy collection iterator yields a single value at time upon request
 */
var Iterator = /** @class */ (function () {
    /**
     * @param {*} source An iterable object or function.
     *    Array - return one element per cycle
     *    Object{next:Function} - call next() for the next value (this also handles generator functions)
     *    Function - call to return the next value
     * @param {Function} fn An optional transformation function
     */
    function Iterator(source) {
        this.iteratees = [];
        this.yieldedValues = [];
        this.isDone = false;
        var nextVal;
        if (source instanceof Function) {
            // make iterable
            source = { next: source };
        }
        if (isGenerator(source)) {
            var src_1 = source;
            nextVal = function () {
                var o = src_1.next();
                if (o.done)
                    throw DONE;
                return o.value;
            };
        }
        else if (source instanceof Array) {
            var data_1 = source;
            var size_1 = data_1.length;
            var index_1 = 0;
            nextVal = function () {
                if (index_1 < size_1)
                    return data_1[index_1++];
                throw DONE;
            };
        }
        else if (!(source instanceof Function)) {
            throw new Error("Source is of type '".concat(typeof source, "'. Must be Array, Function, or Generator"));
        }
        // create next function
        this.getNext = createCallback(nextVal, this.iteratees, this.yieldedValues);
    }
    /**
     * Add an iteratee to this lazy sequence
     */
    Iterator.prototype.push = function (action, value) {
        if (typeof value === "function") {
            this.iteratees.push({ action: action, func: value });
        }
        else if (typeof value === "number") {
            this.iteratees.push({ action: action, count: value });
        }
        return this;
    };
    Iterator.prototype.next = function () {
        return this.getNext();
    };
    // Iteratees methods
    /**
     * Transform each item in the sequence to a new value
     * @param {Function} f
     */
    Iterator.prototype.map = function (f) {
        return this.push(Action.MAP, f);
    };
    /**
     * Select only items matching the given predicate
     * @param {Function} pred
     */
    Iterator.prototype.filter = function (predicate) {
        return this.push(Action.FILTER, predicate);
    };
    /**
     * Take given numbe for values from sequence
     * @param {Number} n A number greater than 0
     */
    Iterator.prototype.take = function (n) {
        return n > 0 ? this.push(Action.TAKE, n) : this;
    };
    /**
     * Drop a number of values from the sequence
     * @param {Number} n Number of items to drop greater than 0
     */
    Iterator.prototype.drop = function (n) {
        return n > 0 ? this.push(Action.DROP, n) : this;
    };
    // Transformations
    /**
     * Returns a new lazy object with results of the transformation
     * The entire sequence is realized.
     *
     * @param {Function} fn Tranform function of type (Array) => (Any)
     */
    Iterator.prototype.transform = function (fn) {
        var self = this;
        var iter;
        return Lazy(function () {
            if (!iter) {
                iter = Lazy(fn(self.value()));
            }
            return iter.next();
        });
    };
    // Terminal methods
    /**
     * Returns the fully realized values of the iterators.
     * The return value will be an array unless `lazy.first()` was used.
     * The realized values are cached for subsequent calls
     */
    Iterator.prototype.value = function () {
        if (!this.isDone) {
            this.isDone = this.getNext(true).done;
        }
        return this.yieldedValues;
    };
    /**
     * Execute the funcion for each value. Will stop when an execution returns false.
     * @param {Function} f
     * @returns {Boolean} false iff `f` return false for AnyVal execution, otherwise true
     */
    Iterator.prototype.each = function (f) {
        for (;;) {
            var o = this.next();
            if (o.done)
                break;
            if (f(o.value) === false)
                return false;
        }
        return true;
    };
    /**
     * Returns the reduction of sequence according the reducing function
     *
     * @param {*} f a reducing function
     * @param {*} init
     */
    Iterator.prototype.reduce = function (f, initialValue) {
        var o = this.next();
        var i = 0;
        if (initialValue === undefined && !o.done) {
            initialValue = o.value;
            o = this.next();
            i++;
        }
        while (!o.done) {
            initialValue = f(initialValue, o.value);
            o = this.next();
        }
        return initialValue;
    };
    /**
     * Returns the number of matched items in the sequence
     */
    Iterator.prototype.size = function () {
        return this.reduce(function (acc, _) { return ++acc; }, 0);
    };
    Iterator.prototype[Symbol.iterator] = function () {
        /* eslint-disable @typescript-eslint/no-unsafe-return */
        return this;
    };
    return Iterator;
}());
exports.Iterator = Iterator;
