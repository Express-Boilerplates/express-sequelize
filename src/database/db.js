import Sequelize from 'sequelize'

/**
 * ----------------------------------------------------------------
 * Database Connection
 * ----------------------------------------------------------------
 */
const dialect = process.env.DB_TYPE
const ssl = process.env.DB_SSL || false

const db = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: { ssl: ssl },
    dialect,
    logging: false,
})
// const db = new Sequelize({
//     dialect: 'sqlite',
//     storage: path.join(__dirname + '/database.sqlite'),
//     logging: false,
// })

// Hello
/**
 * ----------------------------------------------------------------
 * Check DB Connection
 * ----------------------------------------------------------------
 */
db.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.')
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err)
    })

module.exports = db
