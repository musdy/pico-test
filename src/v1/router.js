import Router from 'koa-router';
import userRoutes from './modules/users';
import videoRoutes from './modules/videos';

const routerV1 = new Router({ prefix: '/v1' });

routerV1.use(userRoutes.routes(), userRoutes.allowedMethods());
routerV1.use(videoRoutes.routes(), videoRoutes.allowedMethods());

export default routerV1;
