const mongoose = require("mongoose");
const logger = require("../logs/Users")

const userSchema = new mongoose.Schema(
  {
    full_name: String,
    password: String,
    email: String,
    //deleted_at: Date
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.post("save", (doc) => {
  logger.log({level: 'info', message: doc})
})

module.exports = mongoose.model("user", userSchema )