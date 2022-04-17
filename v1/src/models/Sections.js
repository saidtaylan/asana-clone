const mongoose = require("mongoose");
const logger = require("../logs/Sections");

const sectionSchema = new mongoose.Schema(
  {
    name: String,
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    project_id: {
      type: mongoose.Types.ObjectId,
      ref: "project",
    },
    order: Number,
  },
  {
    timestamps: true, // created ve updated timestamps otomatik eklenir.
    versionKey: false, // mogno, bir de __v şeklinde versiyon tutar. Bunu false yapıyoruz.
  }
);

sectionSchema.post("save", (doc) => {
  logger.log({ level: "info", message: doc });
});

module.exports = mongoose.model("section", sectionSchema);
