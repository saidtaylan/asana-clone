const mongoose = require("mongoose");
const logger = require("../logs/Projects");

const projectSchema = new mongoose.Schema(
  {
    name: String,
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true, // created ve updated timestamps otomatik eklenir.
    versionKey: false, // mogno, bir de __v şeklinde versiyon tutar. Bunu false yapıyoruz.
  }
);

projectSchema.post("save", (doc) => {
  logger.log({ level: "info", message: doc });
});

module.exports = mongoose.model("project", projectSchema);
