const mongoose = require("mongoose");

const visitSchema = mongoose.Schema({
  title: String,
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  imageUrl: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const VisitModal = mongoose.model("Visit", visitSchema);

module.exports = VisitModal;
