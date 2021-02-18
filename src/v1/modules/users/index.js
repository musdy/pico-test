import Router from 'koa-router';
import userController from './user.controller';

const router = new Router();

router.post('/auth/register', userController.signUp);
router.post('/auth/login', userController.signIn);

export default router;
