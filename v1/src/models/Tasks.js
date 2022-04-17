const mongoose = require("mongoose");
const logger = require("../logs/Tasks");

const taskSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    assigned_to: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    due_date: Date,
    statuses: [String],
    section_id: {
      type: mongoose.Types.ObjectId,
      ref: "section",
    },
    project_id: {
      type: mongoose.Types.ObjectId,
      ref: "project",
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    order: Number,
    is_completed: Boolean,
    comments: [
      {
        content: String,
        user_id: {
          type: mongoose.Types.ObjectId,
          ref: "user",
        },
        commented_at: Date,
      },
    ],
    media: [{ file: String, user_id: { type: mongoose.Types.ObjectId, ref: "user" } }],
    sub_tasks: [
      {
        type: mongoose.Types.ObjectId,
        ref: "task",
      },
    ],
  },
  {
    timestamps: true, // created ve updated timestamps otomatik eklenir.
    versionKey: false, // mogno, bir de __v şeklinde versiyon tutar. Bunu false yapıyoruz.
  }
);

taskSchema.post("save", (doc) => {
  logger.log({ level: "info", message: doc });
});

module.exports = mongoose.model("task", taskSchema);
