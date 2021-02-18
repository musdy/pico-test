import Koa from 'koa';
import compress from 'koa-compress';
import respond from 'koa-respond';
import responseTime from 'koa-response-time';
import koaBody from 'koa-body';
import cors from '@koa/cors';
import jwt from 'koa-jwt';
import rateLimit from './middlewares/rateLimitter';
import Logger from './services/logger';
import projectEnv from './env-config';
import routerV1 from './v1/router';
import RedisClient from './services/redis';

const app = new Koa();
const logger = Logger.getInstance();
RedisClient.getInstance();

app.on('error', (error, ctx) => logger.logRequest(error, ctx.request));
app.use(responseTime());
app.use(compress());
app.use(respond());
app.use(cors({ origin: '*' }));
app.use(koaBody({ multipart: true }));
if (!projectEnv.isLocal) {
    app.use(rateLimit);
}

app.use(jwt({ secret: projectEnv.JWT_SECRET_KEY }).unless({ path: [/^\/v1\/auth/] }));
app.use(routerV1.routes());
app.use(routerV1.allowedMethods());
app.listen(80, () => {
    if (projectEnv.isLocal) {
        console.info('Server Started');
    }
});
