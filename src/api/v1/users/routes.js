import express from 'express'
import isAuthenticated from '../middlewares/isAuthenticated'
import {
    loginController,
    facebookAuthentication,
    registerController,
    settingsController,
    logoutController,
    me,
} from './controller'

import catchErrors from '$utils/catchErrors'

const Router = express.Router()

// ------------------------------------------------------------------------------------------
// Current Permissions.
// ------------------------------------------------------------------------------------------
/**
 * @apiDefine Authenticated Authentication need for this.
 * Bearer token must be passed via Aythorization header or cookie
 *
 * @apiVersion 1.0.0
 */

/**
 * @api {POST} v1/users/login Login user
 * @apiDescription Login to user account
 * @apiName Login
 * @apiGroup User
 * @apiVersion  1.0.0
 *
 * @apiParam  {String}  email       Email
 * @apiParam  {String}  password    Password
 *
 * @apiSuccess {string} message Login successfull msg
 * @apiSuccess {string} token Generated jwt token
 *
 * @apiError (Bad Request 400)  VALIDATION_ERROR Some parameters may contain invalid values
 * @apiErrorExample {Object} When no field provided:
    {
        "type": "VALIDATION_ERROR",
        "errors": {
            "email": "\"email\" is required",
            "password": "\"password\" is required"
        },
        "message": "You have some validation error",
        "stack": "ValidationError: \"email\" is required. \"password\" is required"
    }
    @apiErrorExample {Object} When email address is wrong:
    {
        "type": "VALIDATION_ERROR",
        "errors": {
            "email": "\"email\" must be a valid email"
        },
        "message": "You have some validation error",
        "stack": "ValidationError: \"email\" must be a valid email"
    }
 */

Router.post('/login', catchErrors(loginController))

/**
 *
 * @api {POST} v1/fbAuth/:token Authenticate with Facebook
 * @apiName Facebook Auth
 * @apiGroup User
 * @apiVersion  1.0.0
 *
 * @apiParam  {String} token Facebook user access token
 *
 */
Router.post('/fbAuth/:token', catchErrors(facebookAuthentication))

/**
 * @api {POST} v1/users/register Register user
 * @apiDescription Register user account
 * @apiName Register
 * @apiGroup User
 * @apiVersion  1.0.0
 *
 * @apiParam  {String}  firstName       User First Name
 * @apiParam  {String}  lastName        User Last Name
 * @apiParam  {String}  email(unique)           User Email address
 * @apiParam  {String}  password           User password address
 *
 * 
 * @apiSuccess {String} message Success message
 * @apiSuccess {Object} user User detail object
 * @apiSuccessExample Success-Response:
    {
        "message": "You have registered successfully",
        "user": {
            "_id": "0c1b30b3-23e0-46e6-aa0f-5ef265420ec7",
            "firstName": "SHoaib",
            "lastName": "Sharif",
            "email": "shoaibd@gmail.com",
            "password": "$2a$10$GbguiA/DSO9vrB6XvU1CQ.CW9QuD7XVONTcd8Zb3ReTP81A0QF.4.",
            "updatedAt": "2019-12-08T05:58:14.116Z",
            "createdAt": "2019-12-08T05:58:14.116Z"
        }
    }
 * 
 * @apiError (Bad Request 400)  VALIDATION_ERROR Some parameters may contain invalid values
    
    @apiErrorExample {type} Email already taken:
    {
        "type": "VALIDATION_ERROR",
        "errors": {
            "email": "Email already in use"
        },
        "message": "{{error Stack}}"
    }

    @apiErrorExample {Object} No field provided
    {
        "type": "VALIDATION_ERROR",
        "errors": {
            "firstName": "Required",
            "lastName": "Required",
            "email": "Required",
            "password": "Required"
        },
        "message": "{{error Stack}}"
    }
 */

Router.post('/register', catchErrors(registerController))

/**
 * @api {GET} v1/users/me My info
 * @apiDescription Logout currently logged in user
 * @apiName Me
 * @apiGroup User
 * @apiVersion  1.0.0
 * @apiPermission Authenticated
 *
 *
 * @apiHeader {String} Authorization Authorization token
 *  * @apiHeaderExample {Header} Header-Example
 *     Authorization: Bearer {{token}}
 *
    @apiSuccessExample Success-Response:
    {
        "_id": "0c1b30b3-23e0-46e6-aa0f-5ef265420ec7",
        "firstName": "SHoaib",
        "lastName": "Sharif",
        "email": "shoaibd@gmail.com",
        "password": "$2a$10$GbguiA/DSO9vrB6XvU1CQ.CW9QuD7XVONTcd8Zb3ReTP81A0QF.4.",
        "updatedAt": "2019-12-08T05:58:14.116Z",
        "createdAt": "2019-12-08T05:58:14.116Z"
    }
 */
Router.get('/me', catchErrors(isAuthenticated), catchErrors(me))

/**
 * @api {POST} v1/users/logout Logout user
 * @apiDescription Get current logged in user object
 * @apiName Logout
 * @apiGroup User
 * @apiVersion  1.0.0
 * @apiPermission Authenticated
 *
 *
 * @apiHeader {String} Authorization Authorization token
 * @apiHeaderExample {Header} Header-Example
 *     Authorization: Bearer {{token}}
 *
    @apiSuccessExample Success-Response:
    {
        "message": "Logged out successfully"
    }
 */
Router.post(
    '/logout',
    catchErrors(isAuthenticated),
    catchErrors(logoutController)
)

Router.post('/settings', catchErrors(settingsController))

module.exports = Router
