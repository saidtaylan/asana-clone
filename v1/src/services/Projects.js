const Project = require("../models/Projects.js");

const fetch = (where) => {
  return Project.find(where || {}).populate({
    path: "user_id",
    select: "full_name email",
  });
};
const insert = (data) => {
  const newProject = new Project({
    ...data,
  });
  return newProject.save();
};

const modify = (id, data) => {
  return Project.findByIdAndUpdate(id, data, { new: true });
};

const remove = (id) => {
  return Project.findByIdAndDelete(id);
};

module.exports = {
  fetch,
  insert,
  modify,
  remove,
};
