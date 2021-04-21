import Joi from 'joi';
import { PERMISSIONS } from '../../../utils/constants';

const GROUP_FIELDS = {
    ID: Joi.string().guid({
        version: [
            'uuidv4'
        ]
    }).required(),
    NAME: Joi.string().required(),
    PERMISSIONS: Joi.array()
        .items(Joi.string().valid(...Object.values(PERMISSIONS)))
        .required()
};

export const groupSchema = Joi.object({
    id: GROUP_FIELDS.ID,
    name: GROUP_FIELDS.NAME,
    permissions: GROUP_FIELDS.PERMISSIONS
});

export const createGroupSchema = Joi.object({
    name: GROUP_FIELDS.NAME,
    permissions: GROUP_FIELDS.PERMISSIONS
});
