"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.truncate = void 0;
/**
 * Truncates integer value to number of places. If roundOff is specified round value instead to the number of places
 * @param {Number} num
 * @param {Number} places
 * @param {Boolean} roundOff
 */
function truncate(num, places, roundOff) {
    var sign = Math.abs(num) === num ? 1 : -1;
    num = Math.abs(num);
    var result = Math.trunc(num);
    var decimals = num - result;
    if (places === 0) {
        var firstDigit = Math.trunc(10 * decimals);
        if (roundOff && (result & 1) === 1 && firstDigit >= 5) {
            result++;
        }
    }
    else if (places > 0) {
        var offset = Math.pow(10, places);
        var remainder = Math.trunc(decimals * offset);
        // last digit before cut off
        var lastDigit = Math.trunc(decimals * offset * 10) % 10;
        // add one if last digit is greater than 5
        if (roundOff && lastDigit > 5) {
            remainder += 1;
        }
        // compute decimal remainder and add to whole number
        result += remainder / offset;
    }
    else if (places < 0) {
        // handle negative decimal places
        var offset = Math.pow(10, -1 * places);
        var excess = result % offset;
        result = Math.max(0, result - excess);
        // for negative values the absolute must increase so we round up the last digit if >= 5
        if (roundOff && sign === -1) {
            while (excess > 10) {
                excess -= excess % 10;
            }
            if (result > 0 && excess >= 5) {
                result += offset;
            }
        }
    }
    return result * sign;
}
exports.truncate = truncate;
