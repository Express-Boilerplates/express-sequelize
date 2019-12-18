const formatJoiErrors = err => {
    let errors = {}

    err.details.forEach(e => {
        errors[e.path[0]] = e.message
    })
    return errors
}
module.exports = formatJoiErrors
