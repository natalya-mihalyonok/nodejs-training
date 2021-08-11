import { v4 as uuidv4 } from 'uuid';
import sha512 from 'crypto-js/sha512';

export const generateId = () => {
    return uuidv4();
};

export const sortByFieldName = (arr, fieldName) => {
    return arr.sort((a, b) => a[fieldName] > b[fieldName] ? 1 : -1);
};

export const limitArray = (arr, limit) => {
    if (limit) {
        return arr.slice(0, limit);
    }
    return arr;
};

export const encryptValue = (value) => {
    return String(sha512(value).toString());
};
