const {
    NODE_ENV,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DB_NAME,
    MYSQL_USER_NAME,
    MYSQL_USER_PASS,
    REDIS_HOST,
    REDIS_PORT,
    JWT_SECRET_KEY,
} = process.env;

const commonSettings = {
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USER_NAME,
    MYSQL_USER_PASS,
    MYSQL_DB_NAME,
    REDIS_HOST,
    REDIS_PORT: Number(REDIS_PORT) || 6379,
    JWT_SECRET_KEY,
};
const envConfig = [
    {
        TYPE: 'development',
        LOG_OUTPUT: 'console',
        isLocal: true,
        ...commonSettings,
    },
    {
        TYPE: 'production',
        LOG_OUTPUT: 'console',
        isLocal: false,
        ...commonSettings,
    },
];

const ENV_WHITELIST = ['development', 'test', 'production'];

if (!NODE_ENV || !ENV_WHITELIST.includes(NODE_ENV)) {
    throw new Error(`PROJECT_ENV: must be one of ${ENV_WHITELIST.toString()}`);
}

module.exports = envConfig.find((env) => env.TYPE === NODE_ENV) || envConfig[0];
