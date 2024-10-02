const express= require('express');
const { sendMessage, getMessage } = require('../controllers/message.Controller.js');
const { isAuthenticated } = require("../middleware/IsAuthenticated.js");
const router = express.Router();

router.route("/send/:id").post(isAuthenticated,sendMessage);
router.route("/:id").get(isAuthenticated, getMessage);

module.exports = router;