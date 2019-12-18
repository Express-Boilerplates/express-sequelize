import express from 'express'
import userRoutes from './users/routes'
import './users/model'

const Router = express.Router()

/**
 * GET v1/status
 */
Router.get('/', (req, res) => res.send('OK'))

/**
 * GET v1/users
 */
Router.use('/users', userRoutes)

export default Router
