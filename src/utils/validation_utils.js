import { prepareSchemaErrorMessage } from './errors_utils';
import { isLoginExists } from '../storage';

export const VALIDATION_NAMES = {
    PARAMS: 'params',
    BODY: 'body',
    QUERY: 'query'
};

export const validateSchema = (schema, fieldName) => {
    return (req, res, next) => {
        const { error } = schema.validate(req[fieldName]);
        if (error && error.isJoi) {
            res.status(400).json(prepareSchemaErrorMessage(error.details));
        } else {
            return next();
        }
    };
};

export const validateLogin = (value) => {
    const isExist = isLoginExists(value);
    if (isExist) {
        throw new Error('Login already exists');
    }
    return value;
};
