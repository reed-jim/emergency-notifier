const { Controller } = require("../controllers/controller")

const fcmRoute = (app) => {
    const basicController = new Controller()
    
    app.post("/send", (req, res) => basicController.send(req, res))}

module.exports = { fcmRoute }
