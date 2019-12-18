/**
 *
 * @param {*} type
 * @param {*} statusCode
 * @param {*} errors
 * @param {*} message
 * @param {*} stack
 */
const errorMsg = ({ type, statusCode, errors, message, stack }) => ({
    type,
    statusCode,
    errors,
    message,
    stack,
})

export default errorMsg
