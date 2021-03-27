export const prepareErrorMessage = (message) => {
    return {
        status: 'failed',
        errors: [{ message }]
    };
};

export const prepareSchemaErrorMessage = (schemaErrors) => {
    const errors = schemaErrors.map(({ message }) => ({ message }));
    return {
        status: 'failed',
        errors
    };
};
