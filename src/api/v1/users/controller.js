import User from './model'
import Joi from '@hapi/joi'

const loginController = async (req, res) => {
    const schema = Joi.object().keys({
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string().required(),
    })
    await schema.validateAsync(req.body, { abortEarly: false })

    let { email, password } = req.body

    let token = await User.auth(email, password)

    res.cookie('token', token, {
        expires: new Date(Date.now() + 365 * 24 * 3600 * 1000),
        httpOnly: true,
    })

    res.json({
        message: 'Login Successfull',
        token,
    })
}

const registerController = async (req, res) => {
    let user = await User.create(req.body)
    res.status(201).json({
        message: 'You have registered successfully',
        user,
    })
}

const facebookAuthentication = (req, res) => {
    res.json({
        message: 'facebookAuthentication',
    })
}

const logoutController = (req, res) => {
    res.clearCookie('token')
    res.json({
        message: 'Logged out successfully',
    })
}

const me = (req, res) => {
    res.json(req.user)
}

const settingsController = (req, res) => {
    res.json({
        message: 'settingsController',
    })
}

export {
    loginController,
    facebookAuthentication,
    registerController,
    settingsController,
    logoutController,
    me,
}
