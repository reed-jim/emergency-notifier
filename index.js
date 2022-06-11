const express = require("express")
const bodyParser = require("body-parser")
var compression = require("compression")
var helmet = require("helmet")
const cors = require("cors")

var admin = require('firebase-admin')
const { initializeApp } = require("firebase-admin/app")

const { fcmRoute } = require("./src/routes/fcm.route")



const app = express()

app.use(compression())
app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


const run = async (db) => {
    // initializeApp({
    //     credential: admin.credential.applicationDefault(),
    //     databaseURL: 'https://emergency-notifier-f30fa-default-rtdb.firebaseio.com'
    // })



    const PORT = process.env.PORT || 8080

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`)
    })

    fcmRoute(app)
}

run()
