import { Model } from 'sequelize';
import { sequelize } from '../loaders/db_loader';
import { UserModel, GroupModel } from './index';

export class UserGroupModel extends Model {}

UserGroupModel.init({}, {
    sequelize,
    modelName: 'UserGroup',
    tableName: 'user_group',
    timestamps: false
});

UserModel.belongsToMany(GroupModel, { through: UserGroupModel, foreignKey: 'user_id' });
GroupModel.belongsToMany(UserModel, { through: UserGroupModel, foreignKey: 'group_id' });
