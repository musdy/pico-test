import projectEnv from '../env-config';

class Logger {
    constructor() {
        this.output = projectEnv.LOG_OUTPUT;
    }

    /**
     * @param {Error} error
     * @returns {void}
     */
    logException(error) {
        if (this.isOutputConsole()) {
            console.log(error);
        }
    }

    /**
     * @param {string} message
     * @returns {void}
     */
    logMessage(message) {
        if (this.isOutputConsole()) {
            console.log(message);
        }
    }

    /**
     * @param {Error} error
     * @param {Request} request
     * @returns {void}
     */
    logRequest(error, request) {
        if (this.isOutputConsole()) {
            console.log(error);
        }
    }

    /**
     * @returns {boolean}
     */
    isOutputConsole() {
        return this.output === 'console';
    }

    /**
     * @returns {Logger}
     */
    static getInstance() {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }

        return Logger.instance;
    }
}

export default Logger;
