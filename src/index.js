import express from 'express';
import { envConfig } from './config/env_config';
import { errorMiddleware } from './middlewares/validation/validation_middleware';
import { router as userRouter } from './routers/user_routers';
import { router as groupRouter } from './routers/group_routers';
import { router as userGroupRouter } from './routers/usergroup_routers';

const app = express();
app.listen(envConfig.port, () => {
    console.log(`Server starts at http://localhost:${envConfig.port}`);
});

app.use(express.json());
app.use('/users', userRouter);
app.use('/groups', groupRouter);
app.use('/user_groups', userGroupRouter);
app.use(errorMiddleware);
