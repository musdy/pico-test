import ratelimit from 'koa-ratelimit';
import RedisClient from '../services/redis';
import projectEnv from '../env-config';

export default ratelimit({
    driver: 'redis',
    db: RedisClient.getInstance().connection,
    duration: 150000,
    errorMessage: 'You should slow down sometimes.',
    id: (ctx) => {
        const clientIp =
            ctx.headers['true-client-ip'] || ctx.headers['cf-connecting-ip'] || ctx.headers['X-Forwarded-For'] || '';

        return `${projectEnv.TYPE}:${clientIp}:${ctx.request.url}`;
    },
    headers: {
        remaining: 'Rate-Limit-Remaining',
        reset: 'Rate-Limit-Reset',
        total: 'Rate-Limit-Total',
    },
    max: 20,
    disableHeader: false,
});
