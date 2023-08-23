import { ExpressionOperator } from "../../../core";
import { Callback } from "../../../types";
/**
 * Returns an operator for a given trignometric function
 *
 * @param f The trignometric function
 */
export declare function createTrignometryOperator(f: Callback<number | null>, fixedPoints?: Record<string, number | Error>): ExpressionOperator;
