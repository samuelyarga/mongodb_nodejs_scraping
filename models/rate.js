const mongoose = require("mongoose");

const rateSchema = new mongoose.Schema({
  site: {
    type: String,
    required: true,
  },
  rate: {
    type: String,
    required: true,
  },
  updateDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Rate", rateSchema);
