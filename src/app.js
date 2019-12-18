import express from 'express'
import cors from 'cors'
import cookie from 'cookie-parser'
import morgan from 'morgan'
import catchGlobalError from '$utils/catchGlobalError'

/**
 * V1
 */
import v1_api from './api/v1/bootstrap'

/**
 * Initialize Express application
 */
const app = express()

/**
 * Enable cors
 */
app.use(cors())

app.use(cookie(process.env.APP_SECRET))

/**
 * Express Logger
 */
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

/**
 * Parse request Body
 */
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

/**
 * Apis
 */
app.get('/', (req, res) => {
    res.json({
        status: '🔥 🔥 Server is working 🔥 🔥',
        NODE_ENV: process.env.NODE_ENV,
        database: {
            dbUrl: process.env.DATABASE_URL,
            ssl: process.env.DB_SSL,
        },
    })
})
app.use('/v1', v1_api)

// Fallback router
app.all('*', (_, res) => {
    res.status(404).json({
        message: 'Invalid api route',
    })
})

/**
 * Catch all unhandle exceptions from one place :D
 */
app.use(catchGlobalError)

// done! we export it so we can start the site in server.js
export default app
