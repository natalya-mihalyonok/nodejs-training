import Joi from 'joi';

const USERGROUP_FIELDS = {
    GROUP_ID: Joi.string().guid({
        version: [
            'uuidv4'
        ]
    }).required(),
    USERS_IDS: Joi.array()
        .items(Joi.string().guid({
            version: [
                'uuidv4'
            ]
        }))
        .required()
};

export const createUserGroupSchema = Joi.object({
    groupId: USERGROUP_FIELDS.GROUP_ID,
    usersIds: USERGROUP_FIELDS.USERS_IDS
});
