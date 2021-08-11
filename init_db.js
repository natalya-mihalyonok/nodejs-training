import { UserModel, GroupModel, UserGroupModel } from './src/models/index';
import { PERMISSIONS } from './src/utils/constants';

const users = [{
    id: '0df71432-7b42-4eb3-bb11-def8334c4101',
    login: 'Admin',
    password: 'f42de9fe905b0376af70106ee8354e988c7013afd0de095dcaccf68cadab61ac4066293f0991cd325b9ab3c6a75c7878e658e904dff6b6d085719511f7c752db',
    age: 18
}];

const groups = [{
    id: '486e88f1-134c-405a-b5a1-9dc71206ad81',
    name: 'Readers',
    permissions: [PERMISSIONS.READ]
}, {
    id: '4a01bb3e-9b46-40f8-8656-96f049299bce',
    name: 'Admins',
    permissions: Object.values(PERMISSIONS)
}];

async function initDB() {
    await UserModel.sync({ force: true });
    await UserModel.bulkCreate(users);
    await GroupModel.sync({ force: true });
    await GroupModel.bulkCreate(groups);
    await UserGroupModel.sync({ force: true });
}

initDB();
