const errorTypes = require('$utils/errorTypes')

/**
 * AppError Class for throwing app custom error
 */
class AppError extends Error {
    /**
     * @param {string} msg - Error Message
     * @param {number} statusCode - Error status code 4xx
     * @param {errorTypes} type - Error type enum
     * @param {{}} errors - error object
     *
     * @returns @void
     */
    constructor(msg, statusCode, type = errorTypes.APP_ERROR, errors) {
        super()
        this.name = type
        this.message = msg
        this.errors = errors
        this.statusCode = statusCode
    }
}

module.exports = AppError
