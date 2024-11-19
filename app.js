const express = require("express");
const app = express();
const router = require("./routes/rateRoutes");
const cors = require("cors");



const connectDB = require("./database");

connectDB();

app.use(express.json());
app.use("/api/taux", router);
app.use(cors());



module.exports = app;