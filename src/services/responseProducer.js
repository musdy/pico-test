class ResponseProducer {
    /**
     * @param ctx
     * @param {string} message
     * @param {object} data
     * @param {object} pagination
     * @param {string} code
     * @returns {{status: string, code: string, message:string, data: object}}
     */
    static success(ctx, { message, data, pagination, code }) {
        return ctx.ok({
            status: 'success',
            code,
            message,
            data,
            pagination,
        });
    }

    /**
     * @param ctx
     * @param {string} message
     * @param {object} data
     * @param {string} code
     * @returns {{status: string, code: string, message:string, data: object}}
     */
    static badRequest(ctx, { message, data, code }) {
        return ctx.badRequest({
            status: 'error',
            code,
            message,
            data,
        });
    }

    /**
     * @param ctx
     * @param {string} message
     * @param {object} data
     * @param {string} code
     * @returns {{status: string, code: string, message:string, data: object}}
     */
    static error(ctx, { message, data, code }) {
        return ctx.send(500, {
            status: 'error',
            code,
            message,
            data,
        });
    }

    /**
     * @param ctx
     * @param {number} httpCode
     * @param {string} message
     * @param {object} data
     * @param {string} code
     * @returns {{status: string, code: string, message:string, data: object}}
     */
    static customCode(ctx, httpCode, { message, data, code }) {
        return ctx.send(httpCode, {
            status: 'error',
            code,
            message,
            data,
        });
    }
}

export default ResponseProducer;
