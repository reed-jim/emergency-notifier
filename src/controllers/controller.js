const { getMessaging } = require("firebase-admin/messaging")


class Controller {

    constructor() {

    }

    send = (req, res) => {
        const registrationTokens = req.body.registration_tokens

        let message

        if(req.body.type == "alert") {
            message = {
                data: {
                    type: "alert",
                    status: req.body.message_data
                },
                token: registrationTokens
            }
        }

        if(req.body.type == "message") {
            message = {
                data: {
                    type: "message",
                    nfrom: req.body.from,
                    nto: req.body.to,
                    content: req.body.message_data
                },
                token: registrationTokens
            }
        }
        

        console.log(message)

        getMessaging().send(message)
            .then((response) => {
                console.log('Successfully sent message:', response)
            })
            .catch((error) => {
                console.log('Error sending message:', error)
            })

        res.status(200).send({ message: "alerted!" })

    }
}

module.exports = { Controller }
