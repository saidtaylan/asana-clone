const Section = require("../models/Sections.js");

const fetch = (where) => {
  return Section.find(where).populate({
    path: "user_id",
    select: "full_name email",
  });
};
const insert = (data) => {
  const newSection = new Section({
    ...data,
  });
  return newSection.save();
};

const modify = (id, data) => {
  return Section.findByIdAndUpdate(id, data, { new: true });
};

const remove = (id) => {
  return Section.findByIdAndDelete(id);
};

module.exports = {
  fetch,
  insert,
  modify,
  remove,
};
