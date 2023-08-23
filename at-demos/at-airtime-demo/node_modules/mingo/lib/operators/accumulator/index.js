"use strict";
/**
 * Group stage Accumulator Operators. https://docs.mongodb.com/manual/reference/operator/aggregation-
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./accumulator"), exports);
__exportStar(require("./addToSet"), exports);
__exportStar(require("./avg"), exports);
__exportStar(require("./bottom"), exports);
__exportStar(require("./bottomN"), exports);
__exportStar(require("./count"), exports);
__exportStar(require("./covariancePop"), exports);
__exportStar(require("./covarianceSamp"), exports);
__exportStar(require("./first"), exports);
__exportStar(require("./firstN"), exports);
__exportStar(require("./last"), exports);
__exportStar(require("./lastN"), exports);
__exportStar(require("./max"), exports);
__exportStar(require("./maxN"), exports);
__exportStar(require("./mergeObjects"), exports);
__exportStar(require("./min"), exports);
__exportStar(require("./minN"), exports);
__exportStar(require("./push"), exports);
__exportStar(require("./stdDevPop"), exports);
__exportStar(require("./stdDevSamp"), exports);
__exportStar(require("./sum"), exports);
__exportStar(require("./top"), exports);
__exportStar(require("./topN"), exports);
