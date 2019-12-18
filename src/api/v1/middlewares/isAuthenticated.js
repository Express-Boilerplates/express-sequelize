/* eslint-disable */
const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const AppError = require('$utils/AppError')
const { UNAUTHORIZED } = require('$utils/errorTypes')
const User = require('../users/model')

const isAuthenticated = async (req, res, next) => {
    let token =
        req.cookies.token || req.headers?.authorization.replace('Bearer ', '')

    if (token) {
        let { userId } = await promisify(jwt.verify)(
            token,
            process.env.APP_SECRET
        )
        const user = await User.findOne({
            where: { _id: userId },
        })
        req.user = user
        res.locals.user = user
        next()
    } else {
        throw new AppError('You are not logged in', 401, UNAUTHORIZED)
    }
}

module.exports = isAuthenticated
