const { getMessaging } = require("firebase-admin/messaging")


class Controller {

    constructor() {

    }

    send = (req, res) => {
        const registrationTokens = req.body.registration_tokens.replace(/[\])}[{(]/g, '').split(', ')

        let message

        if (req.body.type == "alarm") {
            message = {
                data: {
                    type: "alarm",
                    fromId: req.body.from,
                    toIds: req.body.to,
                    message: req.body.message_data
                },
                tokens: registrationTokens
            }
        }

        if (req.body.type == "message") {
            message = {
                data: {
                    type: "message",
                    fromId: req.body.from,
                    toId: req.body.to,
                    content: req.body.message_data
                },
                tokens: registrationTokens
            }
        }

        // console.log(req.body.registration_tokens.replace(/[\])}[{(]/g, '').split(', '))
        console.log(message)

        getMessaging().sendMulticast(message)
            .then((response) => {
                console.log('Successfully sent message:', response)
            })
            .catch((error) => {
                console.log('Error sending message:', error)
            })

        res.status(200).send({ message: "alarmed!" })

    }
}

module.exports = { Controller }
