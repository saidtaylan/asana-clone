const User = require("../models/Users.js");

const insert = (data) => {
  const newUser = new User(data);
  return newUser.save();
};

const listUsers = (where) => {
  return User.find({ ...where, deleted_at: null } || { deleted_at: null });
};

const getUser = (where) => {
  return User.findOne({ ...where, deleted_at: null } || { deleted_at: null });
};

const loginUser = (where) => {
  return User.findOne({ ...where, deleted_at: null });
};

const updatePassword = (id, data) => {
  return User.findOneAndUpdate(id, data, { new: true });
};

const modify = (id, data) => {
  return User.findByIdAndUpdate(id, data, { new: true });
};

/* const remove = (user) => {
  return User.findByIdAndUpdate(
    user._id,
    {
      full_name: user.full_name,
      email: user.email,
      password: user.password,
      deleted_at: new Date().getTime(),
    },
    { new: true }
  );
}; */

module.exports = {
  insert,
  listUsers,
  loginUser,
  updatePassword,
  getUser,
  modify,
  //remove,
};
