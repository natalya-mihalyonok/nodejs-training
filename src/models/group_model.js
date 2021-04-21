import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../loaders/db_loader';

export class GroupModel extends Model {}

GroupModel.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    permissions: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Group',
    tableName: 'groups',
    timestamps: false
});
