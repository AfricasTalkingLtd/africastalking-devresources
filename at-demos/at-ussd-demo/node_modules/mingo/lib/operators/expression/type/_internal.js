"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.toInteger = exports.TypeConvertError = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
var TypeConvertError = /** @class */ (function (_super) {
    __extends(TypeConvertError, _super);
    function TypeConvertError(message) {
        return _super.call(this, message) || this;
    }
    return TypeConvertError;
}(Error));
exports.TypeConvertError = TypeConvertError;
function toInteger(obj, expr, options, max, min, typename) {
    var val = (0, core_1.computeValue)(obj, expr, null, options);
    if ((0, util_1.isNil)(val))
        return null;
    if (val instanceof Date)
        return val.getTime();
    if (val === true)
        return 1;
    if (val === false)
        return 0;
    var n = Number(val);
    if ((0, util_1.isNumber)(n) && n >= min && n <= max) {
        // weirdly a decimal in string format cannot be converted to int.
        // so we must check input if not string or if it is, not in decimal format
        if (!(0, util_1.isString)(val) || n.toString().indexOf(".") === -1) {
            return Math.trunc(n);
        }
    }
    throw new TypeConvertError("cannot convert '".concat(val, "' to ").concat(typename));
}
exports.toInteger = toInteger;
