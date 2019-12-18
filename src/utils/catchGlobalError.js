import formatDBValidationErrors from '$formatters/formatDBValidationErrors'
import formatJoiErrors from '$formatters/formatJoiErrors'

import {
    VALIDATION_ERROR,
    INTERNAL_SERVER_ERROR,
    UNCONTROLLED_ERROR,
} from '$utils/errorTypes'

import errorMsg from '$utils/errorMsg'

export default (error, req, res, next) => {
    /**
     * -----------------------------------------------------------------
     *      Catch Validation Errors
     * -----------------------------------------------------------------
     */

    // error thrown by AppError
    if (error.name === UNCONTROLLED_ERROR) {
        res.status(error.statusCode).json(
            errorMsg({
                type: UNCONTROLLED_ERROR,
                message: error.message,
                errors: error?.errors,
                stack:
                    process.env.NODE_ENV === 'development'
                        ? error.stack
                        : undefined,
            })
        )
    }

    // Catch validation errors thrown by JOI
    if (error.name === 'ValidationError') {
        let errors = formatJoiErrors(error)
        res.status(400).json(
            errorMsg({
                type: VALIDATION_ERROR,
                message: 'You have some validation error',
                errors,
                stack: error.stack,
            })
        )
    }

    // Catch validation errors thrown by Sequelize model definition
    if (error.name === 'SequelizeValidationError') {
        let errors = formatDBValidationErrors(error)
        res.status(400).json(
            errorMsg({
                type: VALIDATION_ERROR,
                message: 'You have some validation error',
                errors,
                stack:
                    process.env.NODE_ENV === 'development'
                        ? error.stack
                        : undefined,
            })
        )
    }
    // Unique constrain validation error thrown by sequelize
    if (error.name === 'SequelizeUniqueConstraintError') {
        let errors = formatDBValidationErrors(error)
        res.status(400).json(
            errorMsg({
                type: VALIDATION_ERROR,
                message: 'You have some validation error',
                errors,
                stack:
                    process.env.NODE_ENV === 'development'
                        ? error.stack
                        : undefined,
            })
        )
    }

    /**
     * -----------------------------------------------------------------
     *      Internal server Errors
     * -----------------------------------------------------------------
     */

    res.status(error.statusCode).json(
        errorMsg({
            type: error.name,
            message: error.message,
            errors: error?.errors,
            stack:
                process.env.NODE_ENV === 'development'
                    ? error.stack
                    : undefined,
        })
    )
}
