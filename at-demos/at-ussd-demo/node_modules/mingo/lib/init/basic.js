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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Loads all Query and Projection operators
 */
var core_1 = require("../core");
var booleanOperators = __importStar(require("../operators/expression/boolean"));
var comparisonOperators = __importStar(require("../operators/expression/comparison"));
var pipeline_1 = require("../operators/pipeline");
var projectionOperators = __importStar(require("../operators/projection"));
var queryOperators = __importStar(require("../operators/query"));
(0, core_1.useOperators)(core_1.OperatorType.EXPRESSION, __assign(__assign({}, booleanOperators), comparisonOperators));
(0, core_1.useOperators)(core_1.OperatorType.PIPELINE, { $project: pipeline_1.$project, $skip: pipeline_1.$skip, $limit: pipeline_1.$limit, $sort: pipeline_1.$sort });
(0, core_1.useOperators)(core_1.OperatorType.PROJECTION, projectionOperators);
(0, core_1.useOperators)(core_1.OperatorType.QUERY, queryOperators);
