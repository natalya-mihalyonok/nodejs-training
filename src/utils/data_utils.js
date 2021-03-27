import { v4 as uuidv4 } from 'uuid';

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
