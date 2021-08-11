import { Op } from 'sequelize';
import { generateId, encryptValue } from '../utils/data_utils';

export class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }

    async addUser(user) {
        const id = generateId();
        try {
            const password = encryptValue(user.password);
            user = await this.userModel.create({
                id,
                ...user,
                password
            });
            return user.id;
        } catch (err) {
            throw new Error(err);
        }
    }

    async deleteUser(id) {
        try {
            await this._checkUserExist(id);
            await this.userModel.update({ isDeleted: true }, {
                where: { id, isDeleted: false }
            });
        } catch (err) {
            throw new Error(err);
        }
    }

    async getUser(id) {
        try {
            return await this.userModel.findOne({
                where: { id, isDeleted: false },
                attributes: ['login', 'age', 'id']
            });
        } catch (err) {
            throw new Error(err);
        }
    }

    async updateUser(user) {
        try {
            await this._checkUserExist(user.id);
            await this.userModel.update({
                login: user.login,
                password: encryptValue(user.password),
                age: user.age
            }, {
                where: {
                    id: user.id,
                    isDeleted: false
                }
            });
        } catch (err) {
            throw new Error(err);
        }
    }

    async getUsersByLogin(loginSubString, limit) {
        try {
            return await this.userModel.findAll({
                where: {
                    login: {
                        [Op.iLike]: `%${loginSubString}%`
                    },
                    isDeleted: false },
                order: ['login'],
                limit,
                attributes: ['login', 'age', 'id']
            });
        } catch (err) {
            throw new Error(err);
        }
    }

    async getUserByLoginPassword(login, password) {
        try {
            return await this.userModel.findOne({
                where: {
                    login,
                    password: encryptValue(password),
                    isDeleted: false
                }
            });
        } catch (err) {
            throw new Error(err);
        }
    }

    async _checkUserExist(id) {
        const user = await this.getUser(id);
        if (!user) {
            throw new Error(`User with id: ${id} is not found`);
        }
    }
}
