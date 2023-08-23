"use strict";
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
// load all operators
var core_1 = require("../core");
var accumulatorOperators = __importStar(require("../operators/accumulator"));
var expressionOperators = __importStar(require("../operators/expression"));
var pipelineOperators = __importStar(require("../operators/pipeline"));
var projectionOperators = __importStar(require("../operators/projection"));
var queryOperators = __importStar(require("../operators/query"));
var windowOperators = __importStar(require("../operators/window"));
(0, core_1.useOperators)(core_1.OperatorType.ACCUMULATOR, accumulatorOperators);
(0, core_1.useOperators)(core_1.OperatorType.EXPRESSION, expressionOperators);
(0, core_1.useOperators)(core_1.OperatorType.PIPELINE, pipelineOperators);
(0, core_1.useOperators)(core_1.OperatorType.PROJECTION, projectionOperators);
(0, core_1.useOperators)(core_1.OperatorType.QUERY, queryOperators);
(0, core_1.useOperators)(core_1.OperatorType.WINDOW, windowOperators);
