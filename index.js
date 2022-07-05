const express = require("express")
const bodyParser = require("body-parser")
var compression = require("compression")
var helmet = require("helmet")
const cors = require("cors")
require('dotenv').config()

var admin = require('firebase-admin')
const { initializeApp } = require("firebase-admin/app")

const { fcmRoute } = require("./src/routes/fcm.route")



const app = express()

app.use(compression())
app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// console.log(process.env.SERVICE_ACCOUNT_JSON)
const run = async (db) => {
    initializeApp({
        credential: admin.credential.cert(
            JSON.parse(process.env.SERVICE_ACCOUNT_JSON)
        ),
        databaseURL: 'https://emergency-notifier-f30fa-default-rtdb.firebaseio.com'
    })

    const PORT = process.env.PORT || 8080

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`)
    })

    fcmRoute(app)
}

run()

