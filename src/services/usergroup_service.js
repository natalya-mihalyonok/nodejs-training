import { sequelize } from '../loaders/db_loader';

export class UserGroupService {
    constructor(userGroupModel, userService, groupService) {
        this.userGroupModel = userGroupModel;
        this.userService = userService;
        this.groupService = groupService;
    }

    async addUsersToGroup({ groupId, usersIds }) {
        await this.groupService._checkGroupExist(groupId);
        await Promise.all(usersIds.map(async (id) => await this.userService._checkUserExist(id)));
        const t = await sequelize.transaction();
        try {
            await this.userGroupModel.bulkCreate(usersIds.map((id) => ({
                user_id: id,
                group_id: groupId
            })));
            await t.commit();
        } catch (err) {
            await t.rollback();
            throw new Error(err);
        }
    }
}
