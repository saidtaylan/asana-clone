const Task = require("../models/Tasks.js");

const fetch = (where) => {
  return Task.find(where).populate({
    path: "user_id",
    select: "full_name email",
  });
};

const fetchOne = (where, expand) => {
  if (expand) {
    return Task.findOne(where)
      .populate({
        path: "sub_tasks",
        select: "title description isCompleted assigned_to due_date order sub_tasks",
      })
      .populate({
        path: 'comments',
        populate: {
          path: 'user_id',
          select: 'full_name email profile_image'
        }
      });
  }
};

/**
 *
 * @param {Object} data task to insert
 *
 */
const insert = (data) => {
  const newTask = new Task({
    ...data,
  });
  return newTask.save();
};

const modify = (id, data) => {
  return Task.findByIdAndUpdate(id, data, { new: true });
};

const remove = (id) => {
  return Task.findByIdAndDelete(id);
};

module.exports = {
  fetch,
  insert,
  modify,
  remove,
  fetchOne,
};
