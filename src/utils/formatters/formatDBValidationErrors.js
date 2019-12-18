/**
 * ----------------------------------------------------------------
 * Format Errors
 * ----------------------------------------------------------------
 */

const formatDBValidationErrors = err => {
    let errors = err.errors
    let errorJson = {}
    if (errors) {
        errors.map(({ message, path }) => {
            errorJson[path] = message
        })
    }
    return errorJson
}

module.exports = formatDBValidationErrors
