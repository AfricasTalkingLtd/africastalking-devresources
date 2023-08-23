// Query Evaluation Operators: https://docs.mongodb.com/manual/reference/operator/query-evaluation/
/**
 * Validate documents against the given JSON Schema.
 *
 * @param selector
 * @param schema
 * @returns {Function}
 */
export function $jsonSchema(selector, schema, options) {
    if (!options?.jsonSchemaValidator) {
        throw new Error("Missing option 'jsonSchemaValidator'. Configure to use '$jsonSchema' operator.");
    }
    const validate = options?.jsonSchemaValidator(schema);
    return (obj) => validate(obj);
}
