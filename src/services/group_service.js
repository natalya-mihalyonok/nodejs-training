import { generateId } from '../utils/data_utils';

export class GroupService {
    constructor(groupModel) {
        this.groupModel = groupModel;
    }

    async addGroup(group) {
        const id = generateId();
        try {
            return await this.groupModel.create({
                id,
                ...group
            });
        } catch (err) {
            throw new Error(err);
        }
    }

    async updateGroup(group) {
        try {
            await this._checkGroupExist(group.id);
            await this.groupModel.update({
                name: group.name,
                permissions: group.permissions
            }, {
                where: { id: group.id }
            });
        } catch (err) {
            throw new Error(err);
        }
    }

    async getGroupById(id) {
        try {
            return await this.groupModel.findByPk(id);
        } catch (err) {
            throw new Error(err);
        }
    }

    async getGroups() {
        try {
            return await this.groupModel.findAll();
        } catch (err) {
            throw new Error(err);
        }
    }

    async deleteGroup(id) {
        try {
            await this._checkGroupExist(id);
            await this.groupModel.destroy({
                where: { id }
            });
        } catch (err) {
            throw new Error(err);
        }
    }

    async _checkGroupExist(id) {
        const group = await this.getGroupById(id);
        if (!group) {
            throw new Error(`Group with id: ${id} is not found`);
        }
    }
}
