import Sequelize from 'sequelize'
import $db from '$db'
import { hash, compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import AppError from '$utils/AppError'
import { UNCONTROLLED_ERROR } from '$utils/errorTypes'

const User = $db.define('user', {
    _id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Required',
            },
        },
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Required',
            },
        },
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
            msg: 'Email already in use',
        },
        validate: {
            notNull: {
                msg: 'Required',
            },
            isEmail: {
                msg: 'Invalid email address',
            },
        },
    },
    facebookUUID: {
        type: Sequelize.STRING,
        validate: {
            isUUID: {
                msg: 'Not a valid uuid',
            },
        },
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Required',
            },
            len: {
                args: [5, 50],
                msg: 'Password length must be between 5 to 50 characters',
            },
        },
    },
})

User.beforeCreate(async user => {
    user.password = await hash(user.password, 10)
})

/**
 * User auth check method
 * @param {string} email - User namil address
 * @param {string} password - User password
 * @return {string} token - json web token
 */
User.auth = async function(email, password) {
    // fetch the user
    let user = await User.findOne({
        where: { email },
    })

    if (!user)
        throw new AppError('Invalid credentials', 401, UNCONTROLLED_ERROR)

    // match password
    let isMatched = await compare(password, user.password)

    if (isMatched) {
        let token = sign({ userId: user._id }, process.env.APP_SECRET)
        return token
    } else {
        throw new AppError('Invalid credentials', 401, UNCONTROLLED_ERROR)
    }
}

export default User
