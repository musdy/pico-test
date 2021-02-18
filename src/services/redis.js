import Redis from 'ioredis';
import Logger from './logger';
import projectEnv from '../env-config';

class RedisClient {
    constructor() {
        this.connection = new Redis({
            port: projectEnv.REDIS_PORT,
            host: projectEnv.REDIS_HOST,
        });

        this.logger = new Logger();
        this.connection.on('error', (error) => this.logger.logException(error));
    }

    /**
     * @param {string} key
     * @param {object} data
     * @param {number} expire
     * @returns {Promise<void>}
     */
    async setJSON(key, data, expire) {
        try {
            await this.connection.set(key, JSON.stringify(data), 'EX', 60 * expire);
        } catch (exception) {
            this.logger.logException(exception);
        }
    }

    /**
     * @param {string} key
     * @returns {object}
     */
    async getJSON(key) {
        try {
            const result = await this.connection.get(key);

            return JSON.parse(result);
        } catch (exception) {
            this.logger.logException(exception);

            return null;
        }
    }

    /**
     * @param {string} singleKey
     * @returns {boolean}
     */
    async deleteCachekey(singleKey) {
        try {
            await this.connection
                .keys(singleKey)
                .then((keys) => {
                    const pipeline = this.connection.pipeline();

                    keys.forEach((key) => pipeline.del(key));

                    return pipeline.exec();
                })
                .catch((exception) => this.logger.logException(exception));

            return true;
        } catch (exception) {
            this.logger.logException(exception);
            return false;
        }
    }

    /**
     * @param {string} key
     */
    static getCacheKey(key) {
        return `api:v1:${projectEnv.TYPE}:${key}`;
    }

    /**
     * @returns {RedisClient}
     */
    static getInstance() {
        if (!RedisClient.instance) {
            RedisClient.instance = new RedisClient();
        }

        return RedisClient.instance;
    }
}

export default RedisClient;
