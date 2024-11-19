
const express = require("express");

const {getRate, refreshRate} = require("../controllers/rateControllers");

const router = express.Router();

router.get("/",getRate);

router.post("/refresh", refreshRate);

module.exports = router;