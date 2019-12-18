import $app from '$app'
import $db from '$db'

/**
 * -------------------------------------------
 *      Models
 * -------------------------------------------
 */
// const User = require('~models/User')

/**
 * Sync database
 */

const port = process.env.PORT || 3000
$app.listen(port, () => {
    /**
     * Start Server
     */
    $db.sync()
        .then(r => console.log('Database Syncronize sucessfully'))
        .catch(e => console.log(e))
    // msg
    console.log(`Server working at http://localhost:${port}`)
})
