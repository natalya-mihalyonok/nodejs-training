import { Router } from 'express';
import { UserGroupController } from './controllers/usergroup_controller';
import { validateSchema, VALIDATION_NAMES } from '../middlewares/validation/validation_middleware';
import { createUserGroupSchema } from './../middlewares/validation/schemes/index';

export const router = Router();

router.post('/', validateSchema(createUserGroupSchema, VALIDATION_NAMES.BODY), UserGroupController.addUsersToGroup);
