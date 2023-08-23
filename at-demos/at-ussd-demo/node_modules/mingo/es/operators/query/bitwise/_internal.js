import { createQueryOperator } from "../../_predicates";
export const createBitwiseOperator = (predicate) => {
    return createQueryOperator((value, mask, options) => {
        let b = 0;
        if (mask instanceof Array) {
            for (const n of mask)
                b = b | (1 << n);
        }
        else {
            b = mask;
        }
        return predicate(value & b, b);
    });
};
