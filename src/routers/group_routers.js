import { Router } from 'express';
import { GroupController } from './controllers/group_controller';
import { validateSchema, VALIDATION_NAMES } from '../middlewares/validation/validation_middleware';
import { groupSchema, createGroupSchema } from '../middlewares/validation/schemes/index';

export const router = Router();

router.get('/:id', GroupController.getGroupById);
router.get('/', GroupController.getGroups);
router.post('/', validateSchema(createGroupSchema, VALIDATION_NAMES.BODY), GroupController.addGroup);
router.put('/', validateSchema(groupSchema, VALIDATION_NAMES.BODY), GroupController.updateGroup);
router.delete('/:id', GroupController.deleteGroup);
